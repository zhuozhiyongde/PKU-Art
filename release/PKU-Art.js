// ==UserScript==
// @name         PKU-Art
// @description  给你一个足够好看的教学网
// @version      2.3.0
// @match        *://*.pku.edu.cn/*
// @author       Arthals
// @license      GPL-3.0 license
// @author-blog  https://arthals.ink
// @icon         https://cdn.arthals.ink/Arthals-mcskin.png
// @namespace    https://github.com/zhuozhiyongde/PKU-Art
// @supportURL   https://github.com/zhuozhiyongde/PKU-Art/issues
// @date         2023/03/30
// ==/UserScript==
(function () {
    'use strict';
    injectPKUArt();
})()

function injectPKUArt () {
    let htmlpath = location.href;
    
    if (/^https:\/\/iaaa\.pku\.edu\.cn\/\S*$|^https:\/\/course\.pku\.edu\.cn\/\S*$|^https:\/\/livingroomhqy\.pku\.edu\.cn\/\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/main.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/main.css.");
    }

    if (/^https:\/\/iaaa\.pku\.edu\.cn\/\S*$|^https:\/\/course\.pku\.edu\.cn\/\S*$|^https:\/\/livingroomhqy\.pku\.edu\.cn\/\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/arco-palette.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/arco-palette.css.");
    }

    if (/^https:\/\/iaaa\.pku\.edu\.cn\/\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/iaaaOAuthPage.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/iaaaOAuthPage.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/login\S*$|^https:\/\/course\.pku\.edu\.cn[\/]?$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseLoginPage.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseLoginPage.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/?$|^https:\/\/course\.pku\.edu\.cn\/webapps\/portal\/\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseHomePage.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseHomePage.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseContent.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseContent.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\S*announcement\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseAnnouncement.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseAnnouncement.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*classinCourseClass\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseClassin.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseClassin.css.");
    }

    if (/^https:\/\/course.pku.edu.cn\/webapps\S*videoList\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseVideolist.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseVideolist.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*((discussionboard)|(groupContentList))\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseOther.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseOther.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*myGrades\S*course_id\S*is_stream=false\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseClassGrade.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseClassGrade.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*listContent\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseListContent.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseListContent.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*viewAttempts\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseViewAttempt.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseViewAttempt.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\S*toolId\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseToolFrame.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseToolFrame.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=alerts\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseToolAlert.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseToolAlert.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=mygrades\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseToolGrade.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseToolGrade.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*stream_name=mygrades$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseToolGradeClass.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseToolGradeClass.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*stream_name=mygrades_d\S*gradable_item_id\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseToolGradeItem.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseToolGradeItem.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*content\/file\?cmd=view\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseFileEmbed.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseFileEmbed.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*assignment\/uploadAssignment\?\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseAssignmentUpload.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseAssignmentUpload.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*context=mybb\S*$|^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/execute\/announcement$|^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*playVideo\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseGlobalPage.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseGlobalPage.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*announcement\S*context=mybb\S*$|^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/execute\/announcement$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseGlobalAnnouncement.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseGlobalAnnouncement.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*playVideo\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseVideoPlay.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseVideoPlay.css.");
    }

    if (/^https:\/\/livingroomhqy\.pku\.edu\.cn\/player\?course_id\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseVideoPlayFrame.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseVideoPlayFrame.css.");
    }

    if (/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*taskView\S*$/.test(htmlpath)) {
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink/css/courseTask.css'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink/css/courseTask.css.");
    }

}
(function preventHideSidebar() {
    // function resetSidebar() {
    //     let navigationPane = document.getElementById('navigationPane');
    //     // if its class contains 'navcollapsed' then remove it
    //     if (navigationPane.classList.contains('navcollapsed')) {
    //         navigationPane.classList.remove('navcollapsed');
    //     }
    //     let puller = document.getElementById('menuWrap');
    //     puller.style = '';
    //     let puller_a = document.getElementById('menuPuller');
    //     // prevent its default behavior
    //     puller_a.addEventListener('click', function (e) {
    //         e.preventDefault();
    //     });
    //     // log time
    //     console.log('[PKU Art] sidebar reset at ' + new Date().toLocaleString());
    // }
    // resetSidebar();

    let navigationPane = document.getElementById('navigationPane');
    if (navigationPane.classList.contains('navcollapsed')) {
        // 检查侧边栏是否被隐藏
        const puller = document.getElementById('menuPuller');
        setTimeout(() => {
            puller.click();
            console.log('[PKU Art] sidebar reseted by click ' + new Date().toLocaleString());
        }, 500); // 500ms 后点击侧边栏隐藏按钮，显示侧边栏
    }
})();