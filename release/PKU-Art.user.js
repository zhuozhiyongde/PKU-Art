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
// @date         2024/03/07
// @downloadURL https://update.greasyfork.org/scripts/436323/PKU-Art.user.js
// @updateURL https://update.greasyfork.org/scripts/436323/PKU-Art.meta.js
// @resource main https://cdn.arthals.ink/css/main.css
// @resource arco-palette https://cdn.arthals.ink/css/arco-palette.css
// @resource iaaaOAuthPage https://cdn.arthals.ink/css/iaaaOAuthPage.css
// @resource courseLoginPage https://cdn.arthals.ink/css/courseLoginPage.css
// @resource courseHomePage https://cdn.arthals.ink/css/courseHomePage.css
// @resource courseContent https://cdn.arthals.ink/css/courseContent.css
// @resource courseAnnouncement https://cdn.arthals.ink/css/courseAnnouncement.css
// @resource courseClassin https://cdn.arthals.ink/css/courseClassin.css
// @resource courseBlankPage https://cdn.arthals.ink/css/courseBlankPage.css
// @resource courseVideolist https://cdn.arthals.ink/css/courseVideolist.css
// @resource courseOther https://cdn.arthals.ink/css/courseOther.css
// @resource courseClassGrade https://cdn.arthals.ink/css/courseClassGrade.css
// @resource courseListContent https://cdn.arthals.ink/css/courseListContent.css
// @resource courseViewAttempt https://cdn.arthals.ink/css/courseViewAttempt.css
// @resource courseToolFrame https://cdn.arthals.ink/css/courseToolFrame.css
// @resource courseToolAlert https://cdn.arthals.ink/css/courseToolAlert.css
// @resource courseToolGrade https://cdn.arthals.ink/css/courseToolGrade.css
// @resource courseToolGradeClass https://cdn.arthals.ink/css/courseToolGradeClass.css
// @resource courseToolGradeItem https://cdn.arthals.ink/css/courseToolGradeItem.css
// @resource courseFileEmbed https://cdn.arthals.ink/css/courseFileEmbed.css
// @resource courseAssignmentUpload https://cdn.arthals.ink/css/courseAssignmentUpload.css
// @resource courseGlobalPage https://cdn.arthals.ink/css/courseGlobalPage.css
// @resource courseGlobalAnnouncement https://cdn.arthals.ink/css/courseGlobalAnnouncement.css
// @resource courseVideoPlay https://cdn.arthals.ink/css/courseVideoPlay.css
// @resource courseVideoPlayFrame https://cdn.arthals.ink/css/courseVideoPlayFrame.css
// @resource courseTask https://cdn.arthals.ink/css/courseTask.css
// @grant GM_getResourceText
// @grant GM_addStyle
// ==/UserScript==
(function () {
    'use strict';
    injectPKUArt();
})()

function injectPKUArt () {
    let htmlpath = location.href;
    const locationTest = [
        {regex: /^https:\/\/iaaa\.pku\.edu\.cn\/\S*$|^https:\/\/course\.pku\.edu\.cn\/\S*$|^https:\/\/onlineroomse\.pku\.edu\.cn\/\S*$/, css: 'main'},
        {regex: /^https:\/\/iaaa\.pku\.edu\.cn\/\S*$|^https:\/\/course\.pku\.edu\.cn\/\S*$|^https:\/\/onlineroomse\.pku\.edu\.cn\/\S*$/, css: 'arco-palette'},
        {regex: /^https:\/\/iaaa\.pku\.edu\.cn\/\S*$/, css: 'iaaaOAuthPage'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\/login\S*$|^https:\/\/course\.pku\.edu\.cn[\/]?$/, css: 'courseLoginPage'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\/?$|^https:\/\/course\.pku\.edu\.cn\/webapps\/portal\/\S*$/, css: 'courseHomePage'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*$/, css: 'courseContent'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\S*announcement\S*$/, css: 'courseAnnouncement'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\S*classinCourseClass\S*$/, css: 'courseClassin'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\S*blankPage\S*$/, css: 'courseBlankPage'},
        {regex: /^https:\/\/course.pku.edu.cn\/webapps\S*videoList\S*$/, css: 'courseVideolist'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\S*((discussionboard)|(groupContentList))\S*$/, css: 'courseOther'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\S*myGrades\S*course_id\S*is_stream=false\S*$/, css: 'courseClassGrade'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\S*listContent\S*$/, css: 'courseListContent'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\S*viewAttempts\S*$/, css: 'courseViewAttempt'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\S*toolId\S*$/, css: 'courseToolFrame'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=alerts\S*$/, css: 'courseToolAlert'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=mygrades\S*$/, css: 'courseToolGrade'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*stream_name=mygrades$/, css: 'courseToolGradeClass'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*stream_name=mygrades_d\S*gradable_item_id\S*$/, css: 'courseToolGradeItem'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*content\/file\?cmd=view\S*$/, css: 'courseFileEmbed'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*assignment\/uploadAssignment\?\S*$/, css: 'courseAssignmentUpload'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*context=mybb\S*$|^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/execute\/announcement$|^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*playVideo\S*$/, css: 'courseGlobalPage'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*announcement\S*context=mybb\S*$|^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/execute\/announcement$/, css: 'courseGlobalAnnouncement'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*playVideo\S*$/, css: 'courseVideoPlay'},
        {regex: /^https:\/\/onlineroomse\.pku\.edu\.cn\/player\?course_id\S*$/, css: 'courseVideoPlayFrame'},
        {regex: /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*taskView\S*$/, css: 'courseTask'}
    ]
    for (let i = 0; i < locationTest.length; i++) {
        if (locationTest[i].regex.test(htmlpath)) {
            GM_addStyle(GM_getResourceText(locationTest[i].css));
            console.log('[PKU Art] Injected ' + locationTest[i].css + ' at ' + new Date().toLocaleString());
        }
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

    // 自动获取m3u8链接 2024/03/23
    const originOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (_, url) {
        if (url.includes(".m3u8")) {
            const xhr = this;
            document.querySelector('#injectDownloadUrlInput').value = url;
            const getter = Object.getOwnPropertyDescriptor(
                XMLHttpRequest.prototype,
                "response"
            ).get;
            Object.defineProperty(xhr, "responseText", {
                get: () => {
                    let result = getter.call(xhr);
                    return result;
                },
            });
        }
        originOpen.apply(this, arguments);
    };

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