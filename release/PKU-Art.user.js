// ==UserScript==
// @name         PKU-Art
// @description  给你一个足够好看的教学网
// @version      2.3.33
// @match        *://*.pku.edu.cn/*
// @run-at       document-start
// @author       Arthals
// @license      GPL-3.0 license
// @author-blog  https://arthals.ink
// @icon         https://cdn.arthals.ink/Arthals-mcskin.png
// @namespace    https://github.com/zhuozhiyongde/PKU-Art
// @supportURL   https://github.com/zhuozhiyongde/PKU-Art/issues
// @updateURL    https://cdn.arthals.ink/release/PKU-Art.user.js
// @date         2024/03/07
// ==/UserScript==
(function () {
    'use strict';
    injectPKUArt();
})()

function injectPKUArt () {
    let htmlpath = location.href;
    
    if (/^https:\/\/iaaa\.pku\.edu\.cn\/\S*$|^https:\/\/course\.pku\.edu\.cn\/\S*$|^https:\/\/onlineroomse\.pku\.edu\.cn\/\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/main.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/main.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/main.css.");
    }

    if (/^https:\/\/iaaa\.pku\.edu\.cn\/\S*$|^https:\/\/course\.pku\.edu\.cn\/\S*$|^https:\/\/onlineroomse\.pku\.edu\.cn\/\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/arco-palette.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/arco-palette.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/arco-palette.css.");
    }

    if (/^https:\/\/iaaa\.pku\.edu\.cn\/\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/iaaaOAuthPage.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/iaaaOAuthPage.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/iaaaOAuthPage.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/login\S*$|^https:\/\/course\.pku\.edu\.cn[\/]?$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseLoginPage.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseLoginPage.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseLoginPage.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/?$|^https:\/\/course\.pku\.edu\.cn\/webapps\/portal\/\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseHomePage.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseHomePage.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseHomePage.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseContent.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseContent.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseContent.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\S*announcement\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseAnnouncement.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseAnnouncement.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseAnnouncement.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*classinCourseClass\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseClassin.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseClassin.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseClassin.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*blankPage\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseBlankPage.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseBlankPage.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseBlankPage.css.");
    }

    if (/^https:\/\/course.pku.edu.cn\/webapps\S*videoList\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseVideolist.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseVideolist.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseVideolist.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*((discussionboard)|(groupContentList))\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseOther.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseOther.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseOther.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*myGrades\S*course_id\S*is_stream=false\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseClassGrade.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseClassGrade.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseClassGrade.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*listContent\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseListContent.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseListContent.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseListContent.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*viewAttempts\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseViewAttempt.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseViewAttempt.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseViewAttempt.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*toolId\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseToolFrame.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseToolFrame.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseToolFrame.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=alerts\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseToolAlert.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseToolAlert.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseToolAlert.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=mygrades\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseToolGrade.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseToolGrade.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseToolGrade.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*stream_name=mygrades$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseToolGradeClass.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseToolGradeClass.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseToolGradeClass.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*stream_name=mygrades_d\S*gradable_item_id\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseToolGradeItem.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseToolGradeItem.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseToolGradeItem.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*content\/file\?cmd=view\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseFileEmbed.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseFileEmbed.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseFileEmbed.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*assignment\/uploadAssignment\?\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseAssignmentUpload.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseAssignmentUpload.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseAssignmentUpload.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*context=mybb\S*$|^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/execute\/announcement$|^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*playVideo\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseGlobalPage.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseGlobalPage.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseGlobalPage.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*announcement\S*context=mybb\S*$|^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/execute\/announcement$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseGlobalAnnouncement.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseGlobalAnnouncement.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseGlobalAnnouncement.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*playVideo\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseVideoPlay.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseVideoPlay.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseVideoPlay.css.");
    }

    if (/^https:\/\/onlineroomse\.pku\.edu\.cn\/player\?course_id\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseVideoPlayFrame.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseVideoPlayFrame.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseVideoPlayFrame.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*taskView\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseTask.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art /css/courseTask.css";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink/css/courseTask.css.");
    }

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
    if (/^https:\/\/(course|autolab)\.pku\.edu\.cn\//.test(htmlpath)) {
        function executeReplaceIcon() {
            const icons = document.querySelectorAll('link[rel="icon" i], link[rel="shortcut icon" i]');
            if (icons.length > 0) {
                // 替换第一个 ICON 的 URL
                icons[0].href = 'https://cdn.arthals.ink/css/src/PKU.svg';
                // 删除除第一个 ICON 之外的所有 ICON
                for (let i = 1; i < icons.length; i++) {
                    icons[i].parentNode.removeChild(icons[i]);
                }
            } else {
                // 如果没有找到 ICON，创建一个新的 ICON
                const newIcon = document.createElement('link');
                newIcon.rel = 'SHORTCUT ICON';
                newIcon.href = 'https://cdn.arthals.ink/css/src/PKU.svg';
                document.head.appendChild(newIcon);
            }
        }
        executeReplaceIcon();
        document.addEventListener('DOMContentLoaded', executeReplaceIcon);
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
    // 等待页面加载完成
    await new Promise((resolve) => {
        const checkExist = setInterval(() => {
            let downloadApp = document.querySelector(
                '#app > div.container > div > div > div.course-info__wrap > div.course-info__footer > button:nth-child(1)'
            );
            if (downloadApp) {
                clearInterval(checkExist);
                resolve();
            }
        }, 100); // 每100毫秒检查一次
    });

    let downloadApp = document.querySelector(
        '#app > div.container > div > div > div.course-info__wrap > div.course-info__footer > button:nth-child(1)'
    );

    // 获取特定的按钮
    let downloadUrlButton = document.querySelector(
        '#app > div.container > div > div > div.course-info__wrap > div.course-info__footer > button:nth-child(2)'
    );

    // 修改 downloadApp > span 的内容
    downloadApp.children[1].innerText = '下载视频';
    // 移除 downloadApp 的所有 onclick 的 eventListener
    downloadApp.replaceWith(downloadApp.cloneNode(true));

    // 在 downloadUrlButton 的后面添加一个文本框
    let downloadUrlInput = document.createElement('input');
    downloadUrlInput.setAttribute('type', 'text');
    downloadUrlInput.setAttribute('id', 'injectDownloadUrlInput');
    downloadUrlInput.setAttribute('class', 'PKU-Art');
    downloadUrlInput.setAttribute('placeholder', '请填入复制的下载链接...');
    // 移动到 downloadUrlButton 的后面
    downloadUrlButton.parentNode.insertBefore(downloadUrlInput, downloadUrlButton.nextSibling);

    console.log('Injected downloadUrlInput');

    // 重新获取 downloadApp
    downloadApp = document.querySelector(
        '#app > div.container > div > div > div.course-info__wrap > div.course-info__footer > button:nth-child(1)'
    );
    // 添加一个点击事件
    downloadApp.addEventListener('click', () => {
        let downloadUrl = document.querySelector('#injectDownloadUrlInput').value;
        // https://resourcese.pku.edu.cn/play/0/harpocrates/2024/03/04/0be82eb1dc7448c09eabcb6f31a8efea/0/playlist.m3u8?title=人工智能基础&sub_title=2024-03-04第5-6节
        // m3u8Pattern = /https://resourcese.pku.edu.cn/play/0/harpocrates/\d/\d*/\d*/([a-zA-Z0-9]+)/0/playlist.m3u8?.*/;
        // https://resourcese.pku.edu.cn/play/0/harpocrates/2024/03/04/0be82eb1dc7448c09eabcb6f31a8efea/0/playlist.m3u8?title=人工智能基础&sub_title=2024-03-04第5-6节
        let mp4Pattern = /http.+\.mp4\?.*/;
        let m3u8Pattern =
            /https:\/\/resourcese\.pku\.edu\.cn\/play\/0\/harpocrates\/\d+\/\d+\/\d+\/([a-zA-Z0-9]+)\/0\/playlist.m3u8?.*/;
        if (mp4Pattern.test(downloadUrl)) {
            // 直接下载
            window.open(downloadUrl);
            return;
        }
        if (!m3u8Pattern.test(downloadUrl)) {
            alert('请填入正确的下载链接！');
            return;
        }
        let hash = downloadUrl.match(m3u8Pattern)[1];
        let trueDownloadUrl = `https://course.pku.edu.cn/webapps/bb-streammedia-hqy-BBLEARN/downloadVideo.action?resourceId=${hash}`;
        window.open(trueDownloadUrl);
    });

    downloadUrlButton.addEventListener('click', () => {
        // 尝试每100ms查找 .course-info__footer_span_success，更改内容
        let attempts = 0; // 尝试的次数
        const maxAttempts = 10; // 最多尝试的次数
        const intervalId = setInterval(() => {
            const element = document.querySelector('.course-info__footer_span_success');
            if (element) {
                element.textContent = '复制成功，请在左侧输入栏输入下载链接'; // 这里替换成你想要的内容
                clearInterval(intervalId); // 找到元素后清除定时器
            } else if (attempts >= maxAttempts) {
                clearInterval(intervalId); // 尝试次数超过限制也清除定时器
            }
            attempts++; // 增加尝试的次数
        }, 100);
    });
})();