import mainStyles from './css/main.css?inline';
import arcoPaletteStyles from './css/arco-palette.css?inline';
import themeManager from './theme-manager.js';
import iaaaOAuthPageStyles from './css/iaaaOAuthPage.css?inline';
import courseLoginPageStyles from './css/courseLoginPage.css?inline';
import courseHomePageStyles from './css/courseHomePage.css?inline';
import courseContentStyles from './css/courseContent.css?inline';
import courseAnnouncementStyles from './css/courseAnnouncement.css?inline';
import courseTeachingStaffListStyles from './css/courseTeachingStaffList.css?inline';
import courseClassinStyles from './css/courseClassin.css?inline';
import courseBlankPageStyles from './css/courseBlankPage.css?inline';
import courseVideolistStyles from './css/courseVideolist.css?inline';
import courseOtherStyles from './css/courseOther.css?inline';
import courseClassGradeStyles from './css/courseClassGrade.css?inline';
import courseListContentStyles from './css/courseListContent.css?inline';
import courseViewAttemptStyles from './css/courseViewAttempt.css?inline';
import courseToolFrameStyles from './css/courseToolFrame.css?inline';
import courseToolAlertStyles from './css/courseToolAlert.css?inline';
import courseToolGradeStyles from './css/courseToolGrade.css?inline';
import courseToolGradeClassStyles from './css/courseToolGradeClass.css?inline';
import courseToolGradeItemStyles from './css/courseToolGradeItem.css?inline';
import courseFileEmbedStyles from './css/courseFileEmbed.css?inline';
import courseAssignmentUploadStyles from './css/courseAssignmentUpload.css?inline';
import courseGlobalPageStyles from './css/courseGlobalPage.css?inline';
import courseGlobalAnnouncementStyles from './css/courseGlobalAnnouncement.css?inline';
import courseVideoPlayStyles from './css/courseVideoPlay.css?inline';
import courseVideoPlayFrameStyles from './css/courseVideoPlayFrame.css?inline';
import courseTaskStyles from './css/courseTask.css?inline';
import courseDiscussionStyles from './css/courseDiscussion.css?inline';
import courseExternalLinkStyles from './css/courseExternalLink.css?inline';

function injectStyles(styleString, cssFileName) {
    const styleElement = document.createElement('style');
    styleElement.textContent = styleString;
    styleElement.dataset.cssFileName = cssFileName;
    styleElement.dataset.author = 'Arthals';
    styleElement.className = 'PKU-Art';

    if (document.head) {
        document.head.appendChild(styleElement);
    } else {
        // 等待 head 加载完成
        document.addEventListener('DOMContentLoaded', () => {
            document.head.appendChild(styleElement);
        });
    }
}

const currentUrl = window.location.href;

// 初始化主题管理器
function initializeThemeManager() {
    // 检查用户脚本选项设置
    let userThemeMode = 'auto';
    try {
        if (typeof GM_getValue !== 'undefined') {
            userThemeMode = GM_getValue('themeMode', 'auto');
        }
    } catch (e) {
        console.log('[PKU Art] GM_getValue not available, using default theme mode');
    }

    // 设置主题模式
    themeManager.setTheme(userThemeMode);

    // 注册主题切换菜单命令
    if (typeof GM_registerMenuCommand !== 'undefined') {
        // 日间模式
        GM_registerMenuCommand('☀️ 日间模式', () => {
            themeManager.setTheme('light');
            try {
                GM_setValue('themeMode', 'light');
            } catch (e) {
                console.log('[PKU Art] GM_setValue not available');
            }
            alert('已切换到日间模式');
        });

        // 黑夜模式
        GM_registerMenuCommand('🌙 黑夜模式', () => {
            themeManager.setTheme('dark');
            try {
                GM_setValue('themeMode', 'dark');
            } catch (e) {
                console.log('[PKU Art] GM_setValue not available');
            }
            alert('已切换到黑夜模式');
        });

        // 跟随系统
        GM_registerMenuCommand('⚙️ 跟随系统', () => {
            themeManager.setTheme('auto');
            try {
                GM_setValue('themeMode', 'auto');
            } catch (e) {
                console.log('[PKU Art] GM_setValue not available');
            }
            alert('已设置为跟随系统主题');
        });

        console.log('[PKU Art] Theme menu commands registered');
    }

    console.log('[PKU Art] Theme manager initialized with mode:', userThemeMode);
}

// 初始化主题功能
initializeThemeManager();

const globalStyleScopes = [
    /^https:\/\/iaaa\.pku\.edu\.cn\/\S*$/,
    /^https:\/\/course\.pku\.edu\.cn\/\S*$/,
    /^https:\/\/onlineroomse\.pku\.edu\.cn\/\S*$/,
];

