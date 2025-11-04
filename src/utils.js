import { downloadIcon, linkIcon, sparkIcon } from './icon.js';
// Other utilities
function initializeLogoNavigation() {
    if (!/^https:\/\/course\.pku\.edu\.cn\//.test(window.location.href)) {
        return;
    }

    const handleLogoClick = (event) => {
        const navArea = event.currentTarget;
        const clickOffsetX = event.clientX - navArea.getBoundingClientRect().left;
        if (clickOffsetX <= 150) {
            window.location.href = 'https://course.pku.edu.cn';
        }
    };

    const bindLogoNavigation = () => {
        const navArea = document.getElementById('globalNavPageNavArea');
        if (navArea && !navArea.dataset.pkuArtLogoBound) {
            navArea.addEventListener('click', handleLogoClick);
            navArea.dataset.pkuArtLogoBound = 'true';
        }
    };

    bindLogoNavigation();
    document.addEventListener('DOMContentLoaded', bindLogoNavigation);
}

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

function overrideSiteIcons() {
    if (!/^https:\/\/(course|autolab|disk|elective)\.pku\.edu\.cn\//.test(window.location.href)) {
        return;
    }

    console.log('[PKU Art] overrideSiteIcons() has been used at ' + new Date().toLocaleString());

    const replaceIcons = () => {
        const all_icons = document.querySelectorAll('link[rel="icon" i], link[rel="shortcut icon" i]');
        const not_custom_icons = document.querySelectorAll(
            'link[rel="icon" i]:not([href^="https://cdn.arthals.ink/"]), link[rel="shortcut icon" i]:not([href^="https://cdn.arthals.ink/"])'
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

function removeCourseSerialNumbers() {
    const url = window.location.href;

    const isPortalPage =
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/?$|^https:\/\/course\.pku\.edu\.cn\/webapps\/portal\/\S*$/.test(url);
    const isAlertsStreamPage =
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=alerts\S*$/.test(url);

    if (isPortalPage) {
        const stripPortalSerials = () => {
            const courseLinks = document.querySelectorAll(
                '.containerPortal > div:not(:first-child) .portlet .portletList-img > li > a'
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
}

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

    let JWT = '';

    const RELOAD_ATTEMPTS_KEY = 'PKU_ART_DIRECT_DOWNLOAD_RELOAD_ATTEMPTS';
    const MAX_RELOAD_ATTEMPTS = 3;

    const originalSend = XMLHttpRequest.prototype.send;
    const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

    XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
        if (!this._headers) {
            this._headers = {};
        }
        this._headers[header] = value;
        originalSetRequestHeader.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function () {
        this.addEventListener('load', function () {
            if (this.responseURL.includes('get-sub-info-by-auth-data')) {
                downloadJson = JSON.parse(this.response);
                try {
                    sessionStorage.removeItem(RELOAD_ATTEMPTS_KEY);
                } catch (error) {
                    console.warn('[PKU Art] 无法清除重载计数', error);
                }

                if (this._headers) {
                    for (const headerName in this._headers) {
                        if (headerName.toLowerCase() === 'authorization') {
                            JWT = this._headers[headerName].split(' ')[1];
                            break;
                        }
                    }
                }

                if (JWT) {
                    console.log('[PKU Art] 成功捕获到 JWT:\n', JWT);
                } else {
                    console.log('[PKU Art] 未在此请求中找到 JWT。');
                }

                console.log('[PKU Art] XHR 响应结果：\n', downloadJson);
                courseName = downloadJson.list[0].title;
                subTitle = downloadJson.list[0].sub_title;
                lecturerName = downloadJson.list[0].lecturer_name;
                fileName = `${courseName} - ${subTitle} - ${lecturerName}.mp4`;
                const filmContent = JSON.parse(downloadJson.list[0].sub_content);
                const isM3u8 = filmContent.save_playback.is_m3u8;
                let resolvedDownloadUrl = '';
                if (isM3u8 == 'yes') {
                    const m3u8 = filmContent.save_playback.contents;
                    const m3u8Pattern =
                        /https:\/\/resourcese\.pku\.edu\.cn\/play\/0\/harpocrates\/\d+\/\d+\/\d+\/([a-zA-Z0-9]+)(\/.+)\/playlist\.m3u8.*/;
                    const hash = m3u8.match(m3u8Pattern)[1];
                    resolvedDownloadUrl = `https://course.pku.edu.cn/webapps/bb-streammedia-hqy-BBLEARN/downloadVideo.action?resourceId=${hash}`;
                    console.log('[PKU Art] m3u8 下载链接转换成功：\n', resolvedDownloadUrl);
                } else {
                    resolvedDownloadUrl = filmContent.save_playback.contents;
                }
                downloadUrl = resolvedDownloadUrl;
                console.log('[PKU Art] 下载链接解析成功：\n', downloadUrl);
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
        }, 100);
    });
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
    const copyDownloadUrlButton = createFooterButton('injectCopyDownloadUrlButton', '复制链接地址', linkIcon);
    const magicLink = createFooterButton('injectMagicLink', '妙妙小工具', sparkIcon);

    const downloadSwitchArea = document.createElement('div');
    downloadSwitchArea.id = 'injectDownloadSwitchArea';
    downloadSwitchArea.className = 'PKU-Art';
    downloadSwitchArea.innerHTML = `
<input type="checkbox" id="injectDownloadSwitch" class="PKU-Art" checked>
<label for="injectDownloadSwitch"></label>
<span id="injectDownloadSwitchDesc" class="PKU-Art"> 是否重命名文件</span>
`;

    downloadAreaFooter.appendChild(downloadButton);
    downloadAreaFooter.appendChild(copyDownloadUrlButton);
    downloadAreaFooter.appendChild(downloadSwitchArea);
    downloadAreaFooter.appendChild(magicLink);

    magicLink.addEventListener('click', () => {
        // alert(JWT);
        window.open('https://course.huh.moe', '_blank');
    });

    const switchInput = downloadSwitchArea.querySelector('#injectDownloadSwitch');
    const switchDesc = downloadSwitchArea.querySelector('#injectDownloadSwitchDesc');
    const isSafari = navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
    const renameSupported = typeof GM_download === 'function';
    if (!renameSupported) {
        switchInput.checked = false;
        switchInput.disabled = true;
        switchDesc.textContent = isSafari ? 'Safari + UserScripts 不支持重命名文件' : '当前环境不支持自动重命名文件';
        if (isSafari) {
            downloadSwitchArea.classList.add('safari');
        }
    }

    const copySupported =
        typeof GM_setClipboard === 'function' || (navigator.clipboard && navigator.clipboard.writeText);
    if (!copySupported) {
        copyDownloadUrlButton.disabled = true;
        copyDownloadUrlButton.querySelector('span').textContent = '复制链接不可用';
    }

    downloadButton.addEventListener('click', async () => {
        console.log(`[PKU Art] 已启动下载：\n文件名：${fileName}\n源地址：${downloadUrl}`);
        const renameEnabled = renameSupported && switchInput && switchInput.checked;
        let downloadInfo = `下载文件名：${fileName}<br/>下载地址：<a target="_blank" href="${downloadUrl}">文件源地址</a>`;
        if (!renameEnabled) {
            downloadInfo = `正常文件名：${fileName}<br/>下载地址：<a target="_blank" href="${downloadUrl}">文件源地址</a>`;
        }

        const existingTip = document.getElementById('injectDownloadTip');
        if (existingTip) {
            existingTip.innerHTML = `正在下载中，请勿重新启动/刷新页面<br/>${downloadInfo}`;
            return;
        }

        const downloadTip = document.createElement('div');
        downloadTip.id = 'injectDownloadTip';
        downloadTip.className = 'PKU-Art';
        downloadTip.innerHTML = renameEnabled
            ? `已在后台启动下载，请勿刷新页面<br/>${downloadInfo}`
            : `已在新窗口启动下载<br/>${downloadInfo}`;

        downloadAreaFooter.insertBefore(downloadTip, downloadAreaFooter.firstElementChild);

        if (!renameEnabled) {
            window.open(downloadUrl, '_blank');
            return;
        }

        try {
            let lastPrintTime = 0;
            let bytesDownloadedInLast100ms = 0;
            let lastBytesLoaded = 0;
            let averageSpeed = 0;
            const SMOOTHING_FACTOR = 0.02;

            const download = GM_download({
                url: downloadUrl,
                name: fileName,
                saveAs: true,
                onerror(event) {
                    console.error('[PKU Art] 下载失败：', event);
                    alert('下载失败\n原因：' + event.error);
                },
                onprogress(event) {
                    const currentTime = Date.now();
                    if (event.total && currentTime - lastPrintTime >= 100) {
                        const percentComplete = (event.loaded / event.total) * 100;
                        const currentProgress = percentComplete.toFixed(2);

                        bytesDownloadedInLast100ms = event.loaded - lastBytesLoaded;
                        const lastSpeed = bytesDownloadedInLast100ms / (currentTime - lastPrintTime);
                        averageSpeed = SMOOTHING_FACTOR * lastSpeed + (1 - SMOOTHING_FACTOR) * averageSpeed;

                        const bytesRemaining = event.total - event.loaded;
                        const estimatedTimeRemaining = bytesRemaining / averageSpeed;
                        let estimatedTimeRemainingSeconds = Math.round(estimatedTimeRemaining / 1000);
                        if (Number.isNaN(estimatedTimeRemainingSeconds) || estimatedTimeRemainingSeconds > 9999) {
                            estimatedTimeRemainingSeconds = 'inf';
                        }

                        if (!downloadTip.innerHTML.includes('下载进度')) {
                            downloadTip.innerHTML = downloadTip.innerHTML.replace(
                                /刷新页面/,
                                `刷新页面。下载进度：${currentProgress}%，预计剩余时间：${estimatedTimeRemainingSeconds}秒`
                            );
                        } else {
                            downloadTip.innerHTML = downloadTip.innerHTML.replace(
                                /下载进度：.*秒/,
                                `下载进度：${currentProgress}%，预计剩余时间：${estimatedTimeRemainingSeconds}秒`
                            );
                        }
                        lastPrintTime = currentTime;
                        lastBytesLoaded = event.loaded;
                    }
                },
                onload() {
                    downloadTip.innerHTML = `下载完成<br/>${downloadInfo}`;
                },
            });

            window.addEventListener(
                'beforeunload',
                () => {
                    download.abort();
                },
                { once: true }
            );
        } catch (error) {
            console.warn('[PKU Art] GM_download 调用失败，回退到新窗口下载', error);
            window.open(downloadUrl, '_blank');
            downloadTip.innerHTML = `已在新窗口启动下载<br/>正常文件名：${fileName}<br/>下载地址：<a target="_blank" href="${downloadUrl}">文件源地址</a>`;
            alert('看上去当前环境不支持自动重命名功能，已尝试使用新标签页下载');
        }
    });

    copyDownloadUrlButton.addEventListener('click', async () => {
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

function restoreCourseQueryValues() {
    // https://elective.pku.edu.cn/elective2008/edu/pku/stu/elective/controller/courseQuery/getCurriculmByForm.do
    if (
        !/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/courseQuery\/\S*$/.test(
            window.location.href
        )
    ) {
        return;
    }

    console.log('[PKU Art] restoreCourseQueryValues() has been used at ' + new Date().toLocaleString());

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
        true
    );

    // 使用 MutationObserver 作为双重保险
    const observer = new MutationObserver(() => {
        if (courseID.value === '' && savedID) courseID.value = savedID;
        if (courseName.value === '' && savedName) courseName.value = savedName;
    });

    observer.observe(courseID, { attributes: true, attributeFilter: ['value'] });
    observer.observe(courseName, { attributes: true, attributeFilter: ['value'] });
}

function refactorCourseQueryPagination() {
    if (
        !/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/courseQuery\/(getCurriculmByForm\.do|queryCurriculum\.jsp)/.test(
            window.location.href
        )
    ) {
        return;
    }
    const refactor = () => {
        const lastTd = [...document.querySelectorAll('td[align="right"]')].pop();
        console.log('[PKU Art] refactorCourseQueryPagination() has been used at ' + new Date().toLocaleString());
        // console.log('[PKU Art] lastTd:', lastTd);

        if (lastTd && !document.querySelector('.navigation-area')) {
            const table = lastTd.closest('table');
            if (table) {
                const div = document.createElement('div');
                div.innerHTML = lastTd.innerHTML;
                div.style.textAlign = 'right';
                table.insertAdjacentElement('afterend', div);
                div.classList.add('navigation-area');
                lastTd.remove();
            }
        }
    };
    refactor();
    document.addEventListener('DOMContentLoaded', refactor);
}

function formValueStorage() {
    // 检查URL是否匹配
    if (
        !/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/courseQuery\/\S*$/.test(
            window.location.href
        )
    ) {
        return;
    }

    const STORAGE_KEY = 'pku_elective_form_values';
    const form = document.getElementById('qyForm');

    if (!form) {
        console.warn('未找到 id="qyForm" 的表单');
        return;
    }

    // 获取所有需要监听的 input 元素
    function getTargetInputs() {
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

    // 页面加载时还原表单值
    restoreFormValues();

    // 监听所有目标 input 的变化
    const inputs = getTargetInputs();
    inputs.forEach((input) => {
        // 监听 input 事件（实时输入）
        input.addEventListener('input', saveFormValues);
        // 监听 change 事件（checkbox、radio、select 等）
        input.addEventListener('change', saveFormValues);
    });

    // 监听取消按钮
    const cancelBtn = document.getElementById('b_cancel');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function () {
            clearFormValues();
            // 可选：同时清空表单
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

function removeEmptyTableRows() {
    if (
        !/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/help\/faqForUnderGrad\.jsp\S*$/.test(
            window.location.href
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

function insertHTMLForDebug() {
    const html_str = `<tr><td colspan="0"><table width="100%"><tbody><tr><td width="52px" valign="middle" class="message_success"><img src="/elective2008/resources/images/success.gif"></td><td width="100%" valign="middle">添加操作成功,请查看选课计划确认,之后请继续选课或者补选。</td></tr></tbody></table></td></tr>`;
    const url = `https://elective.pku.edu.cn/elective2008/edu/pku/stu/elective/controller/courseQuery/CourseQueryController.jpf`;

    if (!window.location.href.startsWith(url)) {
        return;
    }

    const debugFunc = () => {
        const target = document.querySelector('body > table:nth-child(3) > tbody');
        if (target) {
            // 在最开始插入 html
            target.insertAdjacentHTML('afterbegin', html_str);
            console.log('[PKU Art] insertHTMLForDebug() has been used at ' + new Date().toLocaleString());
        }
    };

    debugFunc();
    document.addEventListener('DOMContentLoaded', debugFunc);
}

export {
    initializeLogoNavigation,
    ensureSidebarVisible,
    overrideSiteIcons,
    removeCourseSerialNumbers,
    initializeDirectDownload,
    redirectGlobalMoreLink,
    enableDirectOpenLinks,
    restoreCourseQueryValues,
    refactorCourseQueryPagination,
    formValueStorage,
    insertHTMLForDebug,
    removeEmptyTableRows,
};
