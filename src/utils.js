import { downloadIcon, linkIcon, refreshIcon, closeIcon, validIcon, invalidIcon } from './icon.js';
import { exportVideoTask, rememberVideoTask } from './videoText.js';

/**
 * Logo 导航功能 - 点击导航区域左侧 150px 以内，且在导航区域顶部 60px 以内（Logo）时跳转到首页
 * 仅在 course.pku.edu.cn/elective.pku.edu.cn 域名下生效
 */
function initializeLogoNavigation() {
    if (!/^https:\/\/course\.pku\.edu\.cn\/|^https:\/\/elective\.pku\.edu\.cn\//.test(window.location.href)) {
        return;
    }

    const isElectivePage = /^https:\/\/elective\.pku\.edu\.cn\//.test(window.location.href);
    const isGoNestedPage = /goNested\.do/.test(window.location.href);
    const isWorkPage = /(ElectiveWorkController\.jpf|election\.jsp|electCourse\.do|cancelCourse\.do)/.test(
        window.location.href,
    );
    const homeURL = isElectivePage
        ? 'https://elective.pku.edu.cn/elective2008/edu/pku/stu/elective/controller/help/HelpController.jpf'
        : 'https://course.pku.edu.cn';

    const getElement = () => {
        if (isGoNestedPage) {
            return document.body;
        }
        if (isWorkPage) {
            return document.querySelector('body > #scopeOneSpan > table:first-of-type td');
        }
        if (isElectivePage) {
            return document.querySelector('body > table:first-of-type td');
        }
        return document.getElementById('globalNavPageNavArea');
    };

    console.log(
        '[PKU Art] initializeLogoNavigation() has been used at ' +
            new Date().toLocaleString() +
            ', isElectivePage: ' +
            isElectivePage +
            ', isGoNestedPage: ' +
            isGoNestedPage +
            ', isWorkPage: ' +
            isWorkPage,
    );

    const handleLogoClick = (event) => {
        const navArea = event.currentTarget;
        const clickOffsetX = event.clientX - navArea.getBoundingClientRect().left;
        const clickOffsetY = event.clientY - navArea.getBoundingClientRect().top;
        if (clickOffsetX <= 150 && clickOffsetY <= 60) {
            window.location.href = homeURL;
        }
    };

    const bindLogoNavigation = () => {
        const element = getElement();
        if (element && !element.dataset.pkuArtLogoBound) {
            element.addEventListener('click', handleLogoClick);
            element.dataset.pkuArtLogoBound = 'true';
        }
    };

    bindLogoNavigation();
    document.addEventListener('DOMContentLoaded', bindLogoNavigation);
}

/**
 * 确保侧边栏可见 - 如果侧边栏处于折叠状态则自动展开
 * 仅在 course.pku.edu.cn 域名下生效
 */
function ensureSidebarVisible() {
    if (!/^https:\/\/course\.pku\.edu\.cn\//.test(window.location.href)) {
        return;
    }

    const resetNavigationPane = () => {
        const navigationPane = document.getElementById('navigationPane');
        if (navigationPane && navigationPane.classList.contains('navcollapsed')) {
            const puller = document.getElementById('menuPuller');
            if (puller) {
                puller.click();
                console.log('[PKU Art] sidebar reseted by auto click at ' + new Date().toLocaleString());
            }
        }
    };

    resetNavigationPane();
    window.addEventListener('resize', resetNavigationPane);
}

/**
 * 替换网站图标 - 将默认图标替换为自定义 PKU 图标
 * 支持 course/autolab/disk/elective.pku.edu.cn 域名
 */
function overrideSiteIcons() {
    if (!/^https:\/\/(course|autolab|disk|elective)\.pku\.edu\.cn\//.test(window.location.href)) {
        return;
    }

    console.log('[PKU Art] overrideSiteIcons() has been used at ' + new Date().toLocaleString());

    const replaceIcons = () => {
        const all_icons = document.querySelectorAll('link[rel="icon" i], link[rel="shortcut icon" i]');
        const not_custom_icons = document.querySelectorAll(
            'link[rel="icon" i]:not([href^="https://cdn.arthals.ink/"]), link[rel="shortcut icon" i]:not([href^="https://cdn.arthals.ink/"])',
        );
        if (all_icons.length == 0 || not_custom_icons.length > 0) {
            not_custom_icons.forEach((icon) => {
                icon.parentNode.removeChild(icon);
            });
            const newIcon = document.createElement('link');
            newIcon.rel = 'SHORTCUT ICON';
            newIcon.href = 'https://cdn.arthals.ink/css/src/PKU.svg';
            document.head.appendChild(newIcon);

            const appleIcon16 = document.createElement('link');
            appleIcon16.rel = 'icon';
            appleIcon16.type = 'image/png';
            appleIcon16.sizes = '16x16';
            appleIcon16.href = 'https://cdn.arthals.ink/css/src/pku_16x16.png';
            document.head.appendChild(appleIcon16);

            const appleIcon32 = document.createElement('link');
            appleIcon32.rel = 'icon';
            appleIcon32.type = 'image/png';
            appleIcon32.sizes = '32x32';
            appleIcon32.href = 'https://cdn.arthals.ink/css/src/pku_32x32.png';
            document.head.appendChild(appleIcon32);

            const appleIconTouch = document.createElement('link');
            appleIconTouch.rel = 'apple-touch-icon';
            appleIconTouch.sizes = '180x180';
            appleIconTouch.href = 'https://cdn.arthals.ink/css/src/pku_180x180.png';
            document.head.appendChild(appleIconTouch);
        }
    };

    replaceIcons();
    document.addEventListener('DOMContentLoaded', replaceIcons);

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                replaceIcons();
            }
        });
    });

    const observeHead = () => {
        if (document.head) {
            observer.observe(document.head, { childList: true, subtree: true });
        }
    };

    observeHead();
    document.addEventListener('DOMContentLoaded', observeHead);
}

/**
 * 移除课程序号 - 清理课程列表中的课程编号和学期信息
 * 包括门户页面、通知流页面和右键菜单中的课程名称
 */
function removeCourseSerialNumbers() {
    const url = window.location.href;

    const isPortalPage =
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/?$|^https:\/\/course\.pku\.edu\.cn\/webapps\/portal\/\S*$/.test(url);
    const isAlertsStreamPage =
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=alerts\S*$/.test(url);

    if (isPortalPage) {
        const stripPortalSerials = () => {
            const courseLinks = document.querySelectorAll(
                '.containerPortal > div:not(:first-child) .portlet .portletList-img > li > a',
            );
            courseLinks.forEach((courseLink) => {
                courseLink.innerHTML = courseLink.innerHTML
                    .replace(/^.*?: /, '')
                    .replace(/\(\d+-\d+学年第\d学期.*?\)/, '');
            });
            console.log('[PKU Art] course serial deleted: ' + courseLinks.length + ' courses');
        };

        stripPortalSerials();
        document.addEventListener('DOMContentLoaded', stripPortalSerials);
    }

    if (isAlertsStreamPage) {
        let alertCleanupTimer;
        const stripAlertSerials = () => {
            const courseLinks = document.querySelectorAll('#streamHeader_alerts a');
            courseLinks.forEach((courseLink) => {
                courseLink.innerHTML = courseLink.innerHTML.replace(/\(\d+-\d+学年第\d学期\)/, '');
            });
            if (courseLinks.length !== 0 && alertCleanupTimer) {
                clearInterval(alertCleanupTimer);
            }
        };

        stripAlertSerials();
        alertCleanupTimer = setInterval(() => {
            const courseLinks = document.querySelectorAll('#streamHeader_alerts a');
            if (courseLinks.length !== 0) {
                stripAlertSerials();
            }
        }, 50);
    }

    const removeContextMenuSerials = () => {
        const contextMenuOpenLink = document.querySelector('#breadcrumbs .coursePath .courseArrow a');
        const doRemoveContextMenuSerials = () => {
            contextMenuOpenLink.removeEventListener('mouseover', doRemoveContextMenuSerials);
            contextMenuOpenLink.removeEventListener('click', doRemoveContextMenuSerials);
            const waitForContextMenuReadyInterval = setInterval(() => {
                console.log('[PKU Art] Waiting for context menu ready...');
                if (contextMenuOpenLink.savedDiv.querySelector('li[id^="最近访问"]')) {
                    clearInterval(waitForContextMenuReadyInterval);
                    contextMenuOpenLink.savedDiv.innerHTML = contextMenuOpenLink.savedDiv.innerHTML.replace(
                        /\(\d+-\d+学年第\d学期\)/g,
                        '',
                    );
                    const emptyMenu = contextMenuOpenLink.savedDiv.querySelector(
                        'ul[role="presentation"]:has(.contextmenu_empty)',
                    );
                    if (emptyMenu) {
                        contextMenuOpenLink.savedDiv.removeChild(emptyMenu);
                        console.log('[PKU Art] Removed empty context menu');
                    }
                }
            }, 100);
        };
        if (contextMenuOpenLink) {
            contextMenuOpenLink.addEventListener('mouseover', doRemoveContextMenuSerials);
            // if somehow the user clicks before mouseover :(
            contextMenuOpenLink.addEventListener('click', doRemoveContextMenuSerials);
            contextMenuOpenLink.addEventListener('click', registerCloseContextMenuOnPage);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', removeContextMenuSerials);
    } else {
        removeContextMenuSerials();
    }
}

const HLS_TEMP_FILE_PREFIX = 'pku-art-hls-';

function parseHlsAttributes(line) {
    const attributes = {};
    const content = line.slice(line.indexOf(':') + 1);
    const pattern = /([A-Z0-9-]+)=("[^"]*"|[^,]*)/g;
    let match;
    while ((match = pattern.exec(content))) {
        const value = match[2];
        attributes[match[1]] = value.startsWith('"') ? value.slice(1, -1) : value;
    }
    return attributes;
}

function parseHlsIv(value) {
    const normalized = value.replace(/^0x/i, '').padStart(32, '0');
    if (!/^[0-9a-f]{32}$/i.test(normalized)) {
        throw new Error(`不支持的 HLS IV：${value}`);
    }
    return new Uint8Array(normalized.match(/.{2}/g).map((byte) => Number.parseInt(byte, 16)));
}

function createHlsSequenceIv(sequence) {
    const iv = new Uint8Array(16);
    let value = BigInt(sequence);
    for (let index = iv.length - 1; index >= 0; index -= 1) {
        iv[index] = Number(value & 0xffn);
        value >>= 8n;
    }
    return iv;
}

function waitWithAbort(delay, signal) {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) {
            reject(signal.reason || new DOMException('下载已取消', 'AbortError'));
            return;
        }

        const onAbort = () => {
            clearTimeout(timer);
            reject(signal.reason || new DOMException('下载已取消', 'AbortError'));
        };
        const timer = setTimeout(() => {
            signal?.removeEventListener('abort', onAbort);
            resolve();
        }, delay);
        signal?.addEventListener('abort', onAbort, { once: true });
    });
}