const styleRules = [
    {
        patterns: globalStyleScopes,
        styleContent: mainStyles,
        fileName: 'main.css',
        logMessage: '[PKU Art] main.css imported',
    },
    {
        patterns: globalStyleScopes,
        styleContent: arcoPaletteStyles,
        fileName: 'arco-palette.css',
        logMessage: '[PKU Art] arco-palette.css imported',
    },
    {
        patterns: [/^https:\/\/iaaa\.pku\.edu\.cn\/\S*$/],
        styleContent: iaaaOAuthPageStyles,
        fileName: 'iaaaOAuthPage.css',
        logMessage: '[PKU Art] iaaaOAuthPage.css imported',
    },
    {
        patterns: [
            /^https:\/\/course\.pku\.edu\.cn\/webapps\/login\S*$/,
            /^https:\/\/course\.pku\.edu\.cn[\/]?$/,
        ],
        styleContent: courseLoginPageStyles,
        fileName: 'courseLoginPage.css',
        logMessage: '[PKU Art] courseLoginPage.css imported',
    },
    {
        patterns: [
            /^https:\/\/course\.pku\.edu\.cn\/webapps\/?$/,
            /^https:\/\/course\.pku\.edu\.cn\/webapps\/portal\/\S*$/,
        ],
        styleContent: courseHomePageStyles,
        fileName: 'courseHomePage.css',
        logMessage: '[PKU Art] courseHomePage.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*$/],
        styleContent: courseContentStyles,
        fileName: 'courseContent.css',
        logMessage: '[PKU Art] courseContent.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\S*announcement\S*$/],
        styleContent: courseAnnouncementStyles,
        fileName: 'courseAnnouncement.css',
        logMessage: '[PKU Art] courseAnnouncement.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*getTeachingStaffList\S*$/],
        styleContent: courseTeachingStaffListStyles,
        fileName: 'courseTeachingStaffList.css',
        logMessage: '[PKU Art] courseTeachingStaffList.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*classinCourseClass\S*$/],
        styleContent: courseClassinStyles,
        fileName: 'courseClassin.css',
        logMessage: '[PKU Art] courseClassin.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*blankPage\S*$/],
        styleContent: courseBlankPageStyles,
        fileName: 'courseBlankPage.css',
        logMessage: '[PKU Art] courseBlankPage.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*videoList\S*$/],
        styleContent: courseVideolistStyles,
        fileName: 'courseVideolist.css',
        logMessage: '[PKU Art] courseVideolist.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*((discussionboard)|(groupContentList))\S*$/],
        styleContent: courseOtherStyles,
        fileName: 'courseOther.css',
        logMessage: '[PKU Art] courseOther.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*myGrades\S*course_id\S*is_stream=false\S*$/],
        styleContent: courseClassGradeStyles,
        fileName: 'courseClassGrade.css',
        logMessage: '[PKU Art] courseClassGrade.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*listContent\S*$/],
        styleContent: courseListContentStyles,
        fileName: 'courseListContent.css',
        logMessage: '[PKU Art] courseListContent.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*viewAttempts\S*$/],
        styleContent: courseViewAttemptStyles,
        fileName: 'courseViewAttempt.css',
        logMessage: '[PKU Art] courseViewAttempt.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*toolId\S*$/],
        styleContent: courseToolFrameStyles,
        fileName: 'courseToolFrame.css',
        logMessage: '[PKU Art] courseToolFrame.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=alerts\S*$/],
        styleContent: courseToolAlertStyles,
        fileName: 'courseToolAlert.css',
        logMessage: '[PKU Art] courseToolAlert.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=mygrades\S*$/],
        styleContent: courseToolGradeStyles,
        fileName: 'courseToolGrade.css',
        logMessage: '[PKU Art] courseToolGrade.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*stream_name=mygrades$/],
        styleContent: courseToolGradeClassStyles,
        fileName: 'courseToolGradeClass.css',
        logMessage: '[PKU Art] courseToolGradeClass.css imported',
    },
    {
        patterns: [
            /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*stream_name=mygrades_d\S*gradable_item_id\S*$/,
        ],
        styleContent: courseToolGradeItemStyles,
        fileName: 'courseToolGradeItem.css',
        logMessage: '[PKU Art] courseToolGradeItem.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*content\/file\?cmd=view\S*$/],
        styleContent: courseFileEmbedStyles,
        fileName: 'courseFileEmbed.css',
        logMessage: '[PKU Art] courseFileEmbed.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*assignment\/uploadAssignment\?\S*$/],
        styleContent: courseAssignmentUploadStyles,
        fileName: 'courseAssignmentUpload.css',
        logMessage: '[PKU Art] courseAssignmentUpload.css imported',
    },
    {
        patterns: [
            /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*context=mybb\S*$/,
            /^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/execute\/announcement$/,
            /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*playVideo\S*$/,
        ],
        styleContent: courseGlobalPageStyles,
        fileName: 'courseGlobalPage.css',
        logMessage: '[PKU Art] courseGlobalPage.css imported',
    },
    {
        patterns: [
            /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*announcement\S*context=mybb\S*$/,
            /^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/execute\/announcement$/,
        ],
        styleContent: courseGlobalAnnouncementStyles,
        fileName: 'courseGlobalAnnouncement.css',
        logMessage: '[PKU Art] courseGlobalAnnouncement.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*playVideo\S*$/],
        styleContent: courseVideoPlayStyles,
        fileName: 'courseVideoPlay.css',
        logMessage: '[PKU Art] courseVideoPlay.css imported',
    },
    {
        patterns: [/^https:\/\/onlineroomse\.pku\.edu\.cn\/player\?course_id\S*$/],
        styleContent: courseVideoPlayFrameStyles,
        fileName: 'courseVideoPlayFrame.css',
        logMessage: '[PKU Art] courseVideoPlayFrame.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*taskView\S*$/],
        styleContent: courseTaskStyles,
        fileName: 'courseTask.css',
        logMessage: '[PKU Art] courseTask.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*discussionboard\S*$/],
        styleContent: courseDiscussionStyles,
        fileName: 'courseDiscussion.css',
        logMessage: '[PKU Art] courseDiscussion.css imported',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*contentWrapperNoFrame\S*$/],
        styleContent: courseExternalLinkStyles,
        fileName: 'courseExternalLink.css',
        logMessage: '[PKU Art] courseExternalLink.css imported',
    },
];

