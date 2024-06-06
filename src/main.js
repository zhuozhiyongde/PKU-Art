import mainStyles from './css/main.css?inline';
import arcoPaletteStyles from './css/arco-palette.css?inline';
import iaaaOAuthPageStyles from './css/iaaaOAuthPage.css?inline';
import courseLoginPageStyles from './css/courseLoginPage.css?inline';
import courseHomePageStyles from './css/courseHomePage.css?inline';
import courseContentStyles from './css/courseContent.css?inline';
import courseAnnouncementStyles from './css/courseAnnouncement.css?inline';
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

function injectStyles(styleString) {
    const styleElement = document.createElement('style');
    styleElement.textContent = styleString;
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

let htmlpath = location.href;

// 限定全局样式生效路径
if (
    /^https:\/\/iaaa\.pku\.edu\.cn\/\S*$|^https:\/\/course\.pku\.edu\.cn\/\S*$|^https:\/\/onlineroomse\.pku\.edu\.cn\/\S*$/.test(
        htmlpath
    )
) {
    injectStyles(mainStyles);
    console.log('[PKU Art] main.css imported');
}

// 限定全局样式生效路径
if (
    /^https:\/\/iaaa\.pku\.edu\.cn\/\S*$|^https:\/\/course\.pku\.edu\.cn\/\S*$|^https:\/\/onlineroomse\.pku\.edu\.cn\/\S*$/.test(
        htmlpath
    )
) {
    injectStyles(arcoPaletteStyles);
    console.log('[PKU Art] arco-palette.css imported');
}

// iaaa登录界面
if (/^https:\/\/iaaa\.pku\.edu\.cn\/\S*$/.test(htmlpath)) {
    injectStyles(iaaaOAuthPageStyles);
    console.log('[PKU Art] iaaaOAuthPage.css imported');
}

// 课程网首页
// courseLoginPage
if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/login\S*$|^https:\/\/course\.pku\.edu\.cn[\/]?$/.test(htmlpath)) {
    injectStyles(courseLoginPageStyles);
    console.log('[PKU Art] courseLoginPage.css imported');
}

// 首页
// courseHomePage
if (
    /^https:\/\/course\.pku\.edu\.cn\/webapps\/?$|^https:\/\/course\.pku\.edu\.cn\/webapps\/portal\/\S*$/.test(htmlpath)
) {
    injectStyles(courseHomePageStyles);
    console.log('[PKU Art] courseHomePage.css imported');
}

// 课程页面框架
// courseContent
if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*$/.test(htmlpath)) {
    injectStyles(courseContentStyles);
    console.log('[PKU Art] courseContent.css imported');
}

// 课程通知界面
// courseAnnouncement
if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\S*announcement\S*$/.test(htmlpath)) {
    injectStyles(courseAnnouncementStyles);
    console.log('[PKU Art] courseAnnouncement.css imported');
}

// ClassIn界面，实际和其他界面差不多
// courseClassin
// https://course.pku.edu.cn/webapps/bb-ClassIn-BBLEARN/classinCourseClass/getHomeClassList.do?course_id=_51512_1&page=1
if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*classinCourseClass\S*$/.test(htmlpath)) {
    injectStyles(courseClassinStyles);
    console.log('[PKU Art] courseClassin.css imported');
}

// 空白页面
// courseBlank
// https://course.pku.edu.cn/webapps/blackboard/execute/content/blankPage?cmd=view&content_id=_940424_1&course_id=_51512_1
if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*blankPage\S*$/.test(htmlpath)) {
    injectStyles(courseBlankPageStyles);
    console.log('[PKU Art] courseBlankPage.css imported');
}

// 回放界面
// courseVideolist
if (/^https:\/\/course.pku.edu.cn\/webapps\S*videoList\S*$/.test(htmlpath)) {
    injectStyles(courseVideolistStyles);
    console.log('[PKU Art] courseVideolist.css imported');
}

// 其他个人成绩界面
// courseOther
if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*((discussionboard)|(groupContentList))\S*$/.test(htmlpath)) {
    injectStyles(courseOtherStyles);
    console.log('[PKU Art] courseOther.css imported');
}