async function fetchHlsResource(url, signal, responseType = 'arrayBuffer', options = {}) {
    const {
        maxAttempts = 8,
        omitCredentialsAfterFailure = false,
        maxRetryDelay = 30_000,
        requestTimeout = 45_000,
        onRetry = null,
    } = options;
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        if (signal?.aborted) {
            throw signal.reason || new DOMException('下载已取消', 'AbortError');
        }
        const attemptController = new AbortController();
        const forwardAbort = () => attemptController.abort(signal.reason);
        signal?.addEventListener('abort', forwardAbort, { once: true });
        const timeout = setTimeout(
            () => attemptController.abort(new DOMException('HLS 请求超时', 'TimeoutError')),
            requestTimeout,
        );
        try {
            // 播放列表和分片本身不需要登录态。首次请求仍复用快速的粘滞节点；
            // 一旦失败，后续请求不携带 HttpOnly INGRESSCOOKIE，避免一直命中故障节点。
            const credentials = omitCredentialsAfterFailure && attempt > 1 ? 'omit' : 'include';
            const response = await fetch(url, {
                credentials,
                signal: attemptController.signal,
            });
            if (!response.ok) {
                const error = new Error(`HTTP ${response.status} ${response.statusText}`);
                error.httpStatus = response.status;
                throw error;
            }
            return responseType === 'text' ? await response.text() : await response.arrayBuffer();
        } catch (error) {
            if (error.name === 'AbortError' || signal?.aborted) {
                throw error;
            }
            lastError = error;
            // 持续出现这些状态时，等待不会使资源恢复，避免无限循环。
            if ([400, 401, 403, 404].includes(error.httpStatus) && attempt >= 3) {
                break;
            }
            if (attempt < maxAttempts) {
                // 限流时给网关充足的恢复窗口，抖动可避免多个分片同时重试。
                const retryDelay =
                    Math.min(1000 * 2 ** Math.min(attempt - 1, 6), maxRetryDelay) +
                    Math.floor(Math.random() * 1000);
                onRetry?.({ attempt, retryDelay, error });
                await waitWithAbort(retryDelay, signal);
            }
        } finally {
            clearTimeout(timeout);
            signal?.removeEventListener('abort', forwardAbort);
        }
    }
    throw new Error(`获取 HLS 资源失败：${url}\n${lastError?.message || lastError}`);
}

async function resolveHlsMediaPlaylist(playlistUrl, signal, depth = 0) {
    if (depth > 3) {
        throw new Error('HLS 播放列表嵌套过深');
    }

    const text = await fetchHlsResource(playlistUrl, signal, 'text', {
        omitCredentialsAfterFailure: true,
    });
    const lines = text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    const variants = [];
    for (let index = 0; index < lines.length; index += 1) {
        if (!lines[index].startsWith('#EXT-X-STREAM-INF:')) continue;
        const attributes = parseHlsAttributes(lines[index]);
        const variantPath = lines.slice(index + 1).find((line) => !line.startsWith('#'));
        if (variantPath) {
            variants.push({
                bandwidth: Number(attributes.BANDWIDTH || 0),
                url: new URL(variantPath, playlistUrl).href,
            });
        }
    }

    if (variants.length > 0) {
        variants.sort((left, right) => right.bandwidth - left.bandwidth);
        return resolveHlsMediaPlaylist(variants[0].url, signal, depth + 1);
    }

    let mediaSequence = 0;
    let currentKey = null;
    let pendingDuration = 0;
    const segments = [];

    for (const line of lines) {
        if (line.startsWith('#EXT-X-MEDIA-SEQUENCE:')) {
            mediaSequence = Number.parseInt(line.split(':')[1], 10) || 0;
        } else if (line.startsWith('#EXT-X-KEY:')) {
            const attributes = parseHlsAttributes(line);
            if (attributes.METHOD === 'NONE') {
                currentKey = null;
            } else if (attributes.METHOD === 'AES-128' && attributes.URI) {
                currentKey = {
                    method: attributes.METHOD,
                    url: new URL(attributes.URI, playlistUrl).href,
                    iv: attributes.IV ? parseHlsIv(attributes.IV) : null,
                };
            } else {
                throw new Error(`不支持的 HLS 加密方式：${attributes.METHOD || '未知'}`);
            }
        } else if (line.startsWith('#EXTINF:')) {
            pendingDuration = Number.parseFloat(line.slice('#EXTINF:'.length)) || 0;
        } else if (line.startsWith('#EXT-X-BYTERANGE:') || line.startsWith('#EXT-X-MAP:')) {
            throw new Error('暂不支持 Byte Range 或 fMP4 格式的 HLS 录播');
        } else if (!line.startsWith('#')) {
            segments.push({
                url: new URL(line, playlistUrl).href,
                sequence: mediaSequence + segments.length,
                duration: pendingDuration,
                key: currentKey ? { ...currentKey } : null,
            });
            pendingDuration = 0;
        }
    }

    if (segments.length === 0) {
        throw new Error('HLS 播放列表中没有视频分片');
    }

    return { playlistUrl, segments };
}

function sanitizeFileName(fileName) {
    return fileName.replace(/[\\/:*?"<>|]/g, '_').replace(/\s+/g, ' ').trim();
}

async function cleanStaleHlsFiles(root) {
    try {
        const staleBefore = Date.now() - 24 * 60 * 60 * 1000;
        for await (const [name, handle] of root.entries()) {
            if (!name.startsWith(HLS_TEMP_FILE_PREFIX) || handle.kind !== 'file') continue;
            const file = await handle.getFile();
            if (file.lastModified < staleBefore) {
                await root.removeEntry(name);
            }
        }
    } catch (error) {
        console.warn('[PKU Art] 清理 HLS 临时文件失败', error);
    }
}

async function createHlsOutput(fileName) {
    if (window.top === window.self && typeof window.showSaveFilePicker === 'function') {
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: fileName,
            types: [
                {
                    description: 'MPEG-TS 视频',
                    accept: { 'video/mp2t': ['.ts'] },
                },
            ],
        });
        const writable = await fileHandle.createWritable();
        return {
            type: 'file-picker',
            write: (chunk) => writable.write(chunk),
            close: () => writable.close(),
            abort: () => writable.abort(),
        };
    }

    if (!navigator.storage?.getDirectory) {
        throw new Error('当前浏览器不支持大文件流式写入，请使用最新版 Chrome/Edge/Safari');
    }

    const root = await navigator.storage.getDirectory();
    void cleanStaleHlsFiles(root);
    const tempName = `${HLS_TEMP_FILE_PREFIX}${Date.now()}-${crypto.randomUUID?.() || Math.random()}.ts`;
    const fileHandle = await root.getFileHandle(tempName, { create: true });
    const writable = await fileHandle.createWritable();
    let isClosed = false;

    return {
        type: 'browser-download',
        async write(chunk) {
            await writable.write(chunk);
        },
        async close() {
            await writable.close();
            isClosed = true;
            const file = await fileHandle.getFile();
            const objectUrl = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = fileName;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            link.remove();

            // 等浏览器下载管理器打开文件后再清理 OPFS 中的临时副本。
            setTimeout(async () => {
                URL.revokeObjectURL(objectUrl);
                try {
                    await root.removeEntry(tempName);
                } catch (error) {
                    console.warn('[PKU Art] 清理 HLS 临时文件失败', error);
                }
            }, 5 * 60 * 1000);
        },
        async abort() {
            if (!isClosed) {
                await writable.abort().catch(() => {});
            }
            await root.removeEntry(tempName).catch(() => {});
        },
    };
}

