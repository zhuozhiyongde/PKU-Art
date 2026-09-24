import { downloadIcon } from './icon.js';

const transcriptStyles = `
:host{--gap:12px;display:block!important;height:auto!important;min-height:0!important;grid-column:1/-1;flex:0 0 auto;margin:12px 0;color:var(--c-text,#222);font:14px/1.5 system-ui,sans-serif}
:host(.batch-column){margin:0 10px 20px!important;color:var(--c-text,#222)}
*{box-sizing:border-box}.panel{padding:12px;border:1px solid var(--c-border,#ccc);border-radius:6px;background:var(--c-background,#fff)}
.batch-column-panel{padding:0;border:0;background:transparent}.batch-column-panel>summary{font-size:18px;font-weight:600}
.batch-column-panel[open]{position:fixed;z-index:10001;top:72px;left:12px;width:min(420px,calc(100vw - 24px));max-height:calc(100vh - 84px);overflow:auto;padding:16px;border:1px solid var(--c-border,#ccc);border-radius:8px;background:var(--c-background,#fff);box-shadow:0 12px 32px rgb(0 0 0 / 24%)}
.batch-column-panel[open]>summary{position:sticky;z-index:1;top:-16px;margin:-16px -16px 0;padding:16px;background:var(--c-background,#fff)}
.batch-column-panel .row{align-items:stretch}.batch-column-panel .row button{flex:1 1 100%;width:100%}
.row{display:flex;align-items:center;gap:var(--gap);flex-wrap:wrap}.status{flex:1 1 200px;overflow-wrap:anywhere}
progress{width:100%;height:12px;accent-color:var(--cyan-6,#079a93)}button{min-height:36px;border:1px solid var(--c-border,#ccc);border-radius:6px;background:var(--c-tip,#eee);color:inherit;padding:6px 12px;cursor:pointer;font:inherit}
button:disabled{opacity:.6;cursor:default}[hidden]{display:none!important}.courses{display:grid;gap:6px;margin:12px 0;max-height:260px;overflow:auto}
label{display:flex;gap:6px;align-items:baseline;overflow-wrap:anywhere}input{accent-color:var(--cyan-6,#079a93)}ul{padding-left:20px;max-height:240px;overflow:auto}li{margin:6px 0;overflow-wrap:anywhere}summary{cursor:pointer}
`;
const SERVICE = 'http://127.0.0.1:8878';
const COURSE_ORIGIN = 'https://course.pku.edu.cn';
const VIDEO_LIST = '/webapps/bb-streammedia-hqy-BBLEARN/videoList.action';
const COURSE_FLAG = 'PKU_ART_BATCH_TRANSCRIPTION_ENABLED';
const transcriptStore = `PKU_ART_TRANSCRIPT:${location.pathname}${location.search}`;
let transcriptionActive = false;

function serviceRequest(path, method = 'GET', body, plain = false, binary = false) {
    return new Promise((resolve, reject) => GM_xmlhttpRequest({
        method, url: SERVICE + path, timeout: 15000,
        headers: { 'Content-Type': 'application/json', 'X-PKU-Art': '1' },
        responseType: binary ? 'blob' : 'text', data: body ? JSON.stringify(body) : undefined,
        async onload(response) {
            try {
                if (response.status < 200 || response.status >= 300) {
                    const text = binary ? await response.response.text() : response.responseText;
                    let message = `本地服务请求失败（${response.status}）`;
                    try { message = JSON.parse(text).error || message; } catch { /* non-JSON */ }
                    throw new Error(message);
                }
                resolve(binary ? response.response : (plain ? response.responseText : JSON.parse(response.responseText)));
            } catch (error) { reject(error); }
        },
        onerror: () => reject(new Error('本地转写服务未连接，请启动 video-text/service.py')),
        ontimeout: () => reject(new Error('连接本地服务超时')),
    }));
}

