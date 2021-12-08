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
  // dicLict = ["readMe", "codingHomePage", "codingContent", "codingProblemPage",
  // "codingTable", "courseLoginPage", "iaaaOAuthPage", "courseHomePage",
  // "courseContent", "courseAnnouncementlnClass", "courseGrade",
  // "courseGradeFirstFrame", "courseGradeSecondFrame", "courseCalendar",
  // "courseAnnouncementlnHome", "courseAssignment", "courseClassContent",
  // "courseRecordListPage", "courseOnlineReplyFrame", "courseRecord",
  // "courseAssignmentUpload", "courseGeneral", "courseAlerts",
  // "courseAlertsFirstFrame", "codingProblem", "courseLoginRedirect"
  // ]
  // 一种别的注入CSS方式，直接在本地，不请求CDN，据实验，不比CDN加载快
  // var styleC8 ='';
  //   var injectC8 = document.createElement("style");
  //   injectC8.innerHTML = styleC8;
  //   document.getElementsByTagName("head")[0].appendChild(injectC8);
  "use strict";
  var htmlpath = location.href;
  // codingHomePage
  if (
    /https:\/\/coding.pku.edu.cn\/programming\/+(index.jsp)?$/.test(htmlpath)
  ) {
    var linkP1 = document.createElement("link");
    linkP1.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/codingHomePage.css";
    linkP1.rel = "stylesheet";
    linkP1.id = "PKUArtlinkP1";
    linkP1.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkP1);
  }

  // codingContent
  if (
    /https:\/\/coding.pku.edu.cn\/programming\/course\/[\S]+\/show.do[\S]*/.test(
      htmlpath
    ) ||
    /https:\/\/coding.pku.edu.cn\/programming\/course\/[\S]+\/showProblemList.do?[\S]+/.test(
      htmlpath
    )
  ) {
    var linkP2 = document.createElement("link");
    linkP2.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/codingContent.css";
    linkP2.rel = "stylesheet";
    linkP2.id = "PKUArtlinkP2";
    linkP2.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkP2);
  }

  // codingProblemPage
  if (
    /https:\/\/coding.pku.edu.cn\/programming\/course\/[\S]+\/showProblemList.do\?[\S]+/.test(
      htmlpath
    )
  ) {
    var linkP3 = document.createElement("link");
    linkP3.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/codingProblemPage.css";
    linkP3.rel = "stylesheet";
    linkP3.id = "PKUArtlinkP3";
    linkP3.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkP3);
  }

  // codingTable
  if (
    /https:\/\/coding.pku.edu.cn\/programming\/course\/[\S]+\/showProblemList.do\?[\S]+&tableswitch=true/.test(
      htmlpath
    )
  ) {
    var linkP4 = document.createElement("link");
    linkP4.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/codingTable.css";
    linkP4.rel = "stylesheet";
    linkP4.id = "PKUArtlinkP4";
    linkP4.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkP4);
  }

  // courseLoginPage
  if (
    /https:\/\/course.pku.edu.cn\/webapps\/login[\S]*/.test(htmlpath) ||
    /https:\/\/course.pku.edu.cn[\/]?$/.test(htmlpath)
  ) {
    var linkC1 = document.createElement("link");
    linkC1.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/courseLoginPage.css";
    linkC1.rel = "stylesheet";
    linkC1.id = "PKUArtlinkC1";
    linkC1.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC1);
  }

  // iaaaOAuthPage
  if (/https:\/\/iaaa.pku.edu.cn\/[\S]*/.test(htmlpath)) {
    var linkC2 = document.createElement("link");
    linkC2.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/iaaaOAuthPage.css";
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
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/courseHomePage.css";
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
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/courseContent.css";
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
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/courseAnnouncementlnClass.css";
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
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/courseGrade.css";
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
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/courseGradeFirstFrame.css";
    linkC7.rel = "stylesheet";
    linkC7.id = "PKUArtlinkC7";
    linkC7.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC7);
  }

  // courseGradeSecondFrame
  if (
    /https:\/\/course.pku.edu.cn\/webapps\/[\S]+myGrades\?course_id=[\S]+/.test(
      htmlpath
    )
  ) {
    var linkC8 = document.createElement("link");
    linkC8.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/courseGradeSecondFrame.css";
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
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/courseAnnouncementlnHome.css";
    linkC9.rel = "stylesheet";
    linkC9.id = "PKUArtlinkC9";
    linkC9.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC9);
  }

  // courseAssignment
  if (/https:\/\/course.pku.edu.cn\/webapps\/assignment\//.test(htmlpath)) {
    var linkC10 = document.createElement("link");
    linkC10.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/courseAssignment.css";
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
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/courseClassContent.css";
    linkC11.rel = "stylesheet";
    linkC11.id = "PKUArtlinkC11";
    linkC11.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC11);
  }

  // courseRecordListPage
  if (/https:\/\/course.pku.edu.cn\/webapps\/bb-streammedia/.test(htmlpath)) {
    var linkC12 = document.createElement("link");
    linkC12.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/courseRecordListPage.css";
    linkC12.rel = "stylesheet";
    linkC12.id = "PKUArtlinkC12";
    linkC12.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC12);
  }

  // courseOnlineReplyFrame
  if (/https:\/\/livingroomhqy.pku.edu.cn\/player\?/.test(htmlpath)) {
    var linkC13 = document.createElement("link");
    linkC13.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/courseOnlineReplyFrame.css";
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
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/courseRecord.css";
    linkC14.rel = "stylesheet";
    linkC14.id = "PKUArtlinkC14";
    linkC14.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC14);
  }

  // courseAssignmentUpload
  if (
    /https:\/\/course.pku.edu.cn\/webapps\/assignment\/uploadAssignment\?/.test(
      htmlpath
    )
  ) {
    var linkC15 = document.createElement("link");
    linkC15.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/courseAssignmentUpload.css";
    linkC15.rel = "stylesheet";
    linkC15.id = "PKUArtlinkC15";
    linkC15.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC15);
  }

  // courseGeneral
  if (/https:\/\/course.pku.edu.cn/.test(htmlpath)) {
    var linkC16 = document.createElement("link");
    linkC16.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/courseGeneral.css";
    linkC16.rel = "stylesheet";
    linkC16.id = "PKUArtlinkC16";
    linkC16.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC16);
  }

  // courseAlerts
  if (
    /https:\/\/course.pku.edu.cn\/webapps\/[\S]+AlertsOnMyBb[\S]*/.test(
      htmlpath
    )
  ) {
    var linkC17 = document.createElement("link");
    linkC17.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/courseAlerts.css";
    linkC17.rel = "stylesheet";
    linkC17.id = "PKUArtlinkC17";
    linkC17.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC17);
  }

  // courseAlertsFirstFrame
  if (
    /https:\/\/course.pku.edu.cn\/webapps\/streamViewer\/streamViewer\?[\S]+streamName=alerts[\S]*/.test(
      htmlpath
    )
  ) {
    var linkC18 = document.createElement("link");
    linkC18.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/courseAlertsFirstFrame.css";
    linkC18.rel = "stylesheet";
    linkC18.id = "PKUArtlinkC18";
    linkC18.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC18);
  }

  // codingProblem
  if (/https:\/\/coding.pku.edu.cn\/programming\/problem\//.test(htmlpath)) {
    var linkC19 = document.createElement("link");
    linkC19.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/codingProblem.css";
    linkC19.rel = "stylesheet";
    linkC19.id = "PKUArtlinkC19";
    linkC19.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC19);
  }

  // courseLoginRedirect
  if (
    /https:\/\/course.pku.edu.cn\/webapps\/bb-sso-bb_bb60\/login.html$/.test(
      htmlpath
    )
  ) {
    var linkC20 = document.createElement("link");
    linkC20.href =
      "https://cdn.jsdelivr.net/gh/zhuozhiyongde/PKU-Art@main/SingleCSS/courseLoginRedirect.css";
    linkC20.rel = "stylesheet";
    linkC20.id = "PKUArtlinkC20";
    linkC20.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(linkC20);
  }
})();