// 个人成绩界面
// courseClassGrade
if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*myGrades\S*course_id\S*is_stream=false\S*$/.test(htmlpath)) {
    injectStyles(courseClassGradeStyles);
    console.log('[PKU Art] courseClassGrade.css imported');
}

// 文件列表界面
// courseListContent
if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*listContent\S*$/.test(htmlpath)) {
    injectStyles(courseListContentStyles);
    console.log('[PKU Art] courseListContent.css imported');
}

// 查看尝试界面
// courseViewAttempt
if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*viewAttempts\S*$/.test(htmlpath)) {
    injectStyles(courseViewAttemptStyles);
    console.log('[PKU Art] courseViewAttempt.css imported');
}

// 全局工具界面框架
// courseToolFrame
if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*toolId\S*$/.test(htmlpath)) {
    injectStyles(courseToolFrameStyles);
    console.log('[PKU Art] courseToolFrame.css imported');
}

// 全局通知界面
// courseToolAlert
// https://course.pku.edu.cn/webapps/bb-social-learning-bb_bb60/execute/mybb?cmd=display&toolId=AlertsOnMyBb_____AlertsTool
if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=alerts\S*$/.test(htmlpath)) {
    injectStyles(courseToolAlertStyles);
    console.log('[PKU Art] courseToolAlert.css imported');
}

// 全局成绩界面
// courseToolGrade
// https://course.pku.edu.cn/webapps/bb-social-learning-bb_bb60/execute/mybb?cmd=display&toolId=MyGradesOnMyBb_____MyGradesTool
if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=mygrades\S*$/.test(htmlpath)) {
    injectStyles(courseToolGradeStyles);
    console.log('[PKU Art] courseToolGrade.css imported');
}

// 课程成绩帧框
// courseToolGradeClass
// https://course.pku.edu.cn/webapps/bb-mygrades-bb_bb60/myGrades?course_id=_64001_1&stream_name=mygrades
if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*stream_name=mygrades$/.test(htmlpath)) {
    injectStyles(courseToolGradeClassStyles);
    console.log('[PKU Art] courseToolGradeClass.css imported');
}

// 单一成绩帧框
// courseToolGradeItem
// https://course.pku.edu.cn/webapps/bb-mygrades-bb_bb60/myGrades?course_id=_64001_1&stream_name=mygrades_d&gradable_item_id=_194000_1&course_membership_id=_5933797_1
if (
    /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*stream_name=mygrades_d\S*gradable_item_id\S*$/.test(
        htmlpath
    )
) {
    injectStyles(courseToolGradeItemStyles);
    console.log('[PKU Art] courseToolGradeItem.css imported');
}

// 文件预览界面
// courseFileEmbed
// https://course.pku.edu.cn/webapps/blackboard/execute/content/file?cmd=view&content_id=_836702_1&course_id=_64964_1
if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*content\/file\?cmd=view\S*$/.test(htmlpath)) {
    injectStyles(courseFileEmbedStyles);
    console.log('[PKU Art] courseFileEmbed.css imported');
}

// 文件上传界面
// courseAssignmentUpload
// https://course.pku.edu.cn/webapps/assignment/uploadAssignment?content_id=_862639_1&course_id=_64001_1&group_id=&mode=view

// 作业复查界面
// courseAssignmentReview
// https://course.pku.edu.cn/webapps/assignment/uploadAssignment?content_id=_862403_1&course_id=_64001_1&group_id=&mode=view#
if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*assignment\/uploadAssignment\?\S*$/.test(htmlpath)) {
    injectStyles(courseAssignmentUploadStyles);
    console.log('[PKU Art] courseAssignmentUpload.css imported');
}