function downloadBlob(blob, name) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = name; document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function transcriptPanel(anchor) {
    let host = document.getElementById('pku-art-transcript-status');
    if (host) return host.shadowRoot;
    host = document.createElement('div'); host.id = 'pku-art-transcript-status';
    const root = host.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>${transcriptStyles}</style><div class="row"><span class="status" role="status">正在连接本地服务</span><span class="percent"></span><button class="download" hidden>${downloadIcon}下载 TXT</button></div><progress max="100" aria-label="课程文字提取进度"></progress>`;
    anchor.parentElement.appendChild(host);
    return root;
}

async function runTranscription(prepare, anchor) {
    if (transcriptionActive) return;
    transcriptionActive = true; anchor.disabled = true;
    const root = transcriptPanel(anchor);
    const status = root.querySelector('.status'); const bar = root.querySelector('progress');
    const percent = root.querySelector('.percent'); const download = root.querySelector('.download');
    download.hidden = true; bar.removeAttribute('value'); percent.textContent = '';
    try {
        await serviceRequest('/health');
        let job; const saved = sessionStorage.getItem(transcriptStore);
        if (saved) try { job = await serviceRequest(`/jobs/${saved}`); } catch { sessionStorage.removeItem(transcriptStore); }
        if (!job || job.status === 'error') {
            status.textContent = '正在读取播放鉴权';
            job = await serviceRequest('/jobs', 'POST', await prepare());
            sessionStorage.setItem(transcriptStore, job.id);
        }
        while (job.status !== 'complete') {
            status.textContent = job.stage; bar.value = job.progress; percent.textContent = `${Math.round(job.progress)}%`;
            if (job.status === 'error') throw new Error(job.stage);
            await new Promise(resolve => setTimeout(resolve, 1500));
            job = await serviceRequest(`/jobs/${job.id}`);
        }
        status.textContent = job.stage; bar.value = 100; percent.textContent = '100%'; download.hidden = false;
        download.onclick = async () => {
            download.disabled = true;
            try {
                const text = await serviceRequest(`/jobs/${job.id}/text`, 'GET', undefined, true);
                downloadBlob(new Blob([text], { type: 'text/plain;charset=utf-8' }), `${job.title.replace(/[\\/:*?"<>|]/g, '_')}-全文.txt`);
            } catch (error) { status.textContent = error.message; } finally { download.disabled = false; }
        };
    } catch (error) { status.textContent = error.message; bar.removeAttribute('value'); percent.textContent = '未完成'; }
    finally { anchor.disabled = false; transcriptionActive = false; }
}

let playerTask;

export function rememberVideoTask(url, title) {
    if (mediaUrl(url)) playerTask = { url, title };
}

function mediaUrl(value) {
    try {
        const url = new URL(value);
        return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
    } catch {
        return '';
    }
}