async function downloadHlsVideo({ playlistUrl, fileName, signal, onProgress }) {
    const output = await createHlsOutput(fileName);
    let outputClosed = false;
    const requestController = new AbortController();
    const forwardAbort = () => requestController.abort(signal.reason);
    if (signal.aborted) {
        forwardAbort();
    } else {
        signal.addEventListener('abort', forwardAbort, { once: true });
    }
    const requestSignal = requestController.signal;

    try {
        onProgress({ stage: '正在读取视频信息…' });
        const { segments } = await resolveHlsMediaPlaylist(playlistUrl, requestSignal);
        const keyPromises = new Map();
        let downloadedBytes = 0;
        let completedSegments = 0;
        const startedAt = Date.now();
        const concurrency = 8;
        const prefetchWindow = concurrency * 3;

        const reportProgress = (stage, status = 'active') => {
            const elapsedSeconds = Math.max((Date.now() - startedAt) / 1000, 0.1);
            const speed = downloadedBytes / elapsedSeconds;
            const remainingSeconds =
                speed && completedSegments > 0
                    ? Math.round(((segments.length - completedSegments) / completedSegments) * elapsedSeconds)
                    : null;
            onProgress({
                stage,
                completedSegments,
                totalSegments: segments.length,
                downloadedBytes,
                bytesPerSecond: speed,
                remainingSeconds,
                status,
            });
        };

        const getCryptoKey = (keyUrl) => {
            if (!keyPromises.has(keyUrl)) {
                keyPromises.set(
                    keyUrl,
                    fetchHlsResource(keyUrl, requestSignal).then((rawKey) => {
                        if (rawKey.byteLength !== 16) {
                            throw new Error(`HLS 密钥长度异常：${rawKey.byteLength} 字节`);
                        }
                        return crypto.subtle.importKey('raw', rawKey, { name: 'AES-CBC' }, false, ['decrypt']);
                    }),
                );
            }
            return keyPromises.get(keyUrl);
        };

        const downloadSegment = async (segment, index) => {
            const encrypted = await fetchHlsResource(segment.url, requestSignal, 'arrayBuffer', {
                maxAttempts: Number.POSITIVE_INFINITY,
                omitCredentialsAfterFailure: true,
                requestTimeout: 30_000,
                onRetry({ attempt, retryDelay }) {
                    reportProgress(
                        `分片 ${index + 1} 响应较慢，${Math.ceil(retryDelay / 1000)} 秒后切换节点（第 ${attempt} 次重试）…`,
                        'warning',
                    );
                },
            });
            if (!segment.key) {
                return encrypted;
            }
            const key = await getCryptoKey(segment.key.url);
            const iv = segment.key.iv || createHlsSequenceIv(segment.sequence);
            return crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, encrypted);
        };

        // 8 路并发 + 24 个分片的有界预取窗口：慢分片不会立即让其他连接空闲，
        // 同时不会像一次性拉取全部分片那样无界占用内存。
        const waitingTasks = [];
        let activeTasks = 0;
        const pumpTasks = () => {
            while (activeTasks < concurrency && waitingTasks.length > 0) {
                const task = waitingTasks.shift();
                activeTasks += 1;
                Promise.resolve()
                    .then(task.run)
                    .then(
                        (chunk) => task.resolve({ chunk }),
                        (error) => task.resolve({ error }),
                    )
                    .finally(() => {
                        activeTasks -= 1;
                        pumpTasks();
                    });
            }
        };
        const scheduleSegment = (segment, index) =>
            new Promise((resolve) => {
                waitingTasks.push({ run: () => downloadSegment(segment, index), resolve });
                pumpTasks();
            });

        const segmentDownloads = new Array(segments.length);
        const initialWindowSize = Math.min(prefetchWindow, segments.length);
        for (let index = 0; index < initialWindowSize; index += 1) {
            segmentDownloads[index] = scheduleSegment(segments[index], index);
        }

        for (let index = 0; index < segments.length; index += 1) {
            if (signal.aborted) {
                throw new DOMException('下载已取消', 'AbortError');
            }

            const result = await segmentDownloads[index];
            if (result.error) {
                throw result.error;
            }
            const { chunk } = result;
            const nextIndex = index + prefetchWindow;
            if (nextIndex < segments.length) {
                segmentDownloads[nextIndex] = scheduleSegment(segments[nextIndex], nextIndex);
            }
            segmentDownloads[index] = null;

            await output.write(chunk);
            downloadedBytes += chunk.byteLength;
            completedSegments += 1;

            reportProgress('正在下载视频分片…');
        }

        onProgress({ stage: '正在保存 TS 文件…' });
        await output.close();
        outputClosed = true;
        return { outputType: output.type, downloadedBytes, segmentCount: segments.length };
    } catch (error) {
        requestController.abort(error);
        if (!outputClosed) {
            await output.abort().catch(() => {});
        }
        throw error;
    } finally {
        signal.removeEventListener('abort', forwardAbort);
    }
}

/**
 * 直接下载功能 - 在录播播放页面注入下载按钮和复制链接功能
 * MP4 仍使用 GM_download；HLS 录播按网页播放链路拉取、解密并流式合并为 MPEG-TS。
 * 仅在 onlineroomse.pku.edu.cn/player 页面生效
 */
