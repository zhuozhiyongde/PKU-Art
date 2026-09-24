import argparse
import base64
import json
import os
import multiprocessing
import re
import subprocess
import tempfile
import wave
import array
import sys
import hashlib
import io
import shutil
import threading
import time
import zipfile
from concurrent.futures import ProcessPoolExecutor, as_completed
from concurrent.futures import ThreadPoolExecutor
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


def file_uri(path):
    return Path(path).resolve().as_uri()


def extract_audio(task, target, workdir, seconds=None, start=0, progress=None):
    source = task['url']
    expected_duration = None
    if task.get('playlist'):
        import m3u8
        playlist = m3u8.loads(task['playlist'], uri=source)
        if playlist.is_variant:
            raise ValueError('需要媒体清单，当前为主播放清单')
        expected_duration = max(0, sum(segment.duration for segment in playlist.segments) - start)
        if seconds:
            expected_duration = min(expected_duration, seconds)
        for index, key in enumerate(playlist.keys):
            if key is None or key.method == 'NONE':
                continue
            if key.method != 'AES-128':
                raise ValueError('不支持的播放加密格式')
            encoded = task.get('keys', {}).get(key.absolute_uri)
            if not encoded:
                raise ValueError('播放鉴权数据缺失，请在播放页重新提取')
            data = base64.b64decode(encoded, validate=True)
            if len(data) != 16:
                raise ValueError('无效的播放鉴权数据')
            keyfile = workdir / f'key-{index}'
            keyfile.write_bytes(data)
            keyfile.chmod(0o600)
            # FFmpeg treats `C:\...` as a custom `c:` protocol on Windows.
            # A file URI works on Windows, macOS and Linux.
            key.uri = file_uri(keyfile)
        for segment in playlist.segments:
            segment.uri = segment.absolute_uri
            if segment.init_section:
                segment.init_section.uri = segment.init_section.absolute_uri
        source = workdir / 'audio.m3u8'
        playlist.dump(str(source))
    command = ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y']
    if str(source).split('?')[0].endswith('.m3u8'):
        command += ['-protocol_whitelist', 'file,http,https,tcp,tls,crypto', '-allowed_extensions', 'ALL']
    if start:
        command += ['-ss', str(start)]
    command += ['-i', str(source)]
    if seconds:
        command += ['-t', str(seconds)]
    command += ['-map', '0:a:0', '-vn', '-ac', '1', '-ar', '16000', str(target)]
    command[1:1] = ['-progress', 'pipe:1', '-nostats', '-rw_timeout', '30000000']
    with tempfile.TemporaryFile() as errors:
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=errors, text=True)
        import threading
        timer = threading.Timer(7200, process.kill)
        timer.start()
        try:
            for line in process.stdout:
                if progress and expected_duration and line.startswith('out_time_us='):
                    try:
                        elapsed = int(line.partition('=')[2]) / 1000000
                        progress('正在提取音轨', min(44, 5 + elapsed / expected_duration * 39))
                    except ValueError:
                        pass
            code = process.wait()
        finally:
            timer.cancel()
            if process.poll() is None:
                process.kill()
                process.wait()
            process.stdout.close()
        if code:
            raise RuntimeError('音频提取失败，请确认录像可以播放并重新提取')
    if expected_duration is not None:
        probe = json.loads(subprocess.check_output([
            'ffprobe', '-v', 'error', '-show_format', '-of', 'json', str(target)]))
        actual_duration = float(probe['format']['duration'])
        if abs(actual_duration - expected_duration) > 2:
            raise RuntimeError(f'音轨不完整：预期 {expected_duration:.1f} 秒，实际 {actual_duration:.1f} 秒')


_engine = None
_batch_size = 8
_converter = None


def initialize_engine(model, cpu_threads, batch_size):
    """Load once per worker, then reuse across all of its chunks."""
    global _engine, _batch_size, _converter
    from faster_whisper import WhisperModel, BatchedInferencePipeline
    from opencc import OpenCC
    model = WhisperModel(model, device='cpu', compute_type='int8', cpu_threads=cpu_threads)
    _engine = BatchedInferencePipeline(model=model) if batch_size > 1 else model
    _batch_size = batch_size
    _converter = OpenCC('t2s')