function matchesAnyPattern(patterns, url) {
    return patterns.some((pattern) => pattern.test(url));
}

function applyStylesForCurrentPage(url = currentUrl) {
    styleRules.forEach(({ patterns, styleContent, fileName, logMessage }) => {
        if (matchesAnyPattern(patterns, url)) {
            injectStyles(styleContent, fileName);
            console.log(logMessage);
        }
    });
}

applyStylesForCurrentPage();

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

initializeLogoNavigation();

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

ensureSidebarVisible();

function overrideSiteIcons() {
    if (!/^https:\/\/(course|autolab|disk)\.pku\.edu\.cn\//.test(window.location.href)) {
        return;
    }

    const replaceIcons = () => {
        const icons = document.querySelectorAll(
            'link[rel="icon" i]:not([href^="https://cdn.arthals.ink/"]), link[rel="shortcut icon" i]:not([href^="https://cdn.arthals.ink/"])'
        );
        if (icons.length > 0) {
            icons.forEach((icon) => {
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

overrideSiteIcons();

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

removeCourseSerialNumbers();

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
        downloadSwitchArea.innerHTML = `
    <input type="checkbox" id="injectDownloadSwitch" class="PKU-Art" disabled>
    <label for="injectDownloadSwitch"></label>
    <span  id="injectDownloadSwitchDesc" class="PKU-Art"> Safari 不支持复制下载链接、重命名文件 </span>`;
        // add class safari to downloadSwitchArea
        downloadSwitchArea.classList.add('safari');
        // remove copyDownloadUrlButton;
        copyDownloadUrlButton.remove();
    }

    const magicLink = document.createElement('button');
    magicLink.id = 'injectMagicLink';
    magicLink.className = 'PKU-Art';
    magicLink.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="PKU-Art i-magic" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M5.497 3.997A1.225 1.225 0 0 0 4 5.494l1.264 4.79L2.58 14.45c-.508.79.024 1.834.962 1.887l4.946.278l3.132 3.838a1.225 1.225 0 0 0 2.091-.331l1.397-3.6l4.608 4.608a1 1 0 0 0 1.415-1.414l-4.608-4.608l3.599-1.397a1.225 1.225 0 0 0 .331-2.091l-3.838-3.133l-.278-4.946a1.225 1.225 0 0 0-1.886-.96L10.287 5.26l-4.79-1.264Zm1.788 6.107L6.273 6.271l3.834 1.011c.332.088.686.032.976-.154l3.333-2.147l.223 3.959c.019.343.182.662.448.88l3.072 2.507l-3.696 1.435c-.32.124-.574.378-.699.698l-1.435 3.697l-2.507-3.072a1.23 1.23 0 0 0-.88-.449l-3.959-.222L7.13 11.08a1.23 1.23 0 0 0 .155-.976"/></g></svg>
    <span class="PKU-Art">妙妙小工具</span>
    `;
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
                    onerror: function () {
                        alert('下载失败，请重试');
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
                alert('看上去你的浏览器（如 Safari）不支持自动重命名功能，已尝试使用新标签页下载');
            }
        }
    });
    if (copyDownloadUrlButton) {
        copyDownloadUrlButton.addEventListener('click', async () => {
            console.log(`[PKU Art] 已复制下载链接：\n${downloadUrl}`);
            GM_setClipboard(downloadUrl);
            alert('下载链接已复制到剪贴板，但是因为存在鉴权，可能依旧无法使用 FDM 之类的工具下载，请在浏览器中打开后下载');
        });
    }
}

initializeDirectDownload();

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

redirectGlobalMoreLink();

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

enableDirectOpenLinks();