async function initializeDirectDownload() {
    const url = window.location.href;

    // 检查当前URL是否匹配特定格式
    if (!/^https:\/\/onlineroomse\.pku\.edu\.cn\/player\?course_id\S*$/.test(url)) return;

    console.log('[PKU Art] Injected directDownload() at ' + new Date().toLocaleString());

    // 下载链接、课程名、录播时间
    let downloadUrl = '';
    let downloadJson = '';
    let courseName = '';
    let subTitle = '';
    let lecturerName = '';
    let fileName = '';
    let isHls = false;

    const JWT_STORAGE_KEY = 'PKU_ART_DIRECT_DOWNLOAD_JWT';
    const RELOAD_ATTEMPTS_KEY = 'PKU_ART_DIRECT_DOWNLOAD_RELOAD_ATTEMPTS';
    const MAX_RELOAD_ATTEMPTS = 3;

    const originalSend = XMLHttpRequest.prototype.send;
    const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
    const requestHeaders = new WeakMap();

    XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
        let headers = requestHeaders.get(this);
        if (!headers) {
            headers = new Map();
            requestHeaders.set(this, headers);
        }
        headers.set(String(header).toLowerCase(), String(value));
        return originalSetRequestHeader.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function () {
        this.addEventListener('load', function () {
            if (this.responseURL.includes('get-sub-info-by-auth-data')) {
                const authorization = requestHeaders.get(this)?.get('authorization') || '';
                const jwt = authorization.replace(/^Bearer\s+/i, '').trim();
                if (jwt) {
                    try {
                        sessionStorage.setItem(JWT_STORAGE_KEY, jwt);
                        console.log('[PKU Art] JWT 已保存到 sessionStorage');
                    } catch (error) {
                        console.warn('[PKU Art] 无法保存 JWT', error);
                    }
                } else {
                    console.warn('[PKU Art] 视频信息请求中未找到 Authorization 请求头');
                }

                try {
                    downloadJson = JSON.parse(this.response);
                } catch (error) {
                    console.error('[PKU Art] 录播信息解析失败', error);
                    return;
                }

                if (!downloadJson?.list?.[0]?.sub_content) {
                    console.warn('[PKU Art] 录播信息中缺少可下载资源', downloadJson);
                    downloadJson = '';
                    return;
                }

                try {
                    sessionStorage.removeItem(RELOAD_ATTEMPTS_KEY);
                } catch (error) {
                    console.warn('[PKU Art] 无法清除重载计数', error);
                }

                console.log('[PKU Art] XHR 响应结果：\n', downloadJson);
                courseName = downloadJson.list[0].title;
                subTitle = downloadJson.list[0].sub_title;
                lecturerName = downloadJson.list[0].lecturer_name;
                try {
                    const filmContent = JSON.parse(downloadJson.list[0].sub_content);
                    const playback = filmContent.save_playback;
                    const contents = playback?.contents;
                    const firstSource = Array.isArray(contents) ? contents[0]?.preview || contents[0] : contents;
                    downloadUrl = typeof firstSource === 'string' ? firstSource : '';
                    if (!downloadUrl) {
                        throw new Error('录播资源地址为空');
                    }
                    isHls = playback?.is_m3u8 === 'yes' || /\.m3u8(?:$|\?)/i.test(downloadUrl);
                    fileName = sanitizeFileName(
                        `${courseName} - ${subTitle} - ${lecturerName}.${isHls ? 'ts' : 'mp4'}`,
                    );
                    rememberVideoTask(downloadUrl, fileName.replace(/\.(?:ts|mp4)$/i, ''));
                    console.log('[PKU Art] 下载链接解析成功：\n', downloadUrl);
                } catch (error) {
                    console.error('[PKU Art] 录播资源地址解析失败', error);
                    downloadJson = '';
                }
            }
        });
        originalSend.apply(this, arguments);
    };

    // 等待页面加载完成
    const INJECTION_OBSERVATION_MS = 3000;
    const didCaptureDownloadInfo = await new Promise((resolve) => {
        const injectionStartTime = Date.now();
        const checkExist = setInterval(() => {
            const footer = document.querySelector('.course-info__wrap .course-info__footer');
            if (downloadJson && footer) {
                console.log('[PKU Art] 页面加载完成，下载链接解析成功\n', downloadJson);
                clearInterval(checkExist);
                resolve(true);
                return;
            }

            if (footer && !downloadJson && Date.now() - injectionStartTime >= INJECTION_OBSERVATION_MS) {
                clearInterval(checkExist);
                let shouldContinue = true;
                try {
                    let currentAttempts = Number(sessionStorage.getItem(RELOAD_ATTEMPTS_KEY) || '0');
                    if (Number.isNaN(currentAttempts) || currentAttempts < 0) {
                        currentAttempts = 0;
                    }
                    if (currentAttempts >= MAX_RELOAD_ATTEMPTS) {
                        console.warn(`[PKU Art] 已尝试强制重载 ${currentAttempts} 次，停止自动重载`);
                    } else {
                        sessionStorage.setItem(RELOAD_ATTEMPTS_KEY, String(currentAttempts + 1));
                        console.warn('[PKU Art] 未能及时截获课程数据，即将刷新页面重试');
                        shouldContinue = false;
                        window.location.reload();
                    }
                } catch (error) {
                    console.warn('[PKU Art] 记录重载次数失败，尝试通过刷新页面恢复', error);
                    shouldContinue = false;
                    window.location.reload();
                }
                resolve(shouldContinue);
            }
        }, 500);
    });
    XMLHttpRequest.prototype.send = originalSend;
    XMLHttpRequest.prototype.setRequestHeader = originalSetRequestHeader;
    if (!didCaptureDownloadInfo || !downloadJson) {
        return;
    }

    const downloadAreaFooter = document.querySelector('.course-info__wrap .course-info__footer');
    if (!downloadAreaFooter) {
        console.warn('[PKU Art] 未找到 course-info__footer，无法注入下载功能');
        return;
    }

    const replayTitle = document.querySelector('.course-info__wrap .course-info__header > span');
    if (replayTitle) {
        replayTitle.innerText = `${courseName} - ${subTitle} - ${lecturerName}`;
    }

    while (downloadAreaFooter.firstChild) {
        downloadAreaFooter.removeChild(downloadAreaFooter.firstChild);
    }

    const createFooterButton = (id, label, icon) => {
        const button = document.createElement('button');
        button.id = id;
        button.type = 'button';
        button.className = 'PKU-Art';
        button.innerHTML = `<span class="PKU-Art">${icon}</span><span class="PKU-Art">${label}</span>`;
        return button;
    };

    const downloadButton = createFooterButton('injectDownloadButton', '下载视频', downloadIcon);
    const copyDownloadUrlButton = isHls
        ? null
        : createFooterButton('injectCopyDownloadUrlButton', '复制链接地址', linkIcon);

    let downloadSwitchArea = null;
    let switchInput = null;
    if (isHls) {
        downloadAreaFooter.classList.add('hls-download');
    } else {
        downloadSwitchArea = document.createElement('div');
        downloadSwitchArea.id = 'injectDownloadSwitchArea';
        downloadSwitchArea.className = 'PKU-Art';
        downloadSwitchArea.innerHTML = `
<input type="checkbox" id="injectDownloadSwitch" class="PKU-Art" checked>
<label for="injectDownloadSwitch"></label>
<span id="injectDownloadSwitchDesc" class="PKU-Art">自动重命名</span>
`;

        // 点击整个区域切换 checkbox 状态
        downloadSwitchArea.addEventListener('click', (event) => {
            // 如果点击的是 checkbox 或关联的 label，浏览器会自动处理切换
            const isCheckboxOrLabel =
                event.target.id === 'injectDownloadSwitch' || event.target.htmlFor === 'injectDownloadSwitch';
            if (!isCheckboxOrLabel) {
                switchInput.checked = !switchInput.checked;
            }
        });
        switchInput = downloadSwitchArea.querySelector('#injectDownloadSwitch');
    }

    downloadAreaFooter.appendChild(downloadButton);
    const textButton = createFooterButton('injectTextTaskButton', '提取完整课程文字', downloadIcon);
    textButton.onclick = async () => {
        textButton.disabled = true;
        try {
            await exportVideoTask(downloadUrl, fileName);
        } catch (error) {
            alert(error.message);
        } finally {
            textButton.disabled = false;
        }
    };
    downloadAreaFooter.appendChild(textButton);
    if (copyDownloadUrlButton) {
        downloadAreaFooter.appendChild(copyDownloadUrlButton);
    }
    if (downloadSwitchArea) {
        downloadAreaFooter.appendChild(downloadSwitchArea);
    }

    const isSafari = navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
    const renameSupported = isHls || typeof GM_download === 'function';
    if (!renameSupported) {
        // 删除不可用的重命名开关，改为显示环境兼容性提示。
        downloadSwitchArea.remove();
        downloadAreaFooter.classList.add('rename-unsupported');
        const renameUnsupportedTip = document.createElement('div');
        renameUnsupportedTip.id = 'injectDownloadRenameUnsupported';
        renameUnsupportedTip.className = 'PKU-Art';
        const warningIcon = isSafari ? '<span class="PKU-Art i-warning"></span>' : '';
        const tipText = isSafari ? 'Safari + UserScripts 不支持重命名文件' : '当前环境不支持自动重命名文件';
        renameUnsupportedTip.innerHTML = `${warningIcon}<span class="PKU-Art">${tipText}</span>`;
        downloadAreaFooter.appendChild(renameUnsupportedTip);
    }

    const copySupported =
        typeof GM_setClipboard === 'function' || (navigator.clipboard && navigator.clipboard.writeText);
    if (copyDownloadUrlButton && !copySupported) {
        copyDownloadUrlButton.disabled = true;
        copyDownloadUrlButton.querySelector('span:last-child').textContent = '复制链接不可用';
    }

    // 下载状态管理
    let currentDownload = null;
    let isDownloading = false;

    const escapeHtml = (value) =>
        String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');

    const formatRemainingTime = (seconds) => {
        if (!Number.isFinite(seconds)) return '';
        if (seconds < 60) return `预计还需 ${Math.max(1, seconds)} 秒`;
        if (seconds < 3600) return `预计还需 ${Math.floor(seconds / 60)} 分 ${seconds % 60} 秒`;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `预计还需 ${hours} 小时${minutes ? ` ${minutes} 分` : ''}`;
    };

    const getDownloadInfoMarkup = (renameEnabled) => {
        const fileLabel = renameEnabled ? '文件' : '建议文件名';
        const sourceLabel = isHls ? 'HLS 源地址' : '文件源地址';
        return `
<div class="PKU-Art inject-download-info">
    <div class="PKU-Art inject-download-info-row">
        <span class="PKU-Art inject-download-info-label">${fileLabel}</span>
        <span class="PKU-Art inject-download-file-name" title="${escapeHtml(fileName)}">${escapeHtml(fileName)}</span>
    </div>
    <div class="PKU-Art inject-download-info-row">
        <span class="PKU-Art inject-download-info-label">来源</span>
        <a class="PKU-Art" target="_blank" rel="noopener noreferrer" href="${escapeHtml(downloadUrl)}">${sourceLabel}</a>
    </div>
</div>`;
    };

    const renderDownloadStatus = ({
        title,
        detail = '',
        state = 'active',
        progress = null,
        renameEnabled = true,
    }) => {
        const downloadTip = document.getElementById('injectDownloadTip');
        const downloadTipText = document.getElementById('injectDownloadTipText');
        if (!downloadTip || !downloadTipText) return;

        downloadTip.dataset.state = state;
        const progressMarkup = progress
            ? `
<div class="PKU-Art inject-download-progress" role="progressbar" aria-label="下载进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress.percent.toFixed(2)}">
    <span class="PKU-Art" style="width: ${Math.min(100, Math.max(0, progress.percent))}%"></span>
</div>
<div class="PKU-Art inject-download-metrics">${progress.items
                  .filter(Boolean)
                  .map((item) => `<span class="PKU-Art">${escapeHtml(item)}</span>`)
                  .join('')}</div>`
            : '';
        const noticeMarkup = isHls
            ? '<div class="PKU-Art inject-download-notice">自 2026 年 09 月开始，教学网对视频进行了加密，下载速度和稳定性可能有所下降，且只能下载 .ts 格式（需要使用 IINA 或 VLC 等播放器播放）。</div>'
            : '';
        downloadTipText.innerHTML = `
<div class="PKU-Art inject-download-status-title">${escapeHtml(title)}</div>
${detail ? `<div class="PKU-Art inject-download-status-detail">${escapeHtml(detail)}</div>` : ''}
${progressMarkup}
${getDownloadInfoMarkup(renameEnabled)}
${noticeMarkup}`;
    };

    const formatDownloadError = (error) => {
        const message = String(error?.message || error || '未知错误');
        return message.replace(/^获取 HLS 资源失败：[^\n]+\n?/, '获取视频资源失败：');
    };

    const shouldUseManagedDownload = () => isHls || Boolean(renameSupported && switchInput?.checked);

    const startDownload = async (renameEnabled) => {
        const cancelBtn = document.getElementById('injectCancelDownload');
        const restartBtn = document.getElementById('injectRestartDownload');

        if (!renameEnabled) {
            window.open(downloadUrl, '_blank');
            renderDownloadStatus({
                title: '已在新窗口打开源文件',
                detail: '浏览器将接管后续下载。',
                state: 'success',
                renameEnabled,
            });
            cancelBtn.disabled = true;
            restartBtn.disabled = false;
            isDownloading = false;
            return;
        }

        isDownloading = true;
        cancelBtn.disabled = false;
        restartBtn.disabled = true;
        renderDownloadStatus({
            title: '正在准备下载…',
            detail: isHls ? '将保存为 TS 文件；下载过程中请保持本页面打开。' : '下载过程中请保持本页面打开。',
            renameEnabled,
        });

        if (isHls) {
            const abortController = new AbortController();
            currentDownload = { abort: () => abortController.abort() };
            window.addEventListener(
                'beforeunload',
                () => {
                    if (currentDownload) {
                        currentDownload.abort();
                    }
                },
                { once: true },
            );

            try {
                const result = await downloadHlsVideo({
                    playlistUrl: downloadUrl,
                    fileName,
                    signal: abortController.signal,
                    onProgress(progress) {
                        if (!progress.totalSegments) {
                            renderDownloadStatus({
                                title: progress.stage,
                                detail: '将保存为 TS 文件；下载过程中请保持本页面打开。',
                                state: progress.status || 'active',
                                renameEnabled,
                            });
                            return;
                        }

                        const percent = (progress.completedSegments / progress.totalSegments) * 100;
                        const downloadedMiB = (progress.downloadedBytes / 1024 / 1024).toFixed(1);
                        const speedMiB = (progress.bytesPerSecond / 1024 / 1024).toFixed(1);
                        renderDownloadStatus({
                            title: progress.stage,
                            detail: '下载过程中请保持本页面打开。网络波动时会自动切换节点重试。',
                            state: progress.status || 'active',
                            progress: {
                                percent,
                                items: [
                                    `${percent.toFixed(1)}%`,
                                    `${progress.completedSegments}/${progress.totalSegments} 个分片`,
                                    `已写入 ${downloadedMiB} MiB`,
                                    progress.bytesPerSecond > 0 ? `${speedMiB} MiB/s` : '正在计算速度',
                                    formatRemainingTime(progress.remainingSeconds),
                                ],
                            },
                            renameEnabled,
                        });
                    },
                });

                renderDownloadStatus({
                    title: result.outputType === 'browser-download' ? '视频处理完成' : '下载完成',
                    detail:
                        result.outputType === 'browser-download'
                            ? '浏览器正在保存 TS 文件，请留意下载列表。'
                            : 'TS 文件已保存到所选位置。',
                    state: 'success',
                    renameEnabled,
                });
            } catch (error) {
                if (error.name === 'AbortError') {
                    renderDownloadStatus({
                        title: '下载已取消',
                        detail: '本次下载产生的临时文件已清理。',
                        state: 'neutral',
                        renameEnabled,
                    });
                } else {
                    console.error('[PKU Art] HLS 下载失败', error);
                    renderDownloadStatus({
                        title: '下载失败',
                        detail: formatDownloadError(error),
                        state: 'error',
                        renameEnabled,
                    });
                }
            } finally {
                currentDownload = null;
                isDownloading = false;
                cancelBtn.disabled = true;
                restartBtn.disabled = false;
            }
            return;
        }

        try {
            let lastPrintTime = 0;
            let lastBytesLoaded = 0;
            let averageSpeed = 0;
            const SMOOTHING_FACTOR = 0.02;

            currentDownload = GM_download({
                url: downloadUrl,
                name: fileName,
                saveAs: true,
                onerror(event) {
                    console.error('[PKU Art] 下载失败：', event);
                    isDownloading = false;
                    currentDownload = null;
                    cancelBtn.disabled = true;
                    restartBtn.disabled = false;
                    renderDownloadStatus({
                        title: '下载失败',
                        detail: event.error || '浏览器未能完成下载。',
                        state: 'error',
                        renameEnabled,
                    });
                },
                onprogress(event) {
                    const currentTime = Date.now();
                    if (event.total && currentTime - lastPrintTime >= 100) {
                        const percentComplete = (event.loaded / event.total) * 100;
                        const currentProgress = percentComplete.toFixed(2);

                        const bytesDownloadedInLast100ms = event.loaded - lastBytesLoaded;
                        const lastSpeed = bytesDownloadedInLast100ms / (currentTime - lastPrintTime);
                        averageSpeed = SMOOTHING_FACTOR * lastSpeed + (1 - SMOOTHING_FACTOR) * averageSpeed;

                        const bytesRemaining = event.total - event.loaded;
                        const estimatedTimeRemaining = bytesRemaining / averageSpeed;
                        let estimatedTimeRemainingSeconds = Math.round(estimatedTimeRemaining / 1000);
                        if (Number.isNaN(estimatedTimeRemainingSeconds) || estimatedTimeRemainingSeconds > 9999) {
                            estimatedTimeRemainingSeconds = 'inf';
                        }

                        renderDownloadStatus({
                            title: '正在下载视频…',
                            detail: '下载过程中请保持本页面打开。',
                            progress: {
                                percent: percentComplete,
                                items: [
                                    `${currentProgress}%`,
                                    estimatedTimeRemainingSeconds === 'inf'
                                        ? '正在估算剩余时间'
                                        : formatRemainingTime(estimatedTimeRemainingSeconds),
                                ],
                            },
                            renameEnabled,
                        });
                        lastPrintTime = currentTime;
                        lastBytesLoaded = event.loaded;
                    }
                },
                onload() {
                    isDownloading = false;
                    currentDownload = null;
                    cancelBtn.disabled = true;
                    restartBtn.disabled = false;
                    renderDownloadStatus({ title: '下载完成', state: 'success', renameEnabled });
                },
            });

            window.addEventListener(
                'beforeunload',
                () => {
                    if (currentDownload) {
                        currentDownload.abort();
                    }
                },
                { once: true },
            );
        } catch (error) {
            console.warn('[PKU Art] GM_download 调用失败，回退到新窗口下载', error);
            window.open(downloadUrl, '_blank');
            isDownloading = false;
            currentDownload = null;
            cancelBtn.disabled = true;
            restartBtn.disabled = false;
            renderDownloadStatus({
                title: '已在新窗口打开源文件',
                detail: '当前环境不支持自动重命名，浏览器将接管后续下载。',
                state: 'neutral',
                renameEnabled: false,
            });
            alert('看上去当前环境不支持自动重命名功能，已尝试使用新标签页下载');
        }
    };

    downloadButton.addEventListener('click', async () => {
        console.log(`[PKU Art] 已启动下载：\n文件名：${fileName}\n源地址：${downloadUrl}`);
        const renameEnabled = shouldUseManagedDownload();

        const existingTip = document.getElementById('injectDownloadTip');
        if (existingTip) {
            if (isDownloading) {
                alert('正在下载中，请先取消当前下载');
                return;
            }
            // 已有提示框但不在下载中，直接开始新下载
            startDownload(renameEnabled);
            return;
        }

        // 创建下载提示框
        const downloadTip = document.createElement('div');
        downloadTip.id = 'injectDownloadTip';
        downloadTip.className = 'PKU-Art';

        const downloadTipText = document.createElement('div');
        downloadTipText.id = 'injectDownloadTipText';
        downloadTipText.className = 'PKU-Art';

        const downloadTipActions = document.createElement('div');
        downloadTipActions.id = 'injectDownloadTipActions';
        downloadTipActions.className = 'PKU-Art';

        const cancelBtn = document.createElement('button');
        cancelBtn.id = 'injectCancelDownload';
        cancelBtn.className = 'PKU-Art';
        cancelBtn.innerHTML = `${closeIcon}<span>取消下载</span>`;
        cancelBtn.disabled = true;

        const restartBtn = document.createElement('button');
        restartBtn.id = 'injectRestartDownload';
        restartBtn.className = 'PKU-Art';
        restartBtn.innerHTML = `${refreshIcon}<span>重新下载</span>`;
        restartBtn.disabled = true;

        cancelBtn.addEventListener('click', () => {
            if (currentDownload && isDownloading) {
                currentDownload.abort();
                if (isHls) {
                    cancelBtn.disabled = true;
                    renderDownloadStatus({
                        title: '正在取消下载…',
                        detail: '正在停止网络请求并清理临时文件。',
                        state: 'neutral',
                    });
                    return;
                }
                currentDownload = null;
                isDownloading = false;
                cancelBtn.disabled = true;
                restartBtn.disabled = false;
                renderDownloadStatus({ title: '下载已取消', state: 'neutral', renameEnabled });
            }
        });

        restartBtn.addEventListener('click', () => {
            const renameEnabled = shouldUseManagedDownload();
            startDownload(renameEnabled);
        });

        downloadTipActions.appendChild(cancelBtn);
        downloadTipActions.appendChild(restartBtn);
        downloadTip.appendChild(downloadTipText);
        downloadTip.appendChild(downloadTipActions);
        downloadAreaFooter.insertBefore(downloadTip, downloadAreaFooter.firstElementChild);

        startDownload(renameEnabled);
    });

    copyDownloadUrlButton?.addEventListener('click', async () => {
        if (copyDownloadUrlButton.disabled) {
            return;
        }
        console.log(`[PKU Art] 已复制下载链接：\n${downloadUrl}`);
        try {
            if (typeof GM_setClipboard === 'function') {
                GM_setClipboard(downloadUrl);
            } else if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(downloadUrl);
            } else {
                throw new Error('clipboard unsupported');
            }
            alert('下载链接已复制到剪贴板，但是因为存在鉴权，仍可能无法直接使用外部工具下载');
        } catch (error) {
            console.warn('[PKU Art] 复制下载链接失败，将提供备用方案', error);
            const manualCopy = prompt('复制下载链接失败，请手动复制下面的链接', downloadUrl);
            if (manualCopy === null) {
                alert('未能复制下载链接，请尝试手动选中复制');
            }
        }
    });
}