// 全局界面
// courseGlobalPage
// https://course.pku.edu.cn/webapps/blackboard/execute/announcement?method=search&context=mybb&handle=my_announcements&returnUrl=/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_3_1&tabId=_1_1&forwardUrl=index.jsp
// https://course.pku.edu.cn/webapps/bb-streammedia-hqy-bb_bb60/playVideo.action?hqyCourseId=33467&hqySubId=776419&kcwybm=21222-012-01233170-0006166248-1
if (
    /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*context=mybb\S*$|^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/execute\/announcement$|^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*playVideo\S*$/.test(
        htmlpath
    )
) {
    injectStyles(courseGlobalPageStyles);
    console.log('[PKU Art] courseGlobalPage.css imported');
}

// 全局通知界面
// courseGlobalAnnouncement
// https://course.pku.edu.cn/webapps/blackboard/execute/announcement?method=search&context=mybb&handle=my_announcements&returnUrl=/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_3_1&tabId=_1_1&forwardUrl=index.jsp
if (
    /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*announcement\S*context=mybb\S*$|^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/execute\/announcement$/.test(
        htmlpath
    )
) {
    injectStyles(courseGlobalAnnouncementStyles);
    console.log('[PKU Art] courseGlobalAnnouncement.css imported');
}

// 回放界面
// courseVideoPlay
// https://course.pku.edu.cn/webapps/bb-streammedia-hqy-bb_bb60/playVideo.action?hqyCourseId=33467&hqySubId=776419&kcwybm=21222-012-01233170-0006166248-1
if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*playVideo\S*$/.test(htmlpath)) {
    injectStyles(courseVideoPlayStyles);
    console.log('[PKU Art] courseVideoPlay.css imported');
}

// 回放帧框
// courseVideoPlayFrane
// https://livingroomhqy.pku.edu.cn/player?course_id=33467&sub_id=776419
if (/^https:\/\/onlineroomse\.pku\.edu\.cn\/player\?course_id\S*$/.test(htmlpath)) {
    injectStyles(courseVideoPlayFrameStyles);
    console.log('[PKU Art] courseVideoPlayFrame.css imported');
}

// 任务界面
// courseTask
// https://course.pku.edu.cn/webapps/blackboard/execute/taskView?course_id=&task_id=_563_1

if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*taskView\S*$/.test(htmlpath)) {
    injectStyles(courseTaskStyles);
    console.log('[PKU Art] courseTask.css imported');
}

// Other IIFE
(function preventHideSidebar() {
    let htmlpath = location.href;
    if (/^https:\/\/course\.pku\.edu\.cn\//.test(htmlpath)) {
        function resetNavigationPane() {
            // console.log('[PKU Art] resetNavigationPane() has been used at ' + new Date().toLocaleString());
            let navigationPane = document.getElementById('navigationPane');
            if (navigationPane && navigationPane.classList.contains('navcollapsed')) {
                // 检查侧边栏是否被隐藏
                const puller = document.getElementById('menuPuller');
                puller.click(); // 点击侧边栏隐藏按钮，显示侧边栏
                console.log('[PKU Art] sidebar reseted by auto click at ' + new Date().toLocaleString());
            }
        }
        resetNavigationPane();
        window.addEventListener('resize', resetNavigationPane);
    }
})();

(function replaceIcon() {
    let htmlpath = location.href;
    if (/^https:\/\/(course|autolab|disk)\.pku\.edu\.cn\//.test(htmlpath)) {
        function executeReplaceIcon() {
            const icons = document.querySelectorAll('link[rel="icon" i], link[rel="shortcut icon" i]');
            if (icons.length > 0) {
                icons[0].href = 'https://cdn.arthals.ink/css/src/PKU.svg';
                for (let i = 1; i < icons.length; i++) {
                    icons[i].parentNode.removeChild(icons[i]);
                }
            } else {
                const newIcon = document.createElement('link');
                newIcon.rel = 'SHORTCUT ICON';
                newIcon.href = 'https://cdn.arthals.ink/css/src/PKU.svg';
                document.head.appendChild(newIcon);
            }
        }

        executeReplaceIcon();
        document.addEventListener('DOMContentLoaded', executeReplaceIcon);

        // 创建 MutationObserver 实例
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === 'childList') {
                    executeReplaceIcon();
                }
            });
        });

        // 配置观察选项
        const config = { childList: true, subtree: true };

        // 传递目标节点和观察选项
        observer.observe(document.head, config);
    }
})();

