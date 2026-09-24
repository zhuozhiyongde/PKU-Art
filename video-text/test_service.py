import importlib.util
import json
import tempfile
import threading
import time
import unittest
from http.server import ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen


SPEC = importlib.util.spec_from_file_location('pku_art_transcription_service', Path(__file__).with_name('service.py'))
SERVICE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(SERVICE)


class DummyPool:
    def __init__(self):
        self.closed = False

    def shutdown(self, **_kwargs):
        self.closed = True


class ServiceTests(unittest.TestCase):
    def test_file_uri_is_portable(self):
        with tempfile.TemporaryDirectory() as directory:
            uri = SERVICE.file_uri(Path(directory) / 'key-0')
        self.assertTrue(uri.startswith('file:///'))
        self.assertNotIn('\\', uri)

    def test_job_store_reuses_pool_and_keeps_one_result(self):
        pool = DummyPool()
        seen_pools = []

        def runner(_task, output, progress, process_pool, **_options):
            seen_pools.append(process_pool)
            progress('测试转写', 50)
            result = Path(output) / '全文.txt'
            result.write_text('课程\n\n[00:00:00] 测试\n', encoding='utf-8')
            return result

        with tempfile.TemporaryDirectory() as directory:
            store = SERVICE.JobStore(Path(directory), runner=runner, process_pool=pool)
            states = [store.submit({
                'title': f'测试课程 {index}',
                'url': f'https://resourcese.pku.edu.cn/video/test-{index}.mp4',
                'course_id': '_1_1',
            }) for index in range(2)]
            deadline = time.time() + 3
            while (any(store.get(state['id'])['status'] not in ('complete', 'error') for state in states)
                   and time.time() < deadline):
                time.sleep(0.01)
            for state in states:
                self.assertEqual(store.get(state['id'])['status'], 'complete')
                job = Path(directory) / state['id']
                self.assertTrue((job / '全文.txt').is_file())
                self.assertEqual([path for path in job.iterdir() if path.is_dir()], [])
            self.assertEqual(seen_pools, [pool, pool])
            store.close()
        self.assertTrue(pool.closed)

    def test_recover_removes_only_exact_legacy_duplicate(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            identifier = 'a' * 24
            job = root / identifier
            duplicate = job / '课程标题'
            different = job / '人工修改'
            duplicate.mkdir(parents=True)
            different.mkdir()
            (job / '全文.txt').write_text('相同结果', encoding='utf-8')
            (duplicate / '全文.txt').write_text('相同结果', encoding='utf-8')
            (different / '全文.txt').write_text('不同结果', encoding='utf-8')
            (job / 'result.json').write_text(json.dumps({
                'id': identifier,
                'title': '课程标题',
                'course_id': '_1_1',
                'status': 'complete',
                'stage': '转写完成',
                'progress': 100,
                'created': 1,
            }), encoding='utf-8')
            store = SERVICE.JobStore(root, runner=lambda *_args, **_kwargs: None)
            self.assertFalse(duplicate.exists())
            self.assertTrue(different.exists())
            self.assertEqual((job / '全文.txt').read_text(encoding='utf-8'), '相同结果')
            store.close()

    def test_rejects_non_pku_media(self):
        with self.assertRaises(ValueError):
            SERVICE.validate_task({'title': '测试', 'url': 'https://example.com/video.mp4'})

    def test_http_origin_and_header_checks(self):
        server = ThreadingHTTPServer(('127.0.0.1', 0), SERVICE.Handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        url = f'http://127.0.0.1:{server.server_port}/health'
        try:
            allowed = Request(url, headers={'X-PKU-Art': '1', 'Origin': 'https://course.pku.edu.cn'})
            with urlopen(allowed, timeout=2) as response:
                self.assertEqual(json.load(response), {'status': 'ok', 'api_version': 2})
            for headers in ({}, {'X-PKU-Art': '1', 'Origin': 'https://example.com'}):
                with self.assertRaises(HTTPError) as error:
                    urlopen(Request(url, headers=headers), timeout=2)
                self.assertEqual(error.exception.code, 403)
        finally:
            server.shutdown()
            server.server_close()
            thread.join(timeout=2)


if __name__ == '__main__':
    unittest.main()