/**
 * 重定向全局更多链接 - 将导航栏"更多"链接指向成绩页面
 * 仅在 course.pku.edu.cn 域名下生效
 */
function redirectGlobalMoreLink() {
    if (!/^https:\/\/course\.pku\.edu\.cn\//.test(window.location.href)) {
        return;
    }

    let intervalId;

    const updateMoreLink = () => {
        const moreLink = document.querySelector('#global-more-link > a');
        if (moreLink) {
            console.log('[PKU Art] replaceMore() has been used at ' + new Date().toLocaleString());
            moreLink.href =
                '/webapps/bb-social-learning-BBLEARN/execute/mybb?cmd=display&toolId=MyGradesOnMyBb_____MyGradesTool';
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
    };

    intervalId = setInterval(updateMoreLink, 50);
    document.addEventListener('DOMContentLoaded', updateMoreLink);
}

/**
 * 启用直接打开链接 - 移除外链的 onclick 拦截，允许直接跳转
 * 仅在 course.pku.edu.cn 域名下生效
 */
function enableDirectOpenLinks() {
    if (!/^https:\/\/course\.pku\.edu\.cn\//.test(window.location.href)) {
        return;
    }

    const stripOnclickHandlers = () => {
        const links = document.querySelectorAll('a[onclick][href]');

        links.forEach((link) => {
            if (link.dataset.pkuArtProcessed) return;

            const href = link.getAttribute('href');
            // 只打开外链，不打开内链
            if (href && !href.startsWith('/') && !href.startsWith('#')) {
                link.removeAttribute('onclick');
                console.log('[PKU Art] 直接打开链接:', href);
            }
            link.dataset.pkuArtProcessed = 'true';
        });
    };

    stripOnclickHandlers();

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                stripOnclickHandlers();
            }
        });
    });

    const observeBody = () => {
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        }
    };

    observeBody();

    if (!document.body) {
        document.addEventListener('DOMContentLoaded', observeBody);
    }

    document.addEventListener('DOMContentLoaded', stripOnclickHandlers);
}