(function deleteCourseSerial() {
    let htmlpath = location.href;
    if (
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/?$|^https:\/\/course\.pku\.edu\.cn\/webapps\/portal\/\S*$/.test(
            htmlpath
        )
    ) {
        function executeDeleteCourseSerical() {
            const courses = document.querySelectorAll(
                '.containerPortal > div:not(:first-child) .portlet .portletList-img > li > a'
            );
            // 22232-00048-04834600-0006170251-00-1: JavaScript及Web网页前端开发(22-23学年第2学期)
            // 22232-00038-03835950-w201600370-00-1: 高级英语口语(22-23学年第2学期
            courses.forEach((course) => {
                course.innerHTML = course.innerHTML.replace(/^.*?: /, '').replace(/\(\d+-\d+学年第\d学期\)/, '');
            });
            console.log('[PKU Art] course serial deleted: ' + courses.length + ' courses');
        }
        executeDeleteCourseSerical();
        document.addEventListener('DOMContentLoaded', executeDeleteCourseSerical);
    }
    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=alerts\S*$/.test(htmlpath)) {
        function executeDeleteCourseSerical() {
            const courses = document.querySelectorAll('#streamHeader_alerts a');
            // console.log(courses);
            courses.forEach((course) => {
                course.innerHTML = course.innerHTML.replace(/\(\d+-\d+学年第\d学期\)/, '');
            });
            if (courses.length !== 0) {
                clearInterval(timerId); // 成功执行后移除定时器
            }
        }
        executeDeleteCourseSerical();
        const timerId = setInterval(() => {
            const courses = document.querySelectorAll('#streamHeader_alerts a');
            if (courses.length !== 0) {
                executeDeleteCourseSerical();
            }
        }, 50);
    }
})();

