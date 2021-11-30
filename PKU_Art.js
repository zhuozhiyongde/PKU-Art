// ==UserScript==
// @name         PKU Art
// @version      1.0
// @description  More concise, more beautiful.
// @author       Arthals/zhuozhiyongde
// @match        *://*.pku.edu.cn/*
// @icon         https://arthals-1307721114.cos.ap-beijing.myqcloud.com/uPic/clover.png
// @grant        none
// ==/UserScript==

(function () {
  // dicLict = ["courseLoginPage", "iaaaOAuthPage", "courseHomePage",
  //     "courseContent", "courseAnnouncementlnClass", "courseGrade",
  //     "courseGradeFirstFrame", "courseGradeSecondFrame", "courseCalendar",
  //     "courseAnnouncementlnHome", "courseAssignment", "courseClassContent",
  //     "courseRecordListPage", "courseOnlineReplyFrame", "courseRecord",
  //     "courseAssignmentUpload"
  // ]
  // 一种别的注入CSS方式，直接在本地，不请求CDN
  // var styleC8 ='';
  //   var injectC8 = document.createElement("style");
  //   injectC8.innerHTML = styleC8;
  //   document.getElementsByTagName("head")[0].appendChild(injectC8);
  "use strict";
  var htmlpath = location.href;

  // courseLoginPage
  if (
    /https:\/\/course.pku.edu.cn\/webapps\/login[\S]*/.test(htmlpath) ||
    /https:\/\/course.pku.edu.cn[\/]?$/.test(htmlpath)
  ) {
    var linkC1 = document.createElement("link");
    linkC1.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@master/SingleCSS/courseLoginPage.css";
    linkC1.rel = "stylesheet";
    linkC1.id = "PKUArtlinkC1";
    linkC1.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC1);
  }

  // iaaaOAuthPage
  if (/https:\/\/iaaa.pku.edu.cn\/[\S]*/.test(htmlpath)) {
    var linkC2 = document.createElement("link");
    linkC2.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@master/SingleCSS/iaaaOAuthPage.css";
    linkC2.rel = "stylesheet";
    linkC2.id = "PKUArtlinkC2";
    linkC2.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC2);
  }

  // courseHomePage
  if (
    /https:\/\/course.pku.edu.cn\/webapps[\/]?$/.test(htmlpath) ||
    /https:\/\/course.pku.edu.cn\/webapps\/portal\/[\S]*/.test(htmlpath)
  ) {
    var linkC3 = document.createElement("link");
    linkC3.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@master/SingleCSS/courseHomePage.css";
    linkC3.rel = "stylesheet";
    linkC3.id = "PKUArtlinkC3";
    linkC3.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC3);
  }

  // courseContent
  if (
    /https:\/\/course.pku.edu.cn\/webapps\/blackboard[\S]*/.test(htmlpath) ||
    /https:\/\/course.pku.edu.cn\/webapps\/discussionboard[\S]*/.test(
      htmlpath
    ) ||
    /https:\/\/course.pku.edu.cn\/webapps\/assignment[\S]*/.test(htmlpath) ||
    /https:\/\/course.pku.edu.cn\/webapps\/bb-streammedia[\S]*/.test(htmlpath)
  ) {
    var linkC4 = document.createElement("link");
    linkC4.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@master/SingleCSS/courseContent.css";
    linkC4.rel = "stylesheet";
    linkC4.id = "PKUArtlinkC4";
    linkC4.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC4);
  }

  // courseAnnouncementlnClass
  if (
    /https:\/\/course.pku.edu.cn\/webapps\/blackboard\/execute\/announcement\?[\S]+context=course_entry[\S]+/.test(
      htmlpath
    ) ||
    /https:\/\/course.pku.edu.cn\/webapps\/blackboard\/execute\/announcement\?[\S]+context=mybb&course_id[\S]+/.test(
      htmlpath
    ) ||
    /https:\/\/course.pku.edu.cn\/webapps\/blackboard\/execute\/announcement\?[\S]+announcementId=&course_id=_[\d]+[\S]+/.test(
      htmlpath
    )
  ) {
    var linkC5 = document.createElement("link");
    linkC5.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@master/SingleCSS/courseAnnouncementlnClass.css";
    linkC5.rel = "stylesheet";
    linkC5.id = "PKUArtlinkC5";
    linkC5.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC5);
  }

  // courseGrade
  if (
    /https:\/\/course.pku.edu.cn\/webapps\/[\S]+MyGrades[\S]+/.test(htmlpath)
  ) {
    var linkC6 = document.createElement("link");
    linkC6.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@master/SingleCSS/courseGrade.css";
    linkC6.rel = "stylesheet";
    linkC6.id = "PKUArtlinkC6";
    linkC6.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC6);
  }

  // courseGradeFirstFrame
  if (
    /https:\/\/course.pku.edu.cn\/webapps\/streamViewer\/streamViewer\?[\S]*/.test(
      htmlpath
    )
  ) {
    var linkC7 = document.createElement("link");
    linkC7.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@master/SingleCSS/courseGradeFirstFrame.css";
    linkC7.rel = "stylesheet";
    linkC7.id = "PKUArtlinkC7";
    linkC7.type = "text/css";
    // document.getElementsByTagName("head")[0].appendChild(linkC7);
  }

  // courseGradeSecondFrame
  if (
    /https:\/\/course.pku.edu.cn\/webapps\/[\S]+myGrades\?course_id=[\S]+/.test(
      htmlpath
    )
  ) {
    var linkC8 = document.createElement("link");
    linkC8.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@master/SingleCSS/courseGradeSecondFrame.css";
    linkC8.rel = "stylesheet";
    linkC8.id = "PKUArtlinkC8";
    linkC8.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC8);
  }

  // courseAnnouncementlnHome
  if (
    /https:\/\/course.pku.edu.cn\/webapps\/blackboard\/execute\/announcement[\/]?/.test(
      htmlpath
    ) ||
    /https:\/\/course.pku.edu.cn\/webapps\/blackboard\/execute\/taskEditList/.test(
      htmlpath
    ) ||
    /https:\/\/course.pku.edu.cn\/webapps\/blackboard\/execute\/announcement\?[\S]+course_id=&[\S]+/.test(
      htmlpath
    ) ||
    /https:\/\/course.pku.edu.cn\/webapps\/blackboard\/execute\/announcement\?[\S]+context=mybb[\S]+/.test(
      htmlpath
    )
  ) {
    var linkC9 = document.createElement("link");
    linkC9.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@master/SingleCSS/courseAnnouncementlnHome.css";
    linkC9.rel = "stylesheet";
    linkC9.id = "PKUArtlinkC9";
    linkC9.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC9);
  }

  // courseAssignment
  if (/https:\/\/course.pku.edu.cn\/webapps\/assignment\//.test(htmlpath)) {
    var linkC10 = document.createElement("link");
    linkC10.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@master/SingleCSS/courseAssignment.css";
    linkC10.rel = "stylesheet";
    linkC10.id = "PKUArtlinkC10";
    linkC10.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC10);
  }

  // courseClassContent
  if (
    /https:\/\/course.pku.edu.cn\/webapps\/blackboard\/execute\/modulepage\//.test(
      htmlpath
    )
  ) {
    var linkC11 = document.createElement("link");
    linkC11.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@master/SingleCSS/courseClassContent.css";
    linkC11.rel = "stylesheet";
    linkC11.id = "PKUArtlinkC11";
    linkC11.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC11);
  }

  // courseRecordListPage
  if (/https:\/\/course.pku.edu.cn\/webapps\/bb-streammedia/.test(htmlpath)) {
    var linkC12 = document.createElement("link");
    linkC12.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@master/SingleCSS/courseRecordListPage.css";
    linkC12.rel = "stylesheet";
    linkC12.id = "PKUArtlinkC12";
    linkC12.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC12);
  }

  // courseOnlineReplyFrame
  if (/https:\/\/livingroomhqy.pku.edu.cn\/player\?/.test(htmlpath)) {
    var linkC13 = document.createElement("link");
    linkC13.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@master/SingleCSS/courseOnlineReplyFrame.css";
    linkC13.rel = "stylesheet";
    linkC13.id = "PKUArtlinkC13";
    linkC13.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC13);
  }

  // courseRecord
  if (
    /https:\/\/course.pku.edu.cn\/webapps\/bb-streammedia[\S]+playVideo.action[\S]+/.test(
      htmlpath
    )
  ) {
    var linkC14 = document.createElement("link");
    linkC14.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@master/SingleCSS/courseRecord.css";
    linkC14.rel = "stylesheet";
    linkC14.id = "PKUArtlinkC14";
    linkC14.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC14);
  }
})();