export function createVideoTask(fallbackUrl, title) {
    const sources = [...document.querySelectorAll('video, audio, video source, audio source')]
        .map(node => node.currentSrc || node.src);
    const resources = performance.getEntriesByType('resource').map(entry => entry.name)
        .filter(url => /\.(m3u8|mp4|m4a|mp3|aac)(?:[?#]|$)/i.test(url));
    const url = [fallbackUrl, playerTask?.url, ...sources, ...resources.reverse()].map(mediaUrl).find(Boolean);
    if (!url) throw new Error('未获取到视频地址，请在正在播放的录像页面重试。');
    const heading = document.querySelector('.course-info__header')?.textContent?.trim();
    const name = title?.replace(/\.mp4$/i, '').trim() || playerTask?.title || heading || document.title || '课程';
    const task = { version: 1, url, title: name, referer: location.origin + location.pathname };
    return task;
}

export async function exportVideoTask(url, title) {
    return runTranscription(() => prepareAudioTask(createVideoTask(url, title)), document.getElementById('injectTextTaskButton'));
}

export async function prepareAudioTask(task) {
    if (!new URL(task.url).pathname.endsWith('.m3u8')) return task;
    const response = await fetch(task.url, { credentials: 'include', signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`播放清单读取失败：${response.status}`);
    const playlist = await response.text();
    if (!playlist.startsWith('#EXTM3U')) throw new Error('当前资源不是 HLS 播放清单');
    if (playlist.includes('#EXT-X-STREAM-INF:')) throw new Error('当前录像使用多码率主清单，暂不支持');
    const keys = {};
    for (const match of playlist.matchAll(/#EXT-X-KEY:.*?URI="([^"]+)"/g)) {
        const keyUrl = new URL(match[1], task.url).href;
        if (new URL(keyUrl).origin !== new URL(task.url).origin) throw new Error('不支持跨域密钥');
        if (keys[keyUrl]) continue;
        const keyResponse = await fetch(keyUrl, { credentials: 'include', signal: AbortSignal.timeout(30000) });
        if (!keyResponse.ok) throw new Error(`播放鉴权失败：${keyResponse.status}`);
        const bytes = new Uint8Array(await keyResponse.arrayBuffer());
        if (bytes.length !== 16) throw new Error('不支持的播放密钥格式');
        keys[keyUrl] = btoa(String.fromCharCode(...bytes));
    }
    return { ...task, playlist, keys };
}

// The authenticated player runs in a cross-origin iframe. Let that frame resolve
// its own media URL; never reconstruct or replay the Blackboard login signature.
export function initializeVideoTextBridge() {
    let pending;
    if (location.hostname === 'course.pku.edu.cn' && location.pathname.includes('playVideo.action')) {
        window.addEventListener('message', event => {
            if (window.parent !== window && event.source === window.parent && event.origin === location.origin
                && event.data?.pkuArtPrepareAudio === true) {
                for (const frame of document.querySelectorAll('iframe')) {
                    frame.contentWindow.postMessage({ pkuArtPrepareAudio: true }, 'https://onlineroomse.pku.edu.cn');
                }
                return;
            }
            if (event.origin !== 'https://onlineroomse.pku.edu.cn') return;
            if (![...document.querySelectorAll('iframe')].some(frame => frame.contentWindow === event.source)) return;
            if (event.data?.pkuArtAudioReady) {
                pending?.resolve(event.data.pkuArtAudioReady);
                pending = undefined;
                if (window.parent !== window) window.parent.postMessage({ pkuArtAudioReady: event.data.pkuArtAudioReady }, location.origin);
                return;
            }
            if (event.data?.pkuArtAudioError) {
                pending?.reject(new Error(event.data.pkuArtAudioError));
                pending = undefined;
                if (window.parent !== window) window.parent.postMessage({ pkuArtAudioError: event.data.pkuArtAudioError }, location.origin);
                return;
            }
            const task = event.data?.pkuArtVideoTask;
            if (!task || !mediaUrl(task.url) || typeof task.title !== 'string') return;
            if (window.parent !== window) window.parent.postMessage({ pkuArtVideoTask: task }, location.origin);
            let button = document.getElementById('pku-art-frame-transcript');
            if (!button) {
                button = document.createElement('button');
                button.id = 'pku-art-frame-transcript';
                button.type = 'button';
                button.textContent = '提取完整课程文字';
                document.body.prepend(button);
            }
            button.dataset.task = JSON.stringify(task);
            button.onclick = () => {
                runTranscription(() => new Promise((resolve, reject) => {
                    const timer = setTimeout(() => { pending = undefined; reject(new Error('播放鉴权超时，请重试')); }, 60000);
                    pending = { resolve: value => { clearTimeout(timer); resolve(value); }, reject: error => { clearTimeout(timer); reject(error); } };
                    event.source.postMessage({ pkuArtPrepareAudio: true }, event.origin);
                }), button);
            };
        });
    }
    if (location.hostname !== 'onlineroomse.pku.edu.cn') return;
    const publish = () => {
        try {
            const task = createVideoTask('', '');
            if (window.parent !== window) {
                window.parent.postMessage({ pkuArtVideoTask: task }, 'https://course.pku.edu.cn');
            }
        } catch { /* Player has not loaded its media yet. */ }
    };
    setInterval(publish, 2000);
    window.addEventListener('message', async event => {
        if (event.origin !== 'https://course.pku.edu.cn' || event.source !== window.parent
            || event.data?.pkuArtPrepareAudio !== true) return;
        try {
            const task = createVideoTask('', '');
            window.parent.postMessage({ pkuArtAudioReady: await prepareAudioTask(task) }, event.origin);
        } catch (error) {
            window.parent.postMessage({ pkuArtAudioError: error.message }, event.origin);
        }
    });
}

function courseId() {
    return new URLSearchParams(location.search).get('course_id') || '';
}

function discoverCourses() {
    const courses = new Map();
    for (const link of document.querySelectorAll('a[href]')) {
        let url;
        try { url = new URL(link.getAttribute('href'), location.href); } catch { continue; }
        if (url.origin !== COURSE_ORIGIN) continue;
        const id = url.searchParams.get('course_id') || (/launcher$/.test(url.pathname)
            ? url.searchParams.get('id')?.match(/_[0-9]+_1/)?.[0] : '');
        const title = link.textContent.replace(/\s+/g, ' ').trim();
        if (/^_[0-9]+_1$/.test(id || '') && title && !courses.has(id)) courses.set(id, { id, title });
    }
    return [...courses.values()];
}

async function collectRecordings(course, signal) {
    const first = new URL(VIDEO_LIST, COURSE_ORIGIN);
    first.search = new URLSearchParams({ course_id: course.id, mode: 'view', numResults: '1000', editPaging: 'true' });
    const pending = [first.href]; const visited = new Set(); const recordings = new Map(); let expected = 0;
    while (pending.length) {
        signal.throwIfAborted();
        const url = pending.shift();
        if (visited.has(url)) continue;
        if (visited.size >= 100) throw new Error('录像分页过多，请在课程内分批处理');
        visited.add(url);
        const response = await fetch(url, { credentials: 'include', signal });
        if (!response.ok || new URL(response.url).origin !== COURSE_ORIGIN
            || !new URL(response.url).pathname.endsWith('videoList.action')) throw new Error('录像列表读取失败，请确认已登录教学网');
        const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
        const links = [...doc.querySelectorAll('a[href*="playVideo.action"]')].map(link => ({
            url: new URL(link.getAttribute('href'), response.url).href,
            title: link.closest('tr')?.textContent?.replace(/\s+/g, ' ').trim() || '课堂回放',
        })).filter(item => new URL(item.url).origin === COURSE_ORIGIN);
        const counts = [...doc.querySelectorAll('[id$="_itemcount"] strong')].map(node => Number(node.textContent));
        if (counts.length) expected = Math.max(expected, ...counts.filter(Number.isFinite));
        if (!links.length && !doc.querySelector('[id$="_pagingcontrols"],#listContainer,#listContainer_databody')) {
            throw new Error('未找到录像列表，请确认本课程已开通课堂实录');
        }
        for (const item of links) recordings.set(item.url, item);
        for (const link of doc.querySelectorAll('.paging a[href],[id$="_pagingcontrols"] a[href]')) {
            const next = new URL(link.getAttribute('href'), response.url);
            if (next.origin === COURSE_ORIGIN && next.pathname === VIDEO_LIST
                && next.searchParams.get('course_id') === course.id && !link.id.endsWith('_gopaging')) pending.push(next.href);
        }
    }
    if (expected > recordings.size) throw new Error(`录像列表不完整（${recordings.size}/${expected}）`);
    return [...recordings.values()];
}

function authenticatedFrameTask(url, signal) {
    return new Promise((resolve, reject) => {
        const frame = document.createElement('iframe'); frame.hidden = true; frame.src = url;
        let requested = false;
        const finish = (error, task) => {
            clearTimeout(timer); window.removeEventListener('message', receive);
            signal.removeEventListener('abort', abort); frame.remove();
            if (error) reject(error); else resolve(task);
        };
        const abort = () => finish(new Error('已停止读取回放'));
        const timer = setTimeout(() => finish(new Error('回放认证超时，请打开该录像确认能播放')), 90000);
        function receive(event) {
            if (event.source !== frame.contentWindow || event.origin !== COURSE_ORIGIN) return;
            if (event.data?.pkuArtVideoTask && !requested) {
                requested = true; frame.contentWindow.postMessage({ pkuArtPrepareAudio: true }, COURSE_ORIGIN);
            }
            if (requested && event.data?.pkuArtAudioReady) finish(null, event.data.pkuArtAudioReady);
            if (event.data?.pkuArtAudioError) finish(new Error(event.data.pkuArtAudioError));
        }
        window.addEventListener('message', receive); signal.addEventListener('abort', abort, { once: true });
        if (signal.aborted) abort(); else document.body.appendChild(frame);
    });
}

function createBatchPanel(inToolColumn = false) {
    const host = document.createElement('div'); host.id = 'pku-art-batch-panel';
    if (inToolColumn) host.className = 'portlet clearfix batch-column';
    const root = host.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>${transcriptStyles}</style><details class="panel${inToolColumn ? ' batch-column-panel' : ''}"><summary>课堂回放文字 · 批量转写</summary>
    <p>选择课程后，将未完成回放加入本机队列。提交后保持本地服务运行。</p><div class="courses"></div>
    <div class="row"><button class="start">识别所选课程</button><button class="stop" hidden>停止读取</button><button class="refresh">刷新进度</button><button class="download" disabled>下载已完成 TXT（ZIP）</button></div>
    <p class="status" role="status">请先选择课程。</p><progress max="100" hidden></progress><p class="queue"></p><ul class="jobs"></ul></details>`;
    const target = inToolColumn ? document.querySelector('#column0') : document.querySelector('#contentPanel,#content,.container');
    if (inToolColumn) target.appendChild(host); else (target || document.body).prepend(host);
    const status = root.querySelector('.status'); const queue = root.querySelector('.queue');
    const start = root.querySelector('.start'); const stop = root.querySelector('.stop');
    const download = root.querySelector('.download'); const bar = root.querySelector('progress');
    let jobs = []; let controller; let timer; let refreshing = false;
    const selected = () => [...root.querySelectorAll('.courses input:checked')].map(input => ({ id: input.value, title: input.dataset.title }));
    const visibleJobs = () => { const ids = new Set(selected().map(course => course.id)); return jobs.filter(job => ids.has(job.course_id)); };
    const render = () => {
        const visible = visibleJobs(); const complete = visible.filter(job => job.status === 'complete');
        download.disabled = !complete.length;
        queue.textContent = `${complete.length} 已完成，${visible.filter(job => ['queued', 'running'].includes(job.status)).length} 处理中，${visible.filter(job => job.status === 'error').length} 失败`;
        root.querySelector('.jobs').replaceChildren(...visible.map(job => Object.assign(document.createElement('li'), { textContent: `${job.title} · ${job.stage}（${Math.round(job.progress)}%）` })));
    };
    const refresh = async () => {
        if (refreshing) return; refreshing = true; clearTimeout(timer);
        try {
            jobs = (await serviceRequest('/jobs')).jobs; render();
            if (root.querySelector('details').open && jobs.some(job => ['queued', 'running'].includes(job.status))) timer = setTimeout(refresh, 5000);
        } catch (error) { queue.textContent = error.message; } finally { refreshing = false; }
    };
    root.querySelector('details').ontoggle = event => {
        if (inToolColumn) (event.target.open ? document.body : target).appendChild(host);
        if (event.target.open) refresh(); else clearTimeout(timer);
    };
    root.querySelector('.refresh').onclick = refresh; stop.onclick = () => controller?.abort();
    start.onclick = async () => {
        const courses = selected(); if (!courses.length) { status.textContent = '请至少选择一门课程'; return; }
        controller = new AbortController(); start.disabled = true; stop.hidden = false; bar.hidden = false; bar.value = 0;
        root.querySelectorAll('.courses input').forEach(input => { input.disabled = true; });
        let submitted = 0; let cached = 0; const errors = [];
        try {
            if ((await serviceRequest('/health')).api_version !== 2) throw new Error('请更新并重启本地转写服务');
            for (let courseIndex = 0; courseIndex < courses.length; courseIndex += 1) {
                const course = courses[courseIndex];
                if (controller.signal.aborted) break;
                try {
                    status.textContent = `正在读取 ${course.title}`;
                    const recordings = await collectRecordings(course, controller.signal);
                    for (let index = 0; index < recordings.length; index += 1) {
                        const item = recordings[index];
                        if (controller.signal.aborted) break;
                        status.textContent = `${course.title} · ${index + 1}/${recordings.length}`;
                        try {
                            const task = await authenticatedFrameTask(item.url, controller.signal);
                            const job = await serviceRequest('/jobs', 'POST', { ...task, course_id: course.id });
                            if (job.status === 'complete') cached += 1; else submitted += 1;
                        } catch (error) { if (!controller.signal.aborted) errors.push(`${item.title}：${error.message}`); }
                        bar.value = (courseIndex + (index + 1) / recordings.length) / courses.length * 100;
                    }
                } catch (error) { if (!controller.signal.aborted) errors.push(`${course.title}：${error.message}`); }
            }
            status.textContent = `${controller.signal.aborted ? '已停止；' : ''}${submitted} 节已加入队列，${cached} 节已有文字${errors.length ? `，失败：${errors.join('；')}` : ''}`;
        } catch (error) { status.textContent = error.message; }
        finally {
            start.disabled = false; stop.hidden = true; controller = undefined;
            root.querySelectorAll('.courses input').forEach(input => { input.disabled = false; }); await refresh();
        }
    };
    download.onclick = async () => {
        download.disabled = true;
        try {
            const ids = visibleJobs().filter(job => job.status === 'complete').map(job => job.id);
            downloadBlob(await serviceRequest('/bundle', 'POST', { ids }, false, true), '课程回放文字.zip');
        } catch (error) { status.textContent = error.message; } finally { render(); }
    };
    const known = new Set();
    if (inToolColumn) queueMicrotask(refresh);
    return courses => courses.forEach(course => {
        if (known.has(course.id)) return; known.add(course.id);
        const input = document.createElement('input'); input.type = 'checkbox'; input.value = course.id; input.dataset.title = course.title;
        input.checked = localStorage.getItem(`${COURSE_FLAG}:${course.id}`) === '1';
        input.onchange = () => { localStorage.setItem(`${COURSE_FLAG}:${course.id}`, input.checked ? '1' : '0'); render(); };
        const label = document.createElement('label'); label.append(input, document.createTextNode(course.title)); root.querySelector('.courses').appendChild(label);
    });
}

export function initializeBatchTranscript() {
    if (location.hostname !== 'course.pku.edu.cn' || window.parent !== window) return;
    if (document.readyState === 'loading') return document.addEventListener('DOMContentLoaded', initializeBatchTranscript, { once: true });
    if (document.getElementById('pku-art-batch-panel')) return;
    const home = /\/webapps\/portal\//.test(location.pathname);
    if (!home && !(/videoList\.action|courseMain/.test(location.pathname) && /^_[0-9]+_1$/.test(courseId()))) return;
    let update; let timer;
    const scan = () => {
        const courses = discoverCourses();
        const shown = home ? courses : [{ id: courseId(), title: courses.find(item => item.id === courseId())?.title || document.title }];
        if (!shown.length) return; if (!update) update = createBatchPanel(home && Boolean(document.querySelector('#column0'))); update(shown);
    };
    scan();
    new MutationObserver(() => { clearTimeout(timer); timer = setTimeout(scan, 250); }).observe(document.body, { childList: true, subtree: true });
}