/**
 * 管理选课查询表单 - 自动保存/恢复表单值到 localStorage，并在切换课程分类时保留输入值
 * 仅在 elective.pku.edu.cn 选课查询页面生效
 */
function manageElectiveCourseQueryForm() {
    if (
        !/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/courseQuery\/\S*$/.test(
            window.location.href,
        )
    ) {
        return;
    }

    console.log('[PKU Art] manageElectiveCourseQueryForm() has been used at ' + new Date().toLocaleString());

    const STORAGE_KEY = 'pku_elective_form_values';
    const form = document.getElementById('qyForm');

    // ========== 辅助函数 ==========

    // 获取所有需要监听的 input 元素
    function getTargetInputs() {
        if (!form) return [];
        const allInputs = form.querySelectorAll('input');
        return Array.from(allInputs).filter((input) => input.id !== 'b_cancel' && input.id !== 'b_query');
    }

    // 保存表单值到 localStorage
    function saveFormValues() {
        const inputs = getTargetInputs();
        const formData = {};

        inputs.forEach((input) => {
            const key = input.id || input.name || input.getAttribute('data-key');
            if (key) {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    formData[key] = input.checked;
                } else {
                    formData[key] = input.value;
                }
            }
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }

    // 从 localStorage 还原表单值
    function restoreFormValues() {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (!savedData) {
            return;
        }

        try {
            const formData = JSON.parse(savedData);
            const inputs = getTargetInputs();

            inputs.forEach((input) => {
                const key = input.id || input.name || input.getAttribute('data-key');

                if (key && formData.hasOwnProperty(key)) {
                    if (input.type === 'checkbox' || input.type === 'radio') {
                        input.checked = formData[key];
                    } else {
                        input.value = formData[key];
                    }
                }
            });
        } catch (e) {
            console.error('还原表单值失败:', e);
        }
    }

    // 清空存储
    function clearFormValues() {
        localStorage.removeItem(STORAGE_KEY);
    }

    // ========== Radio 切换时保留课程号/课程名 ==========
    function setupRadioSwitchPreservation() {
        const courseID = document.querySelector('#courseID');
        const courseName = document.querySelector('#courseName');

        if (!courseID || !courseName) return;

        let savedID = courseID.value;
        let savedName = courseName.value;

        // 监听 #kcfl 的点击事件来更新保存的值
        document.querySelector('#kcfl')?.addEventListener(
            'click',
            function (e) {
                if (e.target.matches('input[type=radio]')) {
                    savedID = courseID.value;
                    savedName = courseName.value;

                    // 立即恢复
                    requestAnimationFrame(() => {
                        if (courseID.value === '') courseID.value = savedID;
                        if (courseName.value === '') courseName.value = savedName;
                    });
                }
            },
            true,
        );

        // 使用 MutationObserver 作为双重保险
        const observer = new MutationObserver(() => {
            if (courseID.value === '' && savedID) courseID.value = savedID;
            if (courseName.value === '' && savedName) courseName.value = savedName;
        });

        observer.observe(courseID, { attributes: true, attributeFilter: ['value'] });
        observer.observe(courseName, { attributes: true, attributeFilter: ['value'] });
    }

    // ========== localStorage 存储功能 ==========
    function setupLocalStoragePersistence() {
        if (!form) {
            console.warn('未找到 id="qyForm" 的表单，localStorage 存储功能不可用');
            return;
        }

        // 页面加载时还原表单值
        restoreFormValues();

        // 监听所有目标 input 的变化
        const inputs = getTargetInputs();
        inputs.forEach((input) => {
            input.addEventListener('input', saveFormValues);
            input.addEventListener('change', saveFormValues);
        });

        // 监听取消按钮
        const cancelBtn = document.getElementById('b_cancel');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function () {
                clearFormValues();
                const inputs = getTargetInputs();
                inputs.forEach((input) => {
                    if (input.type === 'checkbox' || input.type === 'radio') {
                        input.checked = false;
                    } else {
                        input.value = '';
                    }
                });
            });
        }
    }

    // ========== 初始化 ==========
    setupRadioSwitchPreservation();
    setupLocalStoragePersistence();
}

/**
 * 重构 datagrid 表格 - 通用函数，处理表格列和分页导航
 * 包含：自选P/NP 图标替换、限数/已选 颜色标记、分页导航提取
 */
function refactorElectiveDatagrid() {
    // 重构分页导航 - 将分页内容从表格移到外部
    const refactorPagination = () => {
        // 处理所有 table.datagrid 中的分页行
        const tables = document.querySelectorAll('table.datagrid');

        tables.forEach((table) => {
            // 检查该表格是否已经处理过
            if (table.dataset.pkuArtPaginationRefactored) {
                return;
            }

            // 查找包含 pageForm 的分页行，或最后一行包含 "Page X of Y" 文本的行
            let paginationRow = table.querySelector('tr:has(> td > form[name="pageForm"])');
            if (!paginationRow) {
                // 尝试查找最后一行中包含 "Page" 文本的行
                const lastRow = table.querySelector('tbody > tr:last-child, tr:last-child');
                if (lastRow) {
                    const hasPagination = [...lastRow.querySelectorAll('td')].some((td) =>
                        /Page\s+\d+\s+of\s+\d+/.test(td.textContent),
                    );
                    if (hasPagination) {
                        paginationRow = lastRow;
                    }
                }
            }

            if (!paginationRow) {
                return;
            }

            // 获取该行中除了 align="left" 以外的所有 td（分页内容）
            const paginationTds = [...paginationRow.querySelectorAll('td:not([align="left"])')];
            if (paginationTds.length === 0) {
                return;
            }

            // 检查是否只有一页（Page 1 of 1）
            const isSinglePage = paginationTds.some((td) => td.textContent.trim().startsWith('Page 1 of 1'));

            if (isSinglePage) {
                // 只有一页时，直接删除分页相关的 td
                console.log(
                    '[PKU Art] refactorPagination() removing single page navigation at ' + new Date().toLocaleString(),
                );
                paginationTds.forEach((td) => td.remove());
                table.dataset.pkuArtPaginationRefactored = 'true';
                return;
            }

            console.log('[PKU Art] refactorPagination() has been used at ' + new Date().toLocaleString());

            // 创建导航容器
            const navDiv = document.createElement('div');
            navDiv.classList.add('PKU-Art', 'pku-art-navigation-area');

            // 将分页 td 内容移入
            paginationTds.forEach((td) => {
                navDiv.innerHTML += td.innerHTML;
                td.remove();
            });

            // 插入到表格后面
            table.insertAdjacentElement('afterend', navDiv);
            table.dataset.pkuArtPaginationRefactored = 'true';
        });
    };

    // 重构表格列（自选P/NP 和 限数/已选）
    const refactorTableColumns = () => {
        const headerRow = document.querySelector('tr.datagrid-header');
        if (!headerRow) {
            return;
        }

        const headers = headerRow.querySelectorAll('th.datagrid');
        let pnpColumnIndex = -1;
        let limitColumnIndex = -1;

        // 找到 "自选P/NP" 和 "限数/已选" 列的索引
        headers.forEach((th, index) => {
            const text = th.textContent.trim();
            if (text === '自选P/NP') {
                pnpColumnIndex = index;
            } else if (text === '限数/已选') {
                limitColumnIndex = index;
            }
        });

        if (pnpColumnIndex === -1 && limitColumnIndex === -1) {
            return;
        }

        console.log(
            '[PKU Art] refactorTableColumns() found columns: P/NP=' + pnpColumnIndex + ', limit=' + limitColumnIndex,
        );

        // 获取所有数据行
        const dataRows = document.querySelectorAll('table.datagrid tr:not(.datagrid-header):not(.datagrid-footer)');

        dataRows.forEach((row) => {
            if (row.dataset.pkuArtTableRefactored) {
                return;
            }

            const cells = row.querySelectorAll('td.datagrid');

            // 处理 自选P/NP 列
            if (pnpColumnIndex !== -1 && cells[pnpColumnIndex]) {
                const cell = cells[pnpColumnIndex];
                const text = cell.textContent.trim();
                if (text === '可申请') {
                    cell.innerHTML = validIcon;
                    cell.classList.add('PKU-Art', 'pku-art-pnp-valid');
                } else if (text === '不可申请') {
                    cell.innerHTML = invalidIcon;
                    cell.classList.add('PKU-Art', 'pku-art-pnp-invalid');
                }
            }

            // 处理 限数/已选 列
            if (limitColumnIndex !== -1 && cells[limitColumnIndex]) {
                const cell = cells[limitColumnIndex];
                const text = cell.textContent.trim();
                // 匹配 "数字 / 数字" 格式
                const match = text.match(/(\d+)\s*\/\s*(\d+)/);
                if (match) {
                    const limit = parseInt(match[1], 10);
                    const selected = parseInt(match[2], 10);
                    if (selected >= limit) {
                        cell.style.color = 'var(--red-6)';
                    } else {
                        cell.style.color = 'var(--blue-6)';
                    }
                    cell.classList.add('PKU-Art', 'pku-art-limit-cell');
                }
            }

            row.dataset.pkuArtTableRefactored = 'true';
        });
    };

    refactorPagination();
    refactorTableColumns();
}

