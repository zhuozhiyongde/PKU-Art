import { downloadIcon, linkIcon, refreshIcon, closeIcon } from './icon.js';

/**
 * Logo 导航功能 - 点击导航区域左侧 150px 以内时跳转到首页
 * 仅在 course.pku.edu.cn 域名下生效
 */
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

    const removeContextMenuSerials = () => {
        const contextMenuOpenLink = document.querySelector("#breadcrumbs .coursePath .courseArrow a")
        const doRemoveContextMenuSerials = () => {
            contextMenuOpenLink.removeEventListener('mouseover', doRemoveContextMenuSerials)
            contextMenuOpenLink.removeEventListener('click', doRemoveContextMenuSerials)
            const waitForContextMenuReadyInterval = setInterval(() => {
                console.log("[PKU Art] Waiting for context menu ready...")
                if (contextMenuOpenLink.savedDiv.querySelector('li[id^="最近访问"]')) {
                    clearInterval(waitForContextMenuReadyInterval)
                    contextMenuOpenLink.savedDiv.innerHTML = contextMenuOpenLink.savedDiv.innerHTML.replace(/\(\d+-\d+学年第\d学期\)/g, '')
                    const emptyMenu = contextMenuOpenLink.savedDiv.querySelector('ul[role="presentation"]:has(.contextmenu_empty)')
                    if (emptyMenu) {
                        contextMenuOpenLink.savedDiv.removeChild(emptyMenu)
                        console.log("[PKU Art] Removed empty context menu")
                    }
                }
            }, 100)
        }
        if (contextMenuOpenLink) {
            contextMenuOpenLink.addEventListener('mouseover', doRemoveContextMenuSerials)
            // if somehow the user clicks before mouseover :(
            contextMenuOpenLink.addEventListener('click', doRemoveContextMenuSerials)
            contextMenuOpenLink.addEventListener('click', registerCloseContextMenuOnPage)
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', removeContextMenuSerials);
    }
    else {
        removeContextMenuSerials();
    }
}