(async function directDownload() {
    let htmlpath = location.href;

    // 检查当前URL是否匹配特定格式
    if (!/^https:\/\/onlineroomse\.pku\.edu\.cn\/player\?course_id\S*$/.test(htmlpath)) return;

    console.log('[PKU Art] Injected directDownload() at ' + new Date().toLocaleString());

    // 下载链接、课程名、录播时间
    let downloadUrl = '';
    let downloadJson = '';
    let courseName = '';
    let subTitle = '';
    let lecturerName = '';
    let fileName = '';

    const originSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.send = function () {
        this.addEventListener('load', function () {
            if (this.responseURL.includes('get-sub-info-by-auth-data')) {
                downloadJson = JSON.parse(this.response);
                console.log('[PKU Art] XHR 响应结果：\n', downloadJson);
                courseName = downloadJson.list[0].title;
                subTitle = downloadJson.list[0].sub_title;
                lecturerName = downloadJson.list[0].lecturer_name;
                fileName = `${courseName} - ${subTitle} - ${lecturerName}.mp4`;
                let filmContent = JSON.parse(downloadJson.list[0].sub_content);
                let is_m3u8 = filmContent.save_playback.is_m3u8;
                let trueDownloadUrl = '';
                if (is_m3u8 == 'yes') {
                    let m3u8 = filmContent.save_playback.contents;
                    let m3u8Pattern =
                        /https:\/\/resourcese\.pku\.edu\.cn\/play\/0\/harpocrates\/\d+\/\d+\/\d+\/([a-zA-Z0-9]+)(\/.+)\/playlist\.m3u8.*/;
                    let hash = m3u8.match(m3u8Pattern)[1];
                    trueDownloadUrl = `https://course.pku.edu.cn/webapps/bb-streammedia-hqy-BBLEARN/downloadVideo.action?resourceId=${hash}`;
                    console.log('[PKU Art] m3u8 下载链接转换成功：\n', trueDownloadUrl);
                } else {
                    trueDownloadUrl = filmContent.save_playback.contents;
                }
                downloadUrl = trueDownloadUrl;
                console.log('[PKU Art] 下载链接解析成功：\n', downloadUrl);
            }
        });
        originSend.apply(this, arguments);
    };

    // 等待页面加载完成
    await new Promise((resolve) => {
        const checkExist = setInterval(() => {
            let downloadButton = document.querySelector(
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
    let replayTite = document.querySelector(
        '#app > div.container > div > div > div.course-info__wrap > div.course-info__header > span'
    );
    // 修改 replayTtile 的内容
    replayTite.innerText = `${courseName} - ${subTitle} - ${lecturerName}`;

    // 修改 downloadButton > span 的内容
    downloadButton.children[1].innerText = '下载视频';
    // 移除 downloadButton 的所有 onclick 的 eventListener
    downloadButton.replaceWith(downloadButton.cloneNode(true));
    // 重新获取 downloadButton
    downloadButton = document.querySelector(
        '#app > div.container > div > div > div.course-info__wrap > div.course-info__footer > button:nth-child(1)'
    );
    let downloadArea = document.querySelector('#app > div.container > div > div > div.course-info__wrap');

    let downloadAreaFooter = document.querySelector(
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
    <span  id="injectDownloadSwitchDesc" class="PKU-Art"> 是否重命名文件，Safari 暂不支持此功能 </span>`;
    }

    downloadAreaFooter.appendChild(downloadSwitchArea);

    // 添加一个点击事件
    downloadButton.addEventListener('click', async () => {
        console.log(`[PKU Art] 已启动下载：\n文件名：${fileName}\n源地址：${downloadUrl}`);

        // 检查是否选择重命名
        const downloadSwitch = document.getElementById('injectDownloadSwitch'); // 开关

        let downloadInfo = `下载文件名：${fileName}<br/>下载地址：<a target="_blank" href="${downloadUrl}">文件源地址</a>`;

        if (!downloadSwitch.checked) {
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
        if (!downloadSwitch.checked) {
            downloadTip.innerHTML = `已在新窗口启动下载<br/>${downloadInfo}`;
        } else {
            downloadTip.innerHTML = `已在后台启动下载，请勿刷新页面<br/>${downloadInfo}`;
        }
        // 在 downloadArea 的最后一个元素之前插入 downloadTip
        downloadArea.insertBefore(downloadTip, downloadArea.lastElementChild);

        if (!downloadSwitch.checked) {
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
                    onerror: function (err) {
                        alert('下载失败，请重试');
                    },
                    onprogress: function (event) {
                        const currentTime = Date.now(); // 获取当前时间
                        if (event.total && currentTime - lastPrintTime >= 100) {
                            let percentComplete = (event.loaded / event.total) * 100;
                            let currentProgress = percentComplete.toFixed(2);

                            // 计算最近100毫秒内的下载速度
                            bytesDownloadedInLast100ms = event.loaded - lastBytesLoaded;
                            let lastSpeed = bytesDownloadedInLast100ms / (currentTime - lastPrintTime); // 字节/毫秒

                            // 使用指数平滑来计算平均下载速度
                            averageSpeed = SMOOTHING_FACTOR * lastSpeed + (1 - SMOOTHING_FACTOR) * averageSpeed;

                            // 使用平均下载速度预测剩余的下载时间
                            let bytesRemaining = event.total - event.loaded;
                            let estimatedTimeRemaining = bytesRemaining / averageSpeed; // 毫秒
                            let estimatedTimeRemainingSeconds = Math.round(estimatedTimeRemaining / 1000); // 将毫秒转换为秒

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
                window.addEventListener('beforeunload', function (event) {
                    download.abort(); // 取消下载
                });
            } catch {
                window.open(downloadUrl, '_blank');
                downloadInfo = `下载文件名：${hashFileName}<br/>正常文件名：${fileName}<br/>下载地址：<a target="_blank" href="${downloadUrl}">文件源地址</a>`;
                downloadTip.innerHTML = `已在新窗口启动下载<br/>${downloadInfo}`;
                alert('看上去你的浏览器（如 Safari）不支持自动重命名功能，已尝试使用新标签页下载');
            }
        }
    });
})();