/**
 * 重构选课查询页面
 * 仅在 elective.pku.edu.cn 选课查询结果页面生效
 */
function refactorElectiveCourseQueryPage() {
    if (
        !/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/courseQuery\/(getCurriculmByForm\.do|queryCurriculum\.jsp)/.test(
            window.location.href,
        )
    ) {
        return;
    }

    refactorElectiveDatagrid();
    document.addEventListener('DOMContentLoaded', refactorElectiveDatagrid);
}

/**
 * 重构选课计划列表页面
 * 仅在 elective.pku.edu.cn 选课计划列表页面生效
 */
function refactorElectivePlanPage() {
    if (
        !/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/electivePlan\/ElectivePlanController\.jpf/.test(
            window.location.href,
        )
    ) {
        return;
    }

    refactorElectiveDatagrid();
    document.addEventListener('DOMContentLoaded', refactorElectiveDatagrid);
}

/**
 * 移除空表格行 - 清理 FAQ 页面中只包含空白的表格行
 * 仅在 elective.pku.edu.cn FAQ 页面生效
 */
function refactorElectiveFaqPage() {
    if (
        !/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/help\/faqForUnderGrad\.jsp\S*$/.test(
            window.location.href,
        )
    ) {
        return;
    }

    const removeFunc = () => {
        const rows = document.querySelectorAll('table.datagrid tr');
        rows.forEach(function (tr) {
            if (tr.children.length === 1 && tr.firstElementChild.tagName === 'TD') {
                // 将非断行空格（NBSP）替换掉，再 trim
                const text = tr.firstElementChild.textContent.replace(/\u00A0/g, '').trim();
                if (text === '') {
                    tr.remove();
                }
            }
        });
    };
    removeFunc();
    document.addEventListener('DOMContentLoaded', removeFunc);
}

function refactorElectiveSupplementPage() {
    if (
        !/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/supplement\/\S*$/.test(
            window.location.href,
        )
    ) {
        return;
    }
    refactorElectiveDatagrid();
    document.addEventListener('DOMContentLoaded', refactorElectiveDatagrid);
}

/**
 * 调试用 HTML 注入 - 在选课页面插入成功提示信息用于样式调试
 * 仅在开发调试时使用
 */
function insertHTMLForDebug() {
    const html_str = `<tr><td colspan="0"><table width="100%"><tbody><tr><td width="52px" valign="middle" class="message_success"><img src="/elective2008/resources/images/success.gif"></td><td width="100%" valign="middle">添加操作成功,请查看选课计划确认,之后请继续选课或者补选。</td></tr></tbody></table></td></tr>`;
    const url = `https://elective.pku.edu.cn/elective2008/edu/pku/stu/elective/controller/electiveWork/ElectiveWorkController.jpf`;

    if (!window.location.href.startsWith(url)) {
        return;
    }

    const debugFunc = () => {
        const target = document.querySelector(
            '#scopeOneSpan > table:nth-child(3) > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2)',
        );
        if (target) {
            // 在最开始插入 html
            target.insertAdjacentHTML('afterbegin', html_str);
            console.log('[PKU Art] insertHTMLForDebug() has been used at ' + new Date().toLocaleString());
        }
    };

    debugFunc();
    document.addEventListener('DOMContentLoaded', debugFunc);
}

/**
 * 自定义 IAAA 记住我复选框 - 美化登录页面的"记住我"复选框样式
 * 支持键盘操作和无障碍访问
 * 仅在 iaaa.pku.edu.cn OAuth 页面生效
 */
function refactorIaaaPage() {
    if (!/^https:\/\/iaaa\.pku\.edu\.cn\/iaaa\/oauth\.jsp/.test(window.location.href)) {
        return;
    }

    const checkboxSelectors = [
        '#remember',
        '#remember_checkbox',
        '#rememberMe',
        'input[type="checkbox"][name="remember"]',
        'input[type="checkbox"][name="rememberMe"]',
    ];

    const findCheckbox = () => checkboxSelectors.map((selector) => document.querySelector(selector)).find(Boolean);

    const setupRememberToggle = () => {
        const rememberText = document.getElementById('remember_text');
        if (!rememberText) {
            return false;
        }

        const getNativeIcon = () => rememberText.querySelector('i');
        const ensureCustomIcon = () => {
            if (!rememberText.querySelector('.pku-art-remember-icon')) {
                const customIcon = document.createElement('span');
                customIcon.className = 'PKU-Art pku-art-remember-icon';
                customIcon.setAttribute('aria-hidden', 'true');
                rememberText.insertBefore(customIcon, rememberText.firstChild);
            }
        };

        const getCheckedState = () => {
            const checkbox = findCheckbox();
            if (checkbox) {
                return !!checkbox.checked;
            }
            const nativeIcon = getNativeIcon();
            if (nativeIcon) {
                return nativeIcon.classList.contains('fa-check-square-o');
            }
            return rememberText.classList.contains('is-checked');
        };

        const updateAppearance = () => {
            const checked = getCheckedState();
            rememberText.classList.toggle('is-checked', checked);
            rememberText.setAttribute('aria-checked', checked ? 'true' : 'false');
        };

        if (rememberText.dataset.pkuArtRememberBound !== 'true') {
            rememberText.dataset.pkuArtRememberBound = 'true';
            rememberText.classList.add('PKU-Art', 'pku-art-remember-toggle');
            rememberText.setAttribute('role', 'checkbox');
            rememberText.setAttribute('tabindex', '0');

            ensureCustomIcon();

            rememberText.addEventListener('click', () => {
                requestAnimationFrame(updateAppearance);
            });

            rememberText.addEventListener('keydown', (event) => {
                const isActivateKey = event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter';
                if (!isActivateKey) return;
                event.preventDefault();
                const checkbox = findCheckbox();
                if (checkbox) {
                    checkbox.click();
                } else {
                    rememberText.click();
                }
            });
        } else {
            ensureCustomIcon();
        }

        const rememberCheckbox = findCheckbox();
        if (rememberCheckbox) {
            rememberCheckbox.classList.add('PKU-Art', 'pku-art-remember-checkbox');
            if (rememberCheckbox.dataset.pkuArtRememberChangeBound !== 'true') {
                rememberCheckbox.addEventListener('change', updateAppearance);
                rememberCheckbox.dataset.pkuArtRememberChangeBound = 'true';
            }
            if (!rememberCheckbox._pkuArtRememberObserver) {
                const attributeObserver = new MutationObserver(updateAppearance);
                attributeObserver.observe(rememberCheckbox, {
                    attributes: true,
                    attributeFilter: ['checked'],
                });
                rememberCheckbox._pkuArtRememberObserver = attributeObserver;
            }
        } else {
            const nativeIcon = getNativeIcon();
            if (nativeIcon && !nativeIcon._pkuArtRememberObserver) {
                const iconObserver = new MutationObserver(updateAppearance);
                iconObserver.observe(nativeIcon, {
                    attributes: true,
                    attributeFilter: ['class'],
                });
                nativeIcon._pkuArtRememberObserver = iconObserver;
            }
        }

        updateAppearance();
        return true;
    };

    const ensureToggle = () => setupRememberToggle();

    if (!ensureToggle()) {
        const observer = new MutationObserver(() => {
            if (ensureToggle()) {
                observer.disconnect();
            }
        });

        const startObserver = () => {
            if (document.body) {
                observer.observe(document.body, { childList: true, subtree: true });
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                if (!ensureToggle()) {
                    startObserver();
                } else {
                    observer.disconnect();
                }
            });
        } else {
            startObserver();
        }
    }
}

/**
 * 重构预选页面 - 包含通知区域重构
 * 仅在 elective.pku.edu.cn 选课操作页面生效
 */