def transcribe_chunk(args):
    path, offset = args
    options = {'batch_size': _batch_size} if _batch_size > 1 else {}
    segments, _ = _engine.transcribe(path, language='zh', vad_filter=True, beam_size=1, **options)
    return [(float(segment.start) + offset, float(segment.end) + offset,
             _converter.convert(segment.text.strip()))
            for segment in segments if segment.text.strip()]


def split_audio(audio, directory, chunk_seconds, silence_window=5):
    """Prefer a nearby pause, preserving every sample and exact offsets."""
    chunks = []
    with wave.open(str(audio), 'rb') as source:
        frames_per_chunk = int(chunk_seconds * source.getframerate())
        if frames_per_chunk < 1:
            raise ValueError('音频块长度必须为正数')
        position = 0
        while position < source.getnframes():
            count = min(frames_per_chunk, source.getnframes() - position)
            # Search the last five seconds for a quiet 200ms window. Never discard
            # silence/audio; choose only a boundary, so text remains source-faithful.
            if (count == frames_per_chunk and count < source.getnframes() - position
                    and source.getnchannels() == 1 and source.getsampwidth() == 2):
                window = min(int(silence_window * source.getframerate()), count // 2)
                source.setpos(position + count - window)
                samples = array.array('h', source.readframes(window))
                if sys.byteorder != 'little':
                    samples.byteswap()
                step = max(1, source.getframerate() // 5)
                for index in range(len(samples) - step, -1, -step):
                    if sum(value * value for value in samples[index:index + step]) / step < 250 ** 2:
                        count = count - window + index + step // 2
                        break
            source.setpos(position)
            data = source.readframes(count)
            path = directory / f'chunk-{len(chunks):04d}.wav'
            with wave.open(str(path), 'wb') as target:
                target.setparams(source.getparams())
                target.writeframes(data)
            chunks.append((str(path), position / source.getframerate()))
            position += len(data) // (source.getsampwidth() * source.getnchannels())
    return chunks


def create_transcription_pool(model='small', workers=2, batch_size=1):
    worker_count = max(1, min(int(workers or 2), 4))
    threads = max(1, min(4, (os.cpu_count() or 4) // worker_count))
    return ProcessPoolExecutor(max_workers=worker_count,
                               mp_context=multiprocessing.get_context('spawn'),
                               initializer=initialize_engine,
                               initargs=(model, threads, batch_size))


def run(task, output, model='small', seconds=None, start=0, progress=None, workers=2, chunk_seconds=600,
        batch_size=1, process_pool=None):
    report = progress or (lambda stage, percent: None)
    title = re.sub(r'[\x00-\x1f\\/:*?"<>|]', '_', task.get('title') or '课程').strip(' .')[:100] or '课程'
    folder = Path(output)
    folder.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='pku-audio-') as directory:
        audio = Path(directory) / 'audio.wav'
        print('正在提取音轨…', flush=True)
        report('正在提取音轨', 5)
        extract_audio(task, audio, Path(directory), seconds, start, report)
        print(f'音频就绪：{audio.stat().st_size / 1024 / 1024:.1f} MB，开始转写', flush=True)
        report('正在切分音频', 45)
        chunk_dir = Path(directory) / 'chunks'
        chunk_dir.mkdir()
        chunks = split_audio(audio, chunk_dir, chunk_seconds)
        audio.unlink()
        if not chunks:
            raise RuntimeError('没有生成音频分块')
        report(f'正在并行转写（{len(chunks)} 个分块）', 48)
        jobs = [(path, offset + start) for path, offset in chunks]
        all_segments = []
        owns_pool = process_pool is None
        pool = process_pool or create_transcription_pool(model, workers, batch_size)
        futures = {}
        try:
            futures = {pool.submit(transcribe_chunk, job): job[0] for job in jobs}
            for done, future in enumerate(as_completed(futures), 1):
                all_segments.extend(future.result())
                Path(futures[future]).unlink()
                report(f'正在并行转写 · {done}/{len(futures)} 个分块',
                       min(99, 48 + done / len(futures) * 51))
        except Exception:
            for future in futures:
                future.cancel()
            # TemporaryDirectory must remain alive until already-running workers
            # stop reading their chunks.
            for future in futures:
                try:
                    future.result()
                except Exception:
                    pass
            raise
        finally:
            if owns_pool:
                pool.shutdown(wait=True, cancel_futures=True)
        all_segments.sort(key=lambda item: item[0])
        if not all_segments:
            raise RuntimeError('音轨中未识别到文字')
        name = '试听转写.txt' if seconds else '全文.txt'
        partial = folder / (name + '.partial')
        with partial.open('w', encoding='utf-8') as stream:
            stream.write(title + '\n\n')
            for segment_start, segment_end, segment_text in all_segments:
                timestamp = int(segment_start)
                stream.write(f'[{timestamp//3600:02d}:{timestamp%3600//60:02d}:{timestamp%60:02d}] {segment_text}\n')
        partial.replace(folder / name)
        print(f'完成：{folder / name}', flush=True)
        report('转写完成', 100)
        return folder / name


ORIGINS = {'https://course.pku.edu.cn', 'https://onlineroomse.pku.edu.cn'}
IDENTIFIER = re.compile(r'[a-f0-9]{24}')
MAX_BODY = 4_000_000


def allowed_resource(url):
    if not isinstance(url, str):
        raise ValueError('资源地址无效')
    parsed = urlparse(url)
    if (parsed.scheme != 'https' or parsed.hostname != 'resourcese.pku.edu.cn'
            or parsed.username or parsed.password or parsed.port not in (None, 443)):
        raise ValueError('只支持北大录像资源地址')


def validate_task(task):
    if not isinstance(task, dict) or not isinstance(task.get('title'), str):
        raise ValueError('无效的课程任务')
    if not task['title'].strip() or len(task['title']) > 300:
        raise ValueError('课程标题无效')
    allowed_resource(task.get('url'))
    clean = {'title': task['title'].strip(), 'url': task['url']}
    course_id = task.get('course_id', '')
    if not isinstance(course_id, str) or (course_id and not re.fullmatch(r'_[0-9]+_1', course_id)):
        raise ValueError('课程编号无效')
    clean['course_id'] = course_id
    playlist_text = task.get('playlist')
    if urlparse(clean['url']).path.endswith('.m3u8') and not playlist_text:
        raise ValueError('播放鉴权数据缺失，请在播放页重新提取')
    if playlist_text:
        import m3u8
        if not isinstance(playlist_text, str) or not playlist_text.startswith('#EXTM3U'):
            raise ValueError('播放清单无效')
        playlist = m3u8.loads(playlist_text, uri=clean['url'])
        if playlist.is_variant or not playlist.segments or not playlist.is_endlist:
            raise ValueError('仅支持已结束的课堂录像媒体清单')
        for segment in playlist.segments:
            allowed_resource(segment.absolute_uri)
            if segment.init_section:
                allowed_resource(segment.init_section.absolute_uri)
        keys = {}
        supplied = task.get('keys', {})
        if not isinstance(supplied, dict):
            raise ValueError('播放密钥无效')
        for key in playlist.keys:
            if key is None or key.method == 'NONE':
                continue
            if key.method != 'AES-128' or not key.uri:
                raise ValueError('不支持的播放加密格式')
            allowed_resource(key.absolute_uri)
            encoded = supplied.get(key.absolute_uri, '')
            if not isinstance(encoded, str) or len(base64.b64decode(encoded, validate=True)) != 16:
                raise ValueError('播放鉴权数据缺失，请在播放页重新提取')
            keys[key.absolute_uri] = encoded
        clean.update(playlist=playlist_text, keys=keys)
    return clean


def task_id(task):
    # PKU HLS paths identify recordings. Other endpoints may identify media by query.
    parsed = urlparse(task['url'])
    identity = parsed.hostname + parsed.path
    if not parsed.path.endswith('.m3u8'):
        identity += '?' + parsed.query
    return hashlib.sha256(identity.encode()).hexdigest()[:24]


def atomic_json(path, value):
    temporary = path.with_suffix('.tmp')
    descriptor = os.open(temporary, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(descriptor, 'w', encoding='utf-8') as stream:
        json.dump(value, stream, ensure_ascii=False)
        stream.flush()
        os.fsync(stream.fileno())
    temporary.replace(path)


def remove_legacy_duplicate(folder):
    """Remove only the exact redundant directory written by versions <= 2.6.26.1."""
    final = folder / '全文.txt'
    if not final.is_file():
        return
    for child in folder.iterdir():
        if not child.is_dir():
            continue
        contents = list(child.iterdir())
        if (len(contents) == 1 and contents[0].name == '全文.txt' and contents[0].is_file()
                and contents[0].read_bytes() == final.read_bytes()):
            contents[0].unlink()
            child.rmdir()


class JobStore:
    def __init__(self, root, runner=run, process_pool=None, **options):
        self.root = Path(root)
        self.root.mkdir(parents=True, exist_ok=True, mode=0o700)
        self.root.chmod(0o700)
        self.runner = runner
        self.options = options
        self.process_pool = process_pool
        if self.process_pool is None and runner is run:
            self.process_pool = create_transcription_pool(options.get('model', 'small'),
                                                          options.get('workers', 2),
                                                          options.get('batch_size', 1))
        self.lock = threading.RLock()
        self.jobs = {}
        self.worker = ThreadPoolExecutor(max_workers=1)
        self.closed = False
        self.recover()

    def persist(self, state):
        folder = self.root / state['id']
        folder.mkdir(exist_ok=True, mode=0o700)
        atomic_json(folder / 'result.json', state)

    def recover(self):
        pending = []
        for path in self.root.glob('*/result.json'):
            if not IDENTIFIER.fullmatch(path.parent.name):
                continue
            try:
                state = json.loads(path.read_text(encoding='utf-8'))
                if state['id'] != path.parent.name:
                    continue
                if (not isinstance(state.get('title'), str) or not isinstance(state.get('progress'), (int, float))
                        or state.get('status') not in ('queued', 'running', 'complete', 'error')):
                    continue
                state.setdefault('course_id', '')
                state.setdefault('created', 0)
                self.jobs[state['id']] = state
                task_path = path.parent / 'task.json'
                if state['status'] == 'complete' and (path.parent / '全文.txt').is_file():
                    task_path.unlink(missing_ok=True)
                    remove_legacy_duplicate(path.parent)
                elif state['status'] in ('queued', 'running') and task_path.exists():
                    task = validate_task(json.loads(task_path.read_text(encoding='utf-8')))
                    state.update(status='queued', progress=0, stage='服务重启，等待重新处理')
                    self.persist(state)
                    pending.append((state['id'], task))
                else:
                    state.update(status='error', stage='任务未完成，请在浏览器重新提交')
                    task_path.unlink(missing_ok=True)
                    self.persist(state)
            except (ValueError, KeyError, TypeError, OSError):
                state = self.jobs.get(path.parent.name)
                if state:
                    state.update(status='error', stage='任务文件无法恢复，请在浏览器重新提交')
                continue
        for identifier, task in sorted(pending, key=lambda item: self.jobs[item[0]]['created']):
            self.worker.submit(self.process, identifier, task)

    def submit(self, task):
        task = validate_task(task)
        identifier = task_id(task)
        with self.lock:
            if self.closed:
                raise ValueError('服务正在退出，请稍后重试')
            state = self.jobs.get(identifier)
            if state and state['status'] != 'error':
                if task['course_id'] and not state.get('course_id'):
                    state['course_id'] = task['course_id']
                    self.persist(state)
                return dict(state)
            legacy = hashlib.sha256(json.dumps([task['url'], task.get('playlist', '')],
                                              ensure_ascii=False).encode()).hexdigest()[:24]
            if legacy in self.jobs and self.jobs[legacy]['status'] == 'complete':
                state = dict(self.jobs[legacy], course_id=task['course_id'])
                self.jobs[legacy] = state
                self.persist(state)
                return dict(state)
            state = dict(id=identifier, title=task['title'], course_id=task['course_id'],
                         status='queued', stage='等待处理', progress=0, created=time.time())
            folder = self.root / identifier
            folder.mkdir(exist_ok=True, mode=0o700)
            # Per-recording AES keys, never Cookie/JWT. Removed after success or failure.
            atomic_json(folder / 'task.json', task)
            self.persist(state)
            self.jobs[identifier] = state
            self.worker.submit(self.process, identifier, task)
            return dict(state)

    def process(self, identifier, task):
        folder = self.root / identifier
        last_saved = 0

        def report(stage, percent):
            nonlocal last_saved
            with self.lock:
                self.jobs[identifier].update(status='running', stage=stage, progress=round(percent, 1))
                if time.monotonic() - last_saved >= 1:
                    self.persist(self.jobs[identifier])
                    last_saved = time.monotonic()
        try:
            runner_options = dict(self.options)
            if self.process_pool is not None:
                runner_options['process_pool'] = self.process_pool
            path = Path(self.runner(task, folder, progress=report, **runner_options))
            final = folder / '全文.txt'
            if path.resolve() != final.resolve():
                temporary = folder / '全文.txt.partial'
                shutil.copyfile(path, temporary)
                temporary.replace(final)
            with self.lock:
                (folder / 'task.json').unlink(missing_ok=True)
                self.jobs[identifier].update(status='complete', stage='转写完成', progress=100)
                self.persist(self.jobs[identifier])
        except Exception as error:
            stage = str(error) if isinstance(error, (RuntimeError, ValueError)) else '转写失败，请检查模型、FFmpeg 和磁盘空间后重试'
            if '://' in stage or len(stage) > 180:
                stage = '提取失败，请确认录像可播放后重试'
            with self.lock:
                (folder / 'task.json').unlink(missing_ok=True)
                self.jobs[identifier].update(status='error', stage=stage)
                self.persist(self.jobs[identifier])

    def get(self, identifier):
        with self.lock:
            state = self.jobs.get(identifier)
            return dict(state) if state else None

    def list(self):
        with self.lock:
            return [dict(state) for state in sorted(self.jobs.values(), key=lambda state: state['created'])]

    def bundle(self, identifiers):
        if (not isinstance(identifiers, list) or not 0 < len(identifiers) <= 500
                or any(not isinstance(item, str) or not IDENTIFIER.fullmatch(item) for item in identifiers)):
            raise ValueError('请选择 1–500 个已完成任务')
        stream = io.BytesIO()
        with zipfile.ZipFile(stream, 'w', zipfile.ZIP_DEFLATED) as archive:
            for identifier in dict.fromkeys(identifiers):
                state = self.get(identifier)
                if not state or state['status'] != 'complete':
                    raise ValueError('部分任务尚未完成，请刷新任务列表后下载')
                name = re.sub(r'[\x00-\x1f\\/:*?"<>|]', '_', state['title']).strip(' .')[:100] or '课程'
                archive.write(self.root / identifier / '全文.txt', f'{name}-{identifier[:8]}.txt')
        return stream.getvalue()

    def close(self):
        with self.lock:
            self.closed = True
        # Unstarted jobs stay on disk. Finish the active lecture before exiting.
        self.worker.shutdown(wait=True, cancel_futures=True)
        if self.process_pool is not None:
            self.process_pool.shutdown(wait=True, cancel_futures=True)


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def authorized(self):
        return (self.headers.get('Host') == f'127.0.0.1:{self.server.server_port}'
                and self.headers.get('Origin') in (*ORIGINS, None)
                and self.headers.get('X-PKU-Art') == '1')

    def respond(self, code, data, content_type='application/json; charset=utf-8'):
        body = json.dumps(data, ensure_ascii=False).encode() if isinstance(data, dict) else data
        self.send_response(code)
        origin = self.headers.get('Origin')
        if origin in ORIGINS:
            self.send_header('Access-Control-Allow-Origin', origin)
            self.send_header('Vary', 'Origin')
        self.send_header('Content-Type', content_type)
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        try:
            self.wfile.write(body)
        except (BrokenPipeError, ConnectionResetError):
            pass

    def do_OPTIONS(self):
        if self.headers.get('Origin') not in ORIGINS:
            return self.respond(403, {'error': 'Forbidden'})
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', self.headers['Origin'])
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, X-PKU-Art')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.end_headers()

    def do_POST(self):
        if not self.authorized():
            return self.respond(403, {'error': 'Forbidden'})
        if self.path not in ('/jobs', '/bundle'):
            return self.respond(404, {'error': 'Not found'})
        try:
            length = int(self.headers.get('Content-Length', '0'))
            if not 0 < length < MAX_BODY:
                raise ValueError('任务大小无效')
            self.connection.settimeout(15)
            payload = json.loads(self.rfile.read(length))
            if self.path == '/bundle':
                return self.respond(200, self.server.store.bundle(payload['ids']), 'application/zip')
            self.respond(200, self.server.store.submit(payload))
        except (ValueError, TypeError, KeyError):
            self.respond(400, {'error': '任务无效或未完成，请在浏览器刷新后重试'})
        except TimeoutError:
            self.respond(408, {'error': '请求超时'})
        except Exception as error:
            print(f'POST {self.path} failed: {type(error).__name__}', flush=True)
            self.respond(500, {'error': '本地服务处理失败，请查看服务窗口后重试'})

    def do_GET(self):
        if not self.authorized():
            return self.respond(403, {'error': 'Forbidden'})
        if self.path == '/health':
            return self.respond(200, {'status': 'ok', 'api_version': 2})
        if self.path == '/jobs':
            return self.respond(200, {'jobs': self.server.store.list()})
        match = re.fullmatch(r'/jobs/([a-f0-9]{24})(/text)?', self.path)
        if not match:
            return self.respond(404, {'error': 'Not found'})
        identifier, download = match.groups()
        state = self.server.store.get(identifier)
        if not state:
            return self.respond(404, {'error': '任务不存在，请重新提取'})
        if download:
            if state['status'] != 'complete':
                return self.respond(409, {'error': '任务尚未完成'})
            return self.respond(200, (self.server.store.root / identifier / '全文.txt').read_bytes(),
                                'text/plain; charset=utf-8')
        self.respond(200, state)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=Path(__file__).parent / 'outputs' / 'jobs')
    parser.add_argument('--workers', type=int, choices=range(1, 5), default=2)
    parser.add_argument('--model', default='small')
    parser.add_argument('--batch-size', type=int, choices=range(1, 17), default=1)
    args = parser.parse_args()
    try:
        import m3u8  # noqa: F401
        from opencc import OpenCC  # noqa: F401
        from faster_whisper import WhisperModel  # noqa: F401
    except ImportError as error:
        parser.error(f'缺少 Python 依赖 {error.name}；请使用当前 Python 执行 -m pip install -r video-text/requirements.txt')
    for command in ('ffmpeg', 'ffprobe'):
        if not shutil.which(command):
            parser.error(f'缺少 {command}，请先安装 FFmpeg')
    # Bind first so a second service cannot process the same queue.
    server = ThreadingHTTPServer(('127.0.0.1', 8878), Handler)
    store = JobStore(args.output, workers=args.workers, model=args.model, batch_size=args.batch_size)
    server.store = store
    print('PKU-Art transcription service: http://127.0.0.1:8878', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('等待当前课程完成后退出；未开始的任务将于下次启动恢复。', flush=True)
    finally:
        server.server_close()
        store.close()


if __name__ == '__main__':
    main()
