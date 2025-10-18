import { sparkIcon } from './icon.js';
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

    const originalSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.send = function () {
        this.addEventListener('load', function () {
            if (this.responseURL.includes('get-sub-info-by-auth-data')) {
                downloadJson = JSON.parse(this.response);
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
    await new Promise((resolve) => {
        const checkExist = setInterval(() => {
            const downloadButton = document.querySelector(
                '#app > div.container > div > div > div.course-info__wrap > div.course-info__footer > button:nth-child(1)'
            );
            if (downloadButton && downloadJson) {
                console.log('[PKU Art] 页面加载完成，下载链接解析成功\n', downloadJson);
                clearInterval(checkExist);
                resolve();
            }
        }, 100); // 每100毫秒检查一次
    });

    let downloadButton = document.querySelector(
        '#app > div.container > div > div > div.course-info__wrap > div.course-info__footer > button:nth-child(1)'
    );
    let copyDownloadUrlButton = document.querySelector(
        '#app > div.container > div > div > div.course-info__wrap > div.course-info__footer > button:nth-child(2)'
    );
    const replayTitle = document.querySelector(
        '#app > div.container > div > div > div.course-info__wrap > div.course-info__header > span'
    );
    // 修改 replayTitle 的内容
    if (replayTitle) {
        replayTitle.innerText = `${courseName} - ${subTitle} - ${lecturerName}`;
    }

    // 修改 downloadButton > span 的内容
    downloadButton.children[1].innerText = '下载视频';
    // 移除 downloadButton 的所有 onclick 的 eventListener
    downloadButton.replaceWith(downloadButton.cloneNode(true));
    copyDownloadUrlButton.replaceWith(copyDownloadUrlButton.cloneNode(true));
    // 重新获取 downloadButton
    downloadButton = document.querySelector(
        '#app > div.container > div > div > div.course-info__wrap > div.course-info__footer > button:nth-child(1)'
    );
    copyDownloadUrlButton = document.querySelector(
        '#app > div.container > div > div > div.course-info__wrap > div.course-info__footer > button:nth-child(2)'
    );
    const downloadAreaFooter = document.querySelector(
        '#app > div.container > div > div > div.course-info__wrap > div.course-info__footer'
    );

    // 添加是否选择重命名的开关
    const downloadSwitchArea = document.createElement('div');
    downloadSwitchArea.id = 'injectDownloadSwitchArea';
    downloadSwitchArea.className = 'PKU-Art';
    downloadSwitchArea.innerHTML = `
    <input type="checkbox" id="injectDownloadSwitch" class="PKU-Art" checked>
    <label for="injectDownloadSwitch"></label>
    <span  id="injectDownloadSwitchDesc" class="PKU-Art"> 是否重命名文件</span>
    `;
    if (navigator.userAgent.indexOf('Safari') > -1 && !(navigator.userAgent.indexOf('Chrome') > -1)) {
        // 判断 GM_download 是否可用
        if (!(typeof GM_download === 'function')) {
            downloadSwitchArea.innerHTML = `
    <input type="checkbox" id="injectDownloadSwitch" class="PKU-Art" disabled>
    <label for="injectDownloadSwitch"></label>
    <span  id="injectDownloadSwitchDesc" class="PKU-Art"> Safari + UserScripts 不支持复制下载链接、重命名文件 </span>`;
            // add class safari to downloadSwitchArea
            downloadSwitchArea.classList.add('safari');
            // remove copyDownloadUrlButton;
            copyDownloadUrlButton.remove();
        }
    }

    const magicLink = document.createElement('button');
    magicLink.id = 'injectMagicLink';
    magicLink.className = 'PKU-Art';
    magicLink.innerHTML = sparkIcon;
    magicLink.href = 'https://course.huh.moe';
    magicLink.target = '_blank';
    magicLink.rel = 'noopener noreferrer';

    downloadAreaFooter.appendChild(downloadSwitchArea);
    downloadAreaFooter.appendChild(magicLink);

    magicLink.addEventListener('click', () => {
        window.open('https://course.huh.moe', '_blank');
    });

    // 添加一个点击事件
    downloadButton.addEventListener('click', async () => {
        console.log(`[PKU Art] 已启动下载：\n文件名：${fileName}\n源地址：${downloadUrl}`);

        // 检查是否选择重命名
        const downloadSwitch = document.getElementById('injectDownloadSwitch'); // 开关
        const renameEnabled = downloadSwitch ? downloadSwitch.checked : false;

        let downloadInfo = `下载文件名：${fileName}<br/>下载地址：<a target="_blank" href="${downloadUrl}">文件源地址</a>`;

        if (!renameEnabled) {
            downloadInfo = `正常文件名：${fileName}<br/>下载地址：<a target="_blank" href="${downloadUrl}">文件源地址</a>`;
        }

        // 先检查是否已经在下载，即检查是否存在 injectDownloadTip
        if (document.getElementById('injectDownloadTip')) {
            document.getElementById(
                'injectDownloadTip'
            ).innerHTML = `正在下载中，请勿重新启动/刷新页面<br/>${downloadInfo}`;
            return;
        }

        const downloadTip = document.createElement('div');
        downloadTip.id = 'injectDownloadTip';
        downloadTip.className = 'PKU-Art';
        if (!renameEnabled) {
            downloadTip.innerHTML = `已在新窗口启动下载<br/>${downloadInfo}`;
        } else {
            downloadTip.innerHTML = `已在后台启动下载，请勿刷新页面<br/>${downloadInfo}`;
        }

        downloadAreaFooter.insertBefore(downloadTip, downloadAreaFooter.firstElementChild);

        if (!renameEnabled) {
            // 不重命名文件
            window.open(downloadUrl, '_blank');
        } else {
            try {
                let lastPrintTime = 0; // 记录上次打印时间
                let bytesDownloadedInLast100ms = 0; // 记录最近100毫秒内下载的字节数
                let lastBytesLoaded = 0; // 记录上次下载的字节数
                let averageSpeed = 0; // 平均下载速度
                const SMOOTHING_FACTOR = 0.02; // 平滑因子

                const download = GM_download({
                    url: downloadUrl,
                    name: fileName,
                    saveAs: true,
                    onerror: function (event) {
                        console.error('[PKU Art] 下载失败：', event);
                        alert('下载失败\n原因：' + event.error);
                    },
                    onprogress: function (event) {
                        const currentTime = Date.now(); // 获取当前时间
                        if (event.total && currentTime - lastPrintTime >= 100) {
                            const percentComplete = (event.loaded / event.total) * 100;
                            const currentProgress = percentComplete.toFixed(2);

                            // 计算最近100毫秒内的下载速度
                            bytesDownloadedInLast100ms = event.loaded - lastBytesLoaded;
                            const lastSpeed = bytesDownloadedInLast100ms / (currentTime - lastPrintTime); // 字节/毫秒

                            // 使用指数平滑来计算平均下载速度
                            averageSpeed = SMOOTHING_FACTOR * lastSpeed + (1 - SMOOTHING_FACTOR) * averageSpeed;

                            // 使用平均下载速度预测剩余的下载时间
                            const bytesRemaining = event.total - event.loaded;
                            const estimatedTimeRemaining = bytesRemaining / averageSpeed; // 毫秒
                            let estimatedTimeRemainingSeconds = Math.round(estimatedTimeRemaining / 1000); // 将毫秒转换为秒
                            // 超过 2000 秒，则改为 +inf
                            if (estimatedTimeRemainingSeconds > 9999) {
                                estimatedTimeRemainingSeconds = 'inf';
                            }
                            // 更新下载提示
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
                            lastPrintTime = currentTime; // 更新上次打印时间
                            lastBytesLoaded = event.loaded; // 更新上次下载的字节数
                        }
                    },
                    onload: function () {
                        downloadTip.innerHTML = `下载完成<br/>${downloadInfo}`;
                    },
                });
                window.addEventListener('beforeunload', function () {
                    download.abort(); // 取消下载
                });
            } catch {
                window.open(downloadUrl, '_blank');
                downloadInfo = `正常文件名：${fileName}<br/>下载地址：<a target="_blank" href="${downloadUrl}">文件源地址</a>`;
                downloadTip.innerHTML = `已在新窗口启动下载<br/>${downloadInfo}`;
                alert(
                    '看上去你的浏览器与插件搭配（如 Safari + UserScripts）不支持自动重命名功能，已尝试使用新标签页下载'
                );
            }
        }
    });
    if (copyDownloadUrlButton) {
        copyDownloadUrlButton.addEventListener('click', async () => {
            console.log(`[PKU Art] 已复制下载链接：\n${downloadUrl}`);
            GM_setClipboard(downloadUrl);
            alert(
                '下载链接已复制到剪贴板，但是因为存在鉴权，可能依旧无法使用 FDM 之类的工具下载，请在浏览器中打开后下载'
            );
        });
    }
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
            if (href && !href.startsWith('/webapps/') && !href.startsWith('#')) {
                link.removeAttribute('onclick');
                link.dataset.pkuArtProcessed = 'true';
                console.log('[PKU Art] 直接打开链接:', href);
            }
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
};