function refactorElectiveWorkPage() {
    if (
        !/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/electiveWork\/(ElectiveWorkController\.jpf|election\.jsp|electCourse\.do|cancelCourse\.do)\S*$/.test(
            window.location.href,
        )
    ) {
        return;
    }

    // 重构通知区域
    const refactorNotice = () => {
        // 只选择 span.errmsg 是 td 直接子元素的情况
        const allTargetTds = document.querySelectorAll('td:has(> span.errmsg)');

        allTargetTds.forEach((targetTd) => {
            if (targetTd.dataset.pkuArtRefactored) {
                return;
            }

            // 检查 td 是否有直接的文本节点（裸文本）
            const hasDirectTextNode = Array.from(targetTd.childNodes).some(
                (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0,
            );
            if (!hasDirectTextNode) {
                return;
            }

            // 保存原有的 errmsg span（直接子元素）
            const errmsgSpan = targetTd.querySelector(':scope > span.errmsg');
            if (!errmsgSpan) {
                return;
            }

            console.log('[PKU Art] refactorNotice() processing td at ' + new Date().toLocaleString());

            // 获取 td 的文本内容（不包括 errmsg span 的内容）
            const errmsgText = errmsgSpan.textContent.trim();
            errmsgSpan.remove();
            const rawText = targetTd.textContent.trim();

            // 按照 （数字） 模式分割文本，并对每个部分做 trim
            const parts = rawText
                .split(/(?=（\d+）)/)
                .map((p) => p.trim())
                .filter(Boolean);

            // 清空 td 内容
            targetTd.innerHTML = '';

            // 为每个部分创建 span
            parts.forEach((part) => {
                const trimmedPart = part.trim();
                if (!trimmedPart) {
                    return;
                }

                const span = document.createElement('span');
                span.className = 'PKU-Art pku-art-elective-notice-item';
                // 移除末尾的标点符号（，。）
                span.textContent = trimmedPart.replace(/[，。]+$/, '');
                targetTd.appendChild(span);
            });

            // 将原有的 errmsg span 追加到最后
            // 同样移除末尾标点
            errmsgSpan.textContent = errmsgText.replace(/[，。]+$/, '');
            targetTd.appendChild(errmsgSpan);

            // 标记已处理
            targetTd.dataset.pkuArtRefactored = 'true';
            targetTd.classList.add('PKU-Art', 'pku-art-elective-notice');
        });
    };

    const refactor = () => {
        refactorNotice();
        refactorElectiveDatagrid();
    };

    refactor();
    document.addEventListener('DOMContentLoaded', refactor);
}

/**
 * 注册页面点击关闭右键菜单 - 点击页面任意位置时关闭已打开的上下文菜单
 */
function registerCloseContextMenuOnPage() {
    const closeContextMenu = () => {
        page.ContextMenu.closeAllContextMenus();
        document.removeEventListener('click', closeContextMenu);
    };
    document.addEventListener('click', closeContextMenu);
}

/**
 * 批量下载功能 - 在 listContent 页面添加批量下载按钮
 * 使用 GM_download 逐个下载文件，不依赖 JSZip
 */
function initializeBatchDownload() {
    const url = window.location.href;

    // 只在 listContent 页面运行
    if (!/^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/content\/listContent\.jsp/.test(url)) {
        return;
    }

    console.log('[PKU Art] initializeBatchDownload() initialized at ' + new Date().toLocaleString());

    /**
     * 从一个容器中提取所有文件链接
     * @param {HTMLElement} container - 要搜索的容器元素
     * @returns {Array<{url: string, name: string}>} - 文件信息数组
     */
    function extractFileLinks(container) {
        const links = [];
        const anchors = container.querySelectorAll('a[href]');

        anchors.forEach((anchor) => {
            const href = anchor.getAttribute('href');
            // 匹配 bbcswebdav 文件链接
            if (href && href.includes('/bbcswebdav/')) {
                // 从 URL 中提取文件名
                let fileName = decodeURIComponent(href.split('/').pop());
                // 清理文件名中的查询参数
                if (fileName.includes('?')) {
                    fileName = fileName.split('?')[0];
                }
                // 如果链接文本更有意义，优先使用
                const linkText = anchor.textContent.trim();
                if (linkText && !linkText.includes('http') && linkText.length < 100) {
                    // 检查链接文本是否包含文件扩展名
                    const extMatch = fileName.match(/\.[a-zA-Z0-9]+$/);
                    if (extMatch && !linkText.match(/\.[a-zA-Z0-9]+$/)) {
                        fileName = linkText + extMatch[0];
                    } else if (linkText.match(/\.[a-zA-Z0-9]+$/)) {
                        fileName = linkText;
                    }
                }
                links.push({
                    url: href.startsWith('http') ? href : `https://course.pku.edu.cn${href}`,
                    name: fileName,
                });
            }
        });

        return links;
    }

    /**
     * 使用 GM_download 下载单个文件
     * @param {string} fileUrl - 文件 URL
     * @param {string} fileName - 文件名
     * @returns {Promise<void>}
     */
    function downloadSingleFile(fileUrl, fileName) {
        return new Promise((resolve, reject) => {
            if (typeof GM_download === 'function') {
                GM_download({
                    url: fileUrl,
                    name: fileName,
                    onerror: (err) => {
                        console.error(`[PKU Art] GM_download 失败: ${fileName}`, err);
                        reject(err);
                    },
                    onload: () => {
                        resolve();
                    },
                    ontimeout: () => {
                        reject(new Error('下载超时'));
                    },
                });
            } else {
                // 回退：使用 a 标签下载
                const link = document.createElement('a');
                link.href = fileUrl;
                link.download = fileName;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                // 无法确定下载是否成功，直接 resolve
                resolve();
            }
        });
    }

    /**
     * 批量下载文件
     * @param {Array<{url: string, name: string}>} files - 文件信息数组
     * @param {HTMLElement} statusElement - 状态显示元素
     */
    async function downloadFiles(files, statusElement) {
        if (files.length === 0) {
            alert('没有找到可下载的文件');
            return;
        }

        const total = files.length;
        let completed = 0;
        let errors = 0;

        // 用于处理重名文件
        const fileNameCount = {};

        statusElement.textContent = `下载中: 0/${total}`;

        for (const file of files) {
            // 处理重名文件
            let fileName = file.name;
            if (fileNameCount[fileName]) {
                const ext = fileName.lastIndexOf('.');
                if (ext > 0) {
                    fileName = `${fileName.substring(0, ext)}_${fileNameCount[fileName]}${fileName.substring(ext)}`;
                } else {
                    fileName = `${fileName}_${fileNameCount[fileName]}`;
                }
                fileNameCount[file.name]++;
            } else {
                fileNameCount[file.name] = 1;
            }

            try {
                await downloadSingleFile(file.url, fileName);
                completed++;
            } catch (error) {
                console.error(`[PKU Art] 下载失败: ${fileName}`, error);
                errors++;
                completed++;
            }

            statusElement.textContent = `下载中: ${completed}/${total}`;

            // 添加小延迟，避免浏览器阻止批量下载
            if (completed < total) {
                await new Promise((r) => setTimeout(r, 300));
            }
        }

        if (errors > 0) {
            statusElement.textContent = `完成 (${errors}个失败)`;
        } else {
            statusElement.textContent = '下载完成';
        }

        // 3秒后恢复按钮状态
        setTimeout(() => {
            statusElement.textContent = '批量下载';
        }, 3000);
    }

    /**
     * 创建下载按钮
     * @param {string} text - 按钮文字
     * @param {Function} onClick - 点击回调
     * @returns {HTMLElement} - 按钮元素
     */
    function createDownloadButton(text, onClick) {
        const button = document.createElement('button');
        button.className = 'PKU-Art pku-art-batch-download-btn';
        button.innerHTML = `${downloadIcon}<span class="pku-art-batch-download-text">${text}</span>`;
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const textSpan = button.querySelector('.pku-art-batch-download-text');
            // 检查是否正在下载中
            if (textSpan.textContent.includes('下载中') || textSpan.textContent === '下载完成') {
                return;
            }
            onClick(textSpan);
        });
        return button;
    }

    /**
     * 初始化下载按钮
     */
    function initButtons() {
        // 为每个内容项添加下载按钮
        const contentItems = document.querySelectorAll('#content_listContainer > li');
        contentItems.forEach((item) => {
            // 检查是否已经添加过按钮
            if (item.querySelector('.pku-art-batch-download-btn')) {
                return;
            }

            const files = extractFileLinks(item);
            if (files.length === 0) {
                return; // 没有文件，不添加按钮
            }

            const btn = createDownloadButton('批量下载', (statusEl) => {
                downloadFiles(files, statusEl);
            });

            // 将按钮添加到标题行（flex布局样式已在 courseListContent.css 中定义）
            const itemDiv = item.querySelector('.item');
            if (itemDiv) {
                itemDiv.appendChild(btn);
            }
        });

        // 为页面标题添加"下载全部"按钮（添加到 #pageTitleDiv，与标题栏同级）
        const pageTitleDiv = document.querySelector('#pageTitleDiv');
        if (pageTitleDiv && !pageTitleDiv.querySelector('.pku-art-batch-download-btn')) {
            const allFiles = extractFileLinks(document.querySelector('#content_listContainer') || document.body);
            if (allFiles.length > 0) {
                const btn = createDownloadButton('下载全部', (statusEl) => {
                    downloadFiles(allFiles, statusEl);
                });
                btn.classList.add('pku-art-download-all-btn');
                // flex布局样式已在 courseListContent.css 中定义
                pageTitleDiv.appendChild(btn);
            }
        }
    }

    // 等待 DOM 加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initButtons);
    } else {
        initButtons();
    }

    // 监听动态加载的内容
    const observer = new MutationObserver(() => {
        initButtons();
    });

    const startObserver = () => {
        const contentList = document.querySelector('#content_listContainer');
        if (contentList) {
            observer.observe(contentList, { childList: true, subtree: true });
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startObserver);
    } else {
        startObserver();
    }
}

export {
    initializeLogoNavigation,
    ensureSidebarVisible,
    overrideSiteIcons,
    removeCourseSerialNumbers,
    initializeDirectDownload,
    redirectGlobalMoreLink,
    enableDirectOpenLinks,
    manageElectiveCourseQueryForm,
    insertHTMLForDebug,
    initializeBatchDownload,
    refactorIaaaPage,
    refactorElectiveFaqPage,
    refactorElectivePlanPage,
    refactorElectiveWorkPage,
    refactorElectiveCourseQueryPage,
    refactorElectiveSupplementPage,
};
