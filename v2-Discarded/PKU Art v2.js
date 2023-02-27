// ==UserScript==
// @name        PKU-Art
// @description 给你一个足够好看的教学网。
// @version     2.1
// @match       *://*.pku.edu.cn/*

// @namespace    https://github.com/zhuozhiyongde/PKU-Art
// @author       Arthals
// @license      GPL-3.0 license
// @supportURL   https://github.com/zhuozhiyongde/PKU-Art/issues
// @date         08/08/2022
// ==/UserScript==
(function () {
    // Auto Refresh -- ONLY USED IN TEST ENV
    'use strict';
    // console.log('refreshed');
    // setTimeout(() => {
    //     console.log('reloading');
    //     document.location.reload();
    // }, 60000);
    // let hideElement = document.createElement("style");
    // hideElement.className = "PKU-Art";
    // hideElement.innerHTML = "*{visibility:hidden}";
    // document.documentElement.appendChild(hideElement);
    // document.body.style.visibility = "hidden";

    injectPKUArt();
    // window.onload = () => {
    //     document.body.style.visibility = "visible";
    // }
})();

function injectPKUArt() {
    let htmlpath = location.href;

    // 限定全局样式生效路径
    if (
        /^https:\/\/iaaa\.pku\.edu\.cn\/\S*$/.test(htmlpath) ||
        /^https:\/\/course\.pku\.edu\.cn\/\S*$/.test(htmlpath) ||
        /^https:\/\/livingroomhqy\.pku\.edu\.cn\/\S*$/.test(htmlpath)
    ) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/main.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 限定全局样式生效路径
    if (
        /^https:\/\/iaaa\.pku\.edu\.cn\/\S*$/.test(htmlpath) ||
        /^https:\/\/course\.pku\.edu\.cn\/\S*$/.test(htmlpath) ||
        /^https:\/\/livingroomhqy\.pku\.edu\.cn\/\S*$/.test(htmlpath)
    ) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/arco-palette.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // iaaa登录界面
    if (/^https:\/\/iaaa\.pku\.edu\.cn\/\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement('link');
        // pkuartcss.href =
        //     "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/iaaaOAuthPage.css";
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/iaaaOAuthPage.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 课程网首页
    // courseLoginPage
    if (
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/login\S*$/.test(htmlpath) ||
        /^https:\/\/course\.pku\.edu\.cn[\/]?$/.test(htmlpath)
    ) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseLoginPage.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 首页
    // courseHomePage
    if (
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/?$/.test(htmlpath) ||
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/portal\/\S*$/.test(htmlpath)
    ) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseHomePage.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 课程页面框架
    // courseContent
    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseContent.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 课程通知界面
    // courseAnnouncement
    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\S*announcement\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseAnnouncement.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // ClassIn界面，实际和其他界面差不多
    // courseClassin
    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*classinCourseClass\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseClassin.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 回放界面
    // courseVideolist
    if (/^https:\/\/course.pku.edu.cn\/webapps\S*videoList\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseVideolist.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 其他个人成绩界面
    // courseOther
    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*((discussionboard)|(groupContentList))\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseOther.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 个人成绩界面
    // courseClassGrade
    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*myGrades\S*course_id\S*is_stream=false\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseClassGrade.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 文件列表界面
    // courseListContent
    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*listContent\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseListContent.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 查看尝试界面
    // courseViewAttempt
    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*viewAttempts\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseViewAttempt.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 全局工具界面框架
    // courseToolFrame
    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*toolId\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseToolFrame.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 全局通知界面
    // courseToolAlert
    // https://course.pku.edu.cn/webapps/bb-social-learning-bb_bb60/execute/mybb?cmd=display&toolId=AlertsOnMyBb_____AlertsTool
    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=alerts\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseToolAlert.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 全局成绩界面
    // courseToolGrade
    // https://course.pku.edu.cn/webapps/bb-social-learning-bb_bb60/execute/mybb?cmd=display&toolId=MyGradesOnMyBb_____MyGradesTool
    if (
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=mygrades\S*$/.test(htmlpath)
    ) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseToolGrade.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 课程成绩帧框
    // courseToolGradeClass
    // https://course.pku.edu.cn/webapps/bb-mygrades-bb_bb60/myGrades?course_id=_64001_1&stream_name=mygrades
    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*stream_name=mygrades$/.test(htmlpath)) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseToolGradeClass.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 单一成绩帧框
    // courseToolGradeItem
    // https://course.pku.edu.cn/webapps/bb-mygrades-bb_bb60/myGrades?course_id=_64001_1&stream_name=mygrades_d&gradable_item_id=_194000_1&course_membership_id=_5933797_1
    if (
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*stream_name=mygrades_d\S*gradable_item_id\S*$/.test(
            htmlpath
        )
    ) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseToolGradeItem.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 文件预览界面
    // courseFileEmbed
    // https://course.pku.edu.cn/webapps/blackboard/execute/content/file?cmd=view&content_id=_836702_1&course_id=_64964_1
    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*content\/file\?cmd=view\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseFileEmbed.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 文件上传界面
    // courseAssignmentUpload
    // https://course.pku.edu.cn/webapps/assignment/uploadAssignment?content_id=_862639_1&course_id=_64001_1&group_id=&mode=view

    // 作业复查界面
    // courseAssignmentReview
    // https://course.pku.edu.cn/webapps/assignment/uploadAssignment?content_id=_862403_1&course_id=_64001_1&group_id=&mode=view#
    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*assignment\/uploadAssignment\?\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseAssignmentUpload.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 全局界面
    // courseGlobalPage
    // https://course.pku.edu.cn/webapps/blackboard/execute/announcement?method=search&context=mybb&handle=my_announcements&returnUrl=/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_3_1&tabId=_1_1&forwardUrl=index.jsp
    // https://course.pku.edu.cn/webapps/bb-streammedia-hqy-bb_bb60/playVideo.action?hqyCourseId=33467&hqySubId=776419&kcwybm=21222-012-01233170-0006166248-1
    if (
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*context=mybb\S*$/.test(htmlpath) ||
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/execute\/announcement$/.test(htmlpath) ||
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*playVideo\S*$/.test(htmlpath)
    ) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseGlobalPage.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 全局通知界面
    // courseGlobalAnnouncement
    // https://course.pku.edu.cn/webapps/blackboard/execute/announcement?method=search&context=mybb&handle=my_announcements&returnUrl=/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_3_1&tabId=_1_1&forwardUrl=index.jsp
    if (
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*announcement\S*context=mybb\S*$/.test(htmlpath) ||
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/execute\/announcement$/.test(htmlpath)
    ) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseGlobalAnnouncement.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 回放界面
    // courseVideoPlay
    // https://course.pku.edu.cn/webapps/bb-streammedia-hqy-bb_bb60/playVideo.action?hqyCourseId=33467&hqySubId=776419&kcwybm=21222-012-01233170-0006166248-1
    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*playVideo\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseVideoPlay.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    // 回放帧框
    // courseVideoPlayFrane
    // https://livingroomhqy.pku.edu.cn/player?course_id=33467&sub_id=776419
    if (/^https:\/\/livingroomhqy\.pku\.edu\.cn\/player\?course_id\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement('link');
        pkuartcss.href = 'https://s-bj-2937-artdoge.oss.dogecdn.com/css/courseVideoPlayFrame.css';
        pkuartcss.rel = 'stylesheet';
        pkuartcss.className = 'PKU-Art';
        pkuartcss.type = 'text/css';
        document.documentElement.appendChild(pkuartcss);
    }

    console.log('injected PKU-Art.css');
}