/**
 * 直接下载功能 - 在录播播放页面注入下载按钮和复制链接功能
 * 通过拦截 XHR 请求获取视频下载地址，支持 m3u8 格式转换
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
                    sessionStorage.setItem('PKU_ART_DIRECT_DOWNLOAD_JWT', JWT);
                    console.log('[PKU Art] JWT 已保存到 sessionStorage');
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
        }, 500);
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

    const downloadSwitchArea = document.createElement('div');
    downloadSwitchArea.id = 'injectDownloadSwitchArea';
    downloadSwitchArea.className = 'PKU-Art';
    downloadSwitchArea.innerHTML = `
<input type="checkbox" id="injectDownloadSwitch" class="PKU-Art" checked>
<label for="injectDownloadSwitch"></label>
<span id="injectDownloadSwitchDesc" class="PKU-Art"> 重命名文件</span>
`;

    // 点击整个区域切换 checkbox 状态
    downloadSwitchArea.addEventListener('click', (e) => {
        // 如果点击的是 checkbox 或关联的 label，浏览器会自动处理切换
        const isCheckboxOrLabel = e.target.id === 'injectDownloadSwitch' || e.target.htmlFor === 'injectDownloadSwitch';
        if (!isCheckboxOrLabel) {
            const checkbox = downloadSwitchArea.querySelector('#injectDownloadSwitch');
            checkbox.checked = !checkbox.checked;
        }
    });

    downloadAreaFooter.appendChild(downloadButton);
    downloadAreaFooter.appendChild(copyDownloadUrlButton);
    downloadAreaFooter.appendChild(downloadSwitchArea);

    const switchInput = downloadSwitchArea.querySelector('#injectDownloadSwitch');
    const isSafari = navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
    const renameSupported = typeof GM_download === 'function';
    if (!renameSupported) {
        // 删除原有的 switchArea，创建新的提示元素追加到末尾，并切换为 3 列布局
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
    if (!copySupported) {
        copyDownloadUrlButton.disabled = true;
        copyDownloadUrlButton.querySelector('span').textContent = '复制链接不可用';
    }

    // 下载状态管理
    let currentDownload = null;
    let isDownloading = false;

    const startDownload = (renameEnabled) => {
        const downloadTipText = document.getElementById('injectDownloadTipText');
        const cancelBtn = document.getElementById('injectCancelDownload');
        const restartBtn = document.getElementById('injectRestartDownload');

        let downloadInfo = `下载文件名：${fileName}<br/>下载地址：<a target="_blank" href="${downloadUrl}">文件源地址</a>`;
        if (!renameEnabled) {
            downloadInfo = `正常文件名：${fileName}<br/>下载地址：<a target="_blank" href="${downloadUrl}">文件源地址</a>`;
        }

        if (!renameEnabled) {
            window.open(downloadUrl, '_blank');
            downloadTipText.innerHTML = `已在新窗口启动下载<br/>${downloadInfo}`;
            cancelBtn.disabled = true;
            restartBtn.disabled = false;
            isDownloading = false;
            return;
        }

        isDownloading = true;
        cancelBtn.disabled = false;
        restartBtn.disabled = true;
        downloadTipText.innerHTML = `已在后台启动下载，请勿刷新页面<br/>${downloadInfo}`;

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
                    cancelBtn.disabled = true;
                    restartBtn.disabled = false;
                    downloadTipText.innerHTML = `下载失败：${event.error}<br/>${downloadInfo}`;
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

                        downloadTipText.innerHTML = `已在后台启动下载，请勿刷新页面。<br/>下载进度：${currentProgress}%，预计剩余时间：${estimatedTimeRemainingSeconds}秒<br/>${downloadInfo}`;
                        lastPrintTime = currentTime;
                        lastBytesLoaded = event.loaded;
                    }
                },
                onload() {
                    isDownloading = false;
                    cancelBtn.disabled = true;
                    restartBtn.disabled = false;
                    downloadTipText.innerHTML = `下载完成<br/>${downloadInfo}`;
                },
            });

            window.addEventListener(
                'beforeunload',
                () => {
                    if (currentDownload) {
                        currentDownload.abort();
                    }
                },
                { once: true }
            );
        } catch (error) {
            console.warn('[PKU Art] GM_download 调用失败，回退到新窗口下载', error);
            window.open(downloadUrl, '_blank');
            isDownloading = false;
            cancelBtn.disabled = true;
            restartBtn.disabled = false;
            downloadTipText.innerHTML = `已在新窗口启动下载<br/>正常文件名：${fileName}<br/>下载地址：<a target="_blank" href="${downloadUrl}">文件源地址</a>`;
            alert('看上去当前环境不支持自动重命名功能，已尝试使用新标签页下载');
        }
    };

    downloadButton.addEventListener('click', async () => {
        console.log(`[PKU Art] 已启动下载：\n文件名：${fileName}\n源地址：${downloadUrl}`);
        const renameEnabled = renameSupported && switchInput && switchInput.checked;

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
                currentDownload = null;
                isDownloading = false;
                cancelBtn.disabled = true;
                restartBtn.disabled = false;
                downloadTipText.innerHTML = `下载已取消<br/>下载文件名：${fileName}<br/>下载地址：<a target="_blank" href="${downloadUrl}">文件源地址</a>`;
            }
        });

        restartBtn.addEventListener('click', () => {
            const renameEnabled = renameSupported && switchInput && switchInput.checked;
            startDownload(renameEnabled);
        });

        downloadTipActions.appendChild(cancelBtn);
        downloadTipActions.appendChild(restartBtn);
        downloadTip.appendChild(downloadTipText);
        downloadTip.appendChild(downloadTipActions);
        downloadAreaFooter.insertBefore(downloadTip, downloadAreaFooter.firstElementChild);

        startDownload(renameEnabled);
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
 * 恢复选课查询值 - 切换课程分类时保留已输入的课程号和课程名
 * 仅在 elective.pku.edu.cn 选课查询页面生效
 */
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

/**
 * 重构选课查询分页 - 将分页导航从表格单元格移到表格外部
 * 仅在 elective.pku.edu.cn 选课查询结果页面生效
 */
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

/**
 * 表单值存储 - 自动保存和恢复选课查询表单的输入值到 localStorage
 * 仅在 elective.pku.edu.cn 选课查询页面生效
 */
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

/**
 * 移除空表格行 - 清理 FAQ 页面中只包含空白的表格行
 * 仅在 elective.pku.edu.cn FAQ 页面生效
 */
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

/**
 * 调试用 HTML 注入 - 在选课页面插入成功提示信息用于样式调试
 * 仅在开发调试时使用
 */
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

/**
 * 自定义 IAAA 记住我复选框 - 美化登录页面的"记住我"复选框样式
 * 支持键盘操作和无障碍访问
 * 仅在 iaaa.pku.edu.cn OAuth 页面生效
 */
function customizeIaaaRememberCheckbox() {
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
 * 注册页面点击关闭右键菜单 - 点击页面任意位置时关闭已打开的上下文菜单
 */
function registerCloseContextMenuOnPage() {
    const closeContextMenu = () => {
        page.ContextMenu.closeAllContextMenus()
        document.removeEventListener("click", closeContextMenu)
    }
    document.addEventListener("click", closeContextMenu);
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
    restoreCourseQueryValues,
    refactorCourseQueryPagination,
    formValueStorage,
    insertHTMLForDebug,
    removeEmptyTableRows,
    customizeIaaaRememberCheckbox,
    initializeBatchDownload,
};
