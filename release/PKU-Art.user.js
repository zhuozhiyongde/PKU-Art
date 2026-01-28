// ==UserScript==
// @name         PKU-Art
// @namespace    arthals/pku-art
// @version      2.6.24
// @author       Arthals
// @description  给你一个足够好看的北大网站。
// @license      GPL-3.0 license
// @icon         http://cdn.arthals.ink/Arthals-mcskin.png
// @supportURL   https://github.com/zhuozhiyongde/PKU-Art/issues
// @downloadURL  https://cdn.arthals.ink/release/PKU-Art.user.js
// @updateURL    https://cdn.arthals.ink/release/PKU-Art.user.js
// @match        *://*.pku.edu.cn/*
// @connect      pku.edu.cn
// @grant        GM_addValueChangeListener
// @grant        GM_download
// @grant        GM_getValue
// @grant        GM_setClipboard
// @grant        GM_setValue
// @inject-into  page
// @run-at       document-start
// @author-blog  https://arthals.ink
// @date         2026/01/29
// ==/UserScript==

(function () {
  'use strict';

  const mainStyles = ":root,:root.pku-art-light{--red-1: #ffece8;--red-2: #fdcdc5;--red-3: #fbaca3;--red-4: #f98981;--red-5: #f76560;--red-6: #f53f3f;--red-7: #cb272d;--red-8: #a1151e;--red-9: #770813;--red-10: #4d000a;--orangered-1: #fff3e8;--orangered-2: #fdddc3;--orangered-3: #fcc59f;--orangered-4: #faac7b;--orangered-5: #f99057;--orangered-6: #f77234;--orangered-7: #cc5120;--orangered-8: #a23511;--orangered-9: #771f06;--orangered-10: #4d0e00;--orange-1: #fff7e8;--orange-2: #ffe4ba;--orange-3: #ffcf8b;--orange-4: #ffb65d;--orange-5: #ff9a2e;--orange-6: #ff7d00;--orange-7: #d25f00;--orange-8: #a64500;--orange-9: #792e00;--orange-10: #4d1b00;--gold-1: #fffce8;--gold-2: #fdf4bf;--gold-3: #fce996;--gold-4: #fadc6d;--gold-5: #f9cc45;--gold-6: #f7ba1e;--gold-7: #cc9213;--gold-8: #a26d0a;--gold-9: #774b04;--gold-10: #4d2d00;--yellow-1: #feffe8;--yellow-2: #fefebe;--yellow-3: #fdfa94;--yellow-4: #fcf26b;--yellow-5: #fbe842;--yellow-6: #fadc19;--yellow-7: #cfaf0f;--yellow-8: #a38408;--yellow-9: #785d03;--yellow-10: #4d3800;--lime-1: #fcffe8;--lime-2: #edf8bb;--lime-3: #dcf190;--lime-4: #c9e968;--lime-5: #b5e241;--lime-6: #9fdb1d;--lime-7: #7eb712;--lime-8: #5f940a;--lime-9: #437004;--lime-10: #2a4d00;--green-1: #e8ffea;--green-2: #aff0b5;--green-3: #7be188;--green-4: #4cd263;--green-5: #23c343;--green-6: #00b42a;--green-7: #009a29;--green-8: #008026;--green-9: #006622;--green-10: #004d1c;--cyan-1: #e8fffb;--cyan-2: #b7f4ec;--cyan-3: #89e9e0;--cyan-4: #5edfd6;--cyan-5: #37d4cf;--cyan-6: #14c9c9;--cyan-7: #0da5aa;--cyan-8: #07828b;--cyan-9: #03616c;--cyan-10: #00424d;--blue-1: #e8f7ff;--blue-2: #c3e7fe;--blue-3: #9fd4fd;--blue-4: #7bc0fc;--blue-5: #57a9fb;--blue-6: #3491fa;--blue-7: #206ccf;--blue-8: #114ba3;--blue-9: #063078;--blue-10: #001a4d;--arcoblue-1: #e8f3ff;--arcoblue-2: #bedaff;--arcoblue-3: #94bfff;--arcoblue-4: #6aa1ff;--arcoblue-5: #4080ff;--arcoblue-6: #165dff;--arcoblue-7: #0e42d2;--arcoblue-8: #072ca6;--arcoblue-9: #031a79;--arcoblue-10: #000d4d;--purple-1: #f5e8ff;--purple-2: #ddbef6;--purple-3: #c396ed;--purple-4: #a871e3;--purple-5: #8d4eda;--purple-6: #722ed1;--purple-7: #551db0;--purple-8: #3c108f;--purple-9: #27066e;--purple-10: #16004d;--pinkpurple-1: #ffe8fb;--pinkpurple-2: #f7baef;--pinkpurple-3: #f08ee6;--pinkpurple-4: #e865df;--pinkpurple-5: #e13edb;--pinkpurple-6: #d91ad9;--pinkpurple-7: #b010b6;--pinkpurple-8: #8a0993;--pinkpurple-9: #650370;--pinkpurple-10: #42004d;--magenta-1: #ffe8f1;--magenta-2: #fdc2db;--magenta-3: #fb9dc7;--magenta-4: #f979b7;--magenta-5: #f754a8;--magenta-6: #f5319d;--magenta-7: #cb1e83;--magenta-8: #a11069;--magenta-9: #77064f;--magenta-10: #4d0034;--gray-1: #f7f8fa;--gray-2: #f2f3f5;--gray-3: #e5e6eb;--gray-4: #c9cdd4;--gray-5: #a9aeb8;--gray-6: #86909c;--gray-7: #6b7785;--gray-8: #4e5969;--gray-9: #272e3b;--gray-10: #1d2129}:root.pku-art-dark{--red-1: #4d000a;--red-2: #770611;--red-3: #a1161f;--red-4: #cb2e34;--red-5: #f54e4e;--red-6: #f76965;--red-7: #f98d86;--red-8: #fbb0a7;--red-9: #fdd1ca;--red-10: #fff0ec;--orangered-1: #4d0e00;--orangered-2: #771e05;--orangered-3: #a23714;--orangered-4: #cc5729;--orangered-5: #f77e45;--orangered-6: #f9925a;--orangered-7: #faad7d;--orangered-8: #fcc6a1;--orangered-9: #fddec5;--orangered-10: #fff4eb;--orange-1: #4d1b00;--orange-2: #793004;--orange-3: #a64b0a;--orange-4: #d26913;--orange-5: #ff8d1f;--orange-6: #ff9626;--orange-7: #ffb357;--orange-8: #ffcd87;--orange-9: #ffe3b8;--orange-10: #fff7e8;--gold-1: #4d2d00;--gold-2: #774b04;--gold-3: #a26f0f;--gold-4: #cc961f;--gold-5: #f7c034;--gold-6: #f9cc44;--gold-7: #fadc6c;--gold-8: #fce995;--gold-9: #fdf4be;--gold-10: #fffce8;--yellow-1: #4d3800;--yellow-2: #785e07;--yellow-3: #a38614;--yellow-4: #cfb325;--yellow-5: #fae13c;--yellow-6: #fbe94b;--yellow-7: #fcf374;--yellow-8: #fdfa9d;--yellow-9: #fefec6;--yellow-10: #fefff0;--lime-1: #2a4d00;--lime-2: #447006;--lime-3: #629412;--lime-4: #84b723;--lime-5: #a8db39;--lime-6: #b8e24b;--lime-7: #cbe970;--lime-8: #def198;--lime-9: #eef8c2;--lime-10: #fdffee;--green-1: #004d1c;--green-2: #046625;--green-3: #0a802d;--green-4: #129a37;--green-5: #1db440;--green-6: #27c346;--green-7: #50d266;--green-8: #7ee18b;--green-9: #b2f0b7;--green-10: #ebffec;--cyan-1: #00424d;--cyan-2: #06616c;--cyan-3: #11838b;--cyan-4: #1fa6aa;--cyan-5: #30c9c9;--cyan-6: #3fd4cf;--cyan-7: #66dfd7;--cyan-8: #90e9e1;--cyan-9: #bef4ed;--cyan-10: #f0fffc;--blue-1: #001a4d;--blue-2: #052f78;--blue-3: #134ca3;--blue-4: #2971cf;--blue-5: #469afa;--blue-6: #5aaafb;--blue-7: #7dc1fc;--blue-8: #a1d5fd;--blue-9: #c6e8fe;--blue-10: #eaf8ff;--arcoblue-1: #000d4d;--arcoblue-2: #041b79;--arcoblue-3: #0e32a6;--arcoblue-4: #1d4dd2;--arcoblue-5: #306fff;--arcoblue-6: #3c7eff;--arcoblue-7: #689fff;--arcoblue-8: #93beff;--arcoblue-9: #bedaff;--arcoblue-10: #eaf4ff;--purple-1: #16004d;--purple-2: #27066e;--purple-3: #3e138f;--purple-4: #5a25b0;--purple-5: #7b3dd1;--purple-6: #8e51da;--purple-7: #a974e3;--purple-8: #c59aed;--purple-9: #dfc2f6;--purple-10: #f7edff;--pinkpurple-1: #42004d;--pinkpurple-2: #650370;--pinkpurple-3: #8a0d93;--pinkpurple-4: #b01bb6;--pinkpurple-5: #d92ed9;--pinkpurple-6: #e13ddb;--pinkpurple-7: #e866df;--pinkpurple-8: #f092e6;--pinkpurple-9: #f7c1f0;--pinkpurple-10: #fff2fd;--magenta-1: #4d0034;--magenta-2: #770850;--magenta-3: #a1176c;--magenta-4: #cb2b88;--magenta-5: #f545a6;--magenta-6: #f756a9;--magenta-7: #f97ab8;--magenta-8: #fb9ec8;--magenta-9: #fdc3db;--magenta-10: #ffe8f1;--gray-10: #f7f8fa;--gray-9: #f2f3f5;--gray-8: #e5e6eb;--gray-7: #c9cdd4;--gray-6: #a9aeb8;--gray-5: #86909c;--gray-4: #6b7785;--gray-3: #4e5969;--gray-2: #272e3b;--gray-1: #1d2129}:root{--c-pku: #9b0000;--i-alarm: url(https://cdn.arthals.ink/css/src/alarm-clock.svg);--i-idcard: url(https://cdn.arthals.ink/css/src/id-card-v.svg);--i-tip: url(https://cdn.arthals.ink/css/src/tip.svg);--i-comment: url(https://cdn.arthals.ink/css/src/comment.svg);--i-clover: url(https://cdn.arthals.ink/css/src/clover.svg);--i-sandclock: url(https://cdn.arthals.ink/css/src/sandclock.svg);--i-calendar: url(https://cdn.arthals.ink/css/src/calendar.svg);--i-calendar-tab: url(https://cdn.arthals.ink/css/src/calendar-tab.svg);--i-verified: url(https://cdn.arthals.ink/css/src/verified.svg)}:root,:root.pku-art-light{--c-title: #212121;--c-text: #666;--c-border: #d0d7de;--c-background: #f6f8fa;--c-input-bg: #f6f8fa;--c-card: #fff;--c-hover: rgba(230, 230, 230, .5);--c-focus: #fff;--c-box-shadow: rgba(0, 0, 0, .1) 0px 10px 50px;--c-accent: #9b0000;--c-navbar: #fff;--c-sidebar: #fff;--c-subtitle: #82a3ac;--c-label: #f6f8fa;--c-link: #fcc59f;--c-primary: #165dff;--c-primary-light: #e8f3ff;--c-secondary: #89a2ac;--c-button: #f7f8fa;--c-card-hover: #66ecf331;--c-scrollbar: #c1c1c1;--c-tip: #e5e7eb;--c-title-icon: #333;--c-button-hover: #ffece8;--i-logo: url(https://cdn.arthals.ink/css/src/PKU_Logo.svg);--i-remind: url(https://cdn.arthals.ink/css/src/remind.svg);--i-exit: url(https://cdn.arthals.ink/css/src/exit.svg);--i-watch: url(https://cdn.arthals.ink/css/src/stopwatch-start.svg);--i-file: url(https://cdn.arthals.ink/css/src/file.svg);--i-folder: url(https://cdn.arthals.ink/css/src/folder.svg);--i-link: url(https://cdn.arthals.ink/css/src/link.svg);--i-setting: url(https://cdn.arthals.ink/css/src/setting.svg);--i-check: url(https://cdn.arthals.ink/css/src/check.svg);--i-check-simple: url(https://cdn.arthals.ink/css/src/check-simple.svg);--i-download: url(https://cdn.arthals.ink/css/src/download.svg);--i-warning: url(https://cdn.arthals.ink/css/src/warning.svg);--i-student: url(https://cdn.arthals.ink/css/src/student.svg);--i-refresh: url(https://cdn.arthals.ink/css/src/refresh.svg);--i-search: url(https://cdn.arthals.ink/css/src/search.svg);--i-arrow: url(https://cdn.arthals.ink/css/src/arrow.svg);--i-calendar-day: url(https://cdn.arthals.ink/css/src/calendar-day.svg);--i-calendar-week: url(https://cdn.arthals.ink/css/src/calendar-week.svg);--i-calendar-month: url(https://cdn.arthals.ink/css/src/calendar-month.svg);--i-add: url(https://cdn.arthals.ink/css/src/add.svg);--i-resize: url(https://cdn.arthals.ink/css/src/resize.svg)}:root.pku-art-dark{--c-title: #e2e2e2;--c-text: #bababa;--c-border: #30363d;--c-background: #020409;--c-input-bg: #020409;--c-hover: rgba(29, 33, 41, .5);--c-card: #0e1017;--c-focus: #010409;--c-box-shadow: none;--c-accent: #e44c47;--c-navbar: #171a22;--c-sidebar: #0e1017;--c-subtitle: #86909c;--c-label: #22252d;--c-link: #f9925a;--c-primary: #7dc1fc;--c-primary-light: #262947;--c-secondary: #00879d;--c-button: #22262d;--c-card-hover: rgba(23, 231, 242, .23);--c-scrollbar: #6b6b6b;--c-tip: #22262d;--c-title-icon: #e2e2e2;--c-button-hover: #54121c;--i-logo: url(https://cdn.arthals.ink/css/src/PKU_Logo_Dark.svg);--i-remind: url(https://cdn.arthals.ink/css/src/remind_dark.svg);--i-exit: url(https://cdn.arthals.ink/css/src/exit_dark.svg);--i-watch: url(https://cdn.arthals.ink/css/src/stopwatch-start_dark.svg);--i-file: url(https://cdn.arthals.ink/css/src/file_dark.svg);--i-folder: url(https://cdn.arthals.ink/css/src/folder_dark.svg);--i-link: url(https://cdn.arthals.ink/css/src/link_dark.svg);--i-setting: url(https://cdn.arthals.ink/css/src/setting_dark.svg);--i-check: url(https://cdn.arthals.ink/css/src/check_dark.svg);--i-check-simple: url(https://cdn.arthals.ink/css/src/check-simple_dark.svg);--i-download: url(https://cdn.arthals.ink/css/src/download_dark.svg);--i-warning: url(https://cdn.arthals.ink/css/src/warning_dark.svg);--i-student: url(https://cdn.arthals.ink/css/src/student_dark.svg);--i-refresh: url(https://cdn.arthals.ink/css/src/refresh_dark.svg);--i-search: url(https://cdn.arthals.ink/css/src/search_dark.svg);--i-arrow: url(https://cdn.arthals.ink/css/src/arrow_dark.svg);--i-calendar-day: url(https://cdn.arthals.ink/css/src/calendar-day_dark.svg);--i-calendar-week: url(https://cdn.arthals.ink/css/src/calendar-week_dark.svg);--i-calendar-month: url(https://cdn.arthals.ink/css/src/calendar-month_dark.svg);--i-add: url(https://cdn.arthals.ink/css/src/add_dark.svg);--i-resize: url(https://cdn.arthals.ink/css/src/resize_dark.svg)}body,html{background:var(--c-background)!important}*{outline:none!important}@keyframes fadeInUpTransition{0%{opacity:0;-webkit-transform:translateY(100px);transform:translateY(100px)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInUpStablePixel{0%{opacity:0;-webkit-transform:translateY(200px);transform:translateY(200px)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInUpStablePixelForContentBox{0%{margin-left:min(25%,300px);opacity:0;-webkit-transform:translateY(200px);transform:translateY(200px)}to{margin-left:min(25%,300px);opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInLeftStablePixel{0%{color:#fff;transform:translate(-72px);-webkit-transform:translateX(-72px)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes tracking-in-expand{0%{letter-spacing:-.5em;opacity:0}40%{opacity:.6}to{opacity:1}}::-webkit-scrollbar{width:10px;height:10px}::-webkit-scrollbar-track{background-color:transparent}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background-color:var(--c-scrollbar);border-radius:9999px}.pku-art-theme-toggle-bar{display:flex;align-items:center;justify-content:center}.pku-art-theme-toggle{width:32px;height:32px;padding:0;margin:0;border:none;border-radius:8px;background-color:transparent;cursor:pointer;line-height:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;transition:background-color .2s ease,box-shadow .2s ease,color .2s ease;position:relative;touch-action:manipulation;display:flex;align-items:center;justify-content:center;color:var(--c-title-icon)}.pku-art-theme-toggle:hover,.pku-art-theme-toggle:focus-visible{background-color:var(--c-hover)}.pku-art-theme-toggle svg{width:28px;height:28px;display:block}.pku-art-theme-toggle[data-mode=light]:hover{color:#fdb022}.pku-art-theme-toggle[data-mode=dark]:hover{color:#7dc1fc}.pku-art-theme-toggle[data-mode=auto]:hover{color:var(--gray-5)}";
  const arcoPaletteStyles = ":root,:root.pku-art-light{--red-1: #ffece8;--red-2: #fdcdc5;--red-3: #fbaca3;--red-4: #f98981;--red-5: #f76560;--red-6: #f53f3f;--red-7: #cb272d;--red-8: #a1151e;--red-9: #770813;--red-10: #4d000a;--orangered-1: #fff3e8;--orangered-2: #fdddc3;--orangered-3: #fcc59f;--orangered-4: #faac7b;--orangered-5: #f99057;--orangered-6: #f77234;--orangered-7: #cc5120;--orangered-8: #a23511;--orangered-9: #771f06;--orangered-10: #4d0e00;--orange-1: #fff7e8;--orange-2: #ffe4ba;--orange-3: #ffcf8b;--orange-4: #ffb65d;--orange-5: #ff9a2e;--orange-6: #ff7d00;--orange-7: #d25f00;--orange-8: #a64500;--orange-9: #792e00;--orange-10: #4d1b00;--gold-1: #fffce8;--gold-2: #fdf4bf;--gold-3: #fce996;--gold-4: #fadc6d;--gold-5: #f9cc45;--gold-6: #f7ba1e;--gold-7: #cc9213;--gold-8: #a26d0a;--gold-9: #774b04;--gold-10: #4d2d00;--yellow-1: #feffe8;--yellow-2: #fefebe;--yellow-3: #fdfa94;--yellow-4: #fcf26b;--yellow-5: #fbe842;--yellow-6: #fadc19;--yellow-7: #cfaf0f;--yellow-8: #a38408;--yellow-9: #785d03;--yellow-10: #4d3800;--lime-1: #fcffe8;--lime-2: #edf8bb;--lime-3: #dcf190;--lime-4: #c9e968;--lime-5: #b5e241;--lime-6: #9fdb1d;--lime-7: #7eb712;--lime-8: #5f940a;--lime-9: #437004;--lime-10: #2a4d00;--green-1: #e8ffea;--green-2: #aff0b5;--green-3: #7be188;--green-4: #4cd263;--green-5: #23c343;--green-6: #00b42a;--green-7: #009a29;--green-8: #008026;--green-9: #006622;--green-10: #004d1c;--cyan-1: #e8fffb;--cyan-2: #b7f4ec;--cyan-3: #89e9e0;--cyan-4: #5edfd6;--cyan-5: #37d4cf;--cyan-6: #14c9c9;--cyan-7: #0da5aa;--cyan-8: #07828b;--cyan-9: #03616c;--cyan-10: #00424d;--blue-1: #e8f7ff;--blue-2: #c3e7fe;--blue-3: #9fd4fd;--blue-4: #7bc0fc;--blue-5: #57a9fb;--blue-6: #3491fa;--blue-7: #206ccf;--blue-8: #114ba3;--blue-9: #063078;--blue-10: #001a4d;--arcoblue-1: #e8f3ff;--arcoblue-2: #bedaff;--arcoblue-3: #94bfff;--arcoblue-4: #6aa1ff;--arcoblue-5: #4080ff;--arcoblue-6: #165dff;--arcoblue-7: #0e42d2;--arcoblue-8: #072ca6;--arcoblue-9: #031a79;--arcoblue-10: #000d4d;--purple-1: #f5e8ff;--purple-2: #ddbef6;--purple-3: #c396ed;--purple-4: #a871e3;--purple-5: #8d4eda;--purple-6: #722ed1;--purple-7: #551db0;--purple-8: #3c108f;--purple-9: #27066e;--purple-10: #16004d;--pinkpurple-1: #ffe8fb;--pinkpurple-2: #f7baef;--pinkpurple-3: #f08ee6;--pinkpurple-4: #e865df;--pinkpurple-5: #e13edb;--pinkpurple-6: #d91ad9;--pinkpurple-7: #b010b6;--pinkpurple-8: #8a0993;--pinkpurple-9: #650370;--pinkpurple-10: #42004d;--magenta-1: #ffe8f1;--magenta-2: #fdc2db;--magenta-3: #fb9dc7;--magenta-4: #f979b7;--magenta-5: #f754a8;--magenta-6: #f5319d;--magenta-7: #cb1e83;--magenta-8: #a11069;--magenta-9: #77064f;--magenta-10: #4d0034;--gray-1: #f7f8fa;--gray-2: #f2f3f5;--gray-3: #e5e6eb;--gray-4: #c9cdd4;--gray-5: #a9aeb8;--gray-6: #86909c;--gray-7: #6b7785;--gray-8: #4e5969;--gray-9: #272e3b;--gray-10: #1d2129}:root.pku-art-dark{--red-1: #4d000a;--red-2: #770611;--red-3: #a1161f;--red-4: #cb2e34;--red-5: #f54e4e;--red-6: #f76965;--red-7: #f98d86;--red-8: #fbb0a7;--red-9: #fdd1ca;--red-10: #fff0ec;--orangered-1: #4d0e00;--orangered-2: #771e05;--orangered-3: #a23714;--orangered-4: #cc5729;--orangered-5: #f77e45;--orangered-6: #f9925a;--orangered-7: #faad7d;--orangered-8: #fcc6a1;--orangered-9: #fddec5;--orangered-10: #fff4eb;--orange-1: #4d1b00;--orange-2: #793004;--orange-3: #a64b0a;--orange-4: #d26913;--orange-5: #ff8d1f;--orange-6: #ff9626;--orange-7: #ffb357;--orange-8: #ffcd87;--orange-9: #ffe3b8;--orange-10: #fff7e8;--gold-1: #4d2d00;--gold-2: #774b04;--gold-3: #a26f0f;--gold-4: #cc961f;--gold-5: #f7c034;--gold-6: #f9cc44;--gold-7: #fadc6c;--gold-8: #fce995;--gold-9: #fdf4be;--gold-10: #fffce8;--yellow-1: #4d3800;--yellow-2: #785e07;--yellow-3: #a38614;--yellow-4: #cfb325;--yellow-5: #fae13c;--yellow-6: #fbe94b;--yellow-7: #fcf374;--yellow-8: #fdfa9d;--yellow-9: #fefec6;--yellow-10: #fefff0;--lime-1: #2a4d00;--lime-2: #447006;--lime-3: #629412;--lime-4: #84b723;--lime-5: #a8db39;--lime-6: #b8e24b;--lime-7: #cbe970;--lime-8: #def198;--lime-9: #eef8c2;--lime-10: #fdffee;--green-1: #004d1c;--green-2: #046625;--green-3: #0a802d;--green-4: #129a37;--green-5: #1db440;--green-6: #27c346;--green-7: #50d266;--green-8: #7ee18b;--green-9: #b2f0b7;--green-10: #ebffec;--cyan-1: #00424d;--cyan-2: #06616c;--cyan-3: #11838b;--cyan-4: #1fa6aa;--cyan-5: #30c9c9;--cyan-6: #3fd4cf;--cyan-7: #66dfd7;--cyan-8: #90e9e1;--cyan-9: #bef4ed;--cyan-10: #f0fffc;--blue-1: #001a4d;--blue-2: #052f78;--blue-3: #134ca3;--blue-4: #2971cf;--blue-5: #469afa;--blue-6: #5aaafb;--blue-7: #7dc1fc;--blue-8: #a1d5fd;--blue-9: #c6e8fe;--blue-10: #eaf8ff;--arcoblue-1: #000d4d;--arcoblue-2: #041b79;--arcoblue-3: #0e32a6;--arcoblue-4: #1d4dd2;--arcoblue-5: #306fff;--arcoblue-6: #3c7eff;--arcoblue-7: #689fff;--arcoblue-8: #93beff;--arcoblue-9: #bedaff;--arcoblue-10: #eaf4ff;--purple-1: #16004d;--purple-2: #27066e;--purple-3: #3e138f;--purple-4: #5a25b0;--purple-5: #7b3dd1;--purple-6: #8e51da;--purple-7: #a974e3;--purple-8: #c59aed;--purple-9: #dfc2f6;--purple-10: #f7edff;--pinkpurple-1: #42004d;--pinkpurple-2: #650370;--pinkpurple-3: #8a0d93;--pinkpurple-4: #b01bb6;--pinkpurple-5: #d92ed9;--pinkpurple-6: #e13ddb;--pinkpurple-7: #e866df;--pinkpurple-8: #f092e6;--pinkpurple-9: #f7c1f0;--pinkpurple-10: #fff2fd;--magenta-1: #4d0034;--magenta-2: #770850;--magenta-3: #a1176c;--magenta-4: #cb2b88;--magenta-5: #f545a6;--magenta-6: #f756a9;--magenta-7: #f97ab8;--magenta-8: #fb9ec8;--magenta-9: #fdc3db;--magenta-10: #ffe8f1;--gray-10: #f7f8fa;--gray-9: #f2f3f5;--gray-8: #e5e6eb;--gray-7: #c9cdd4;--gray-6: #a9aeb8;--gray-5: #86909c;--gray-4: #6b7785;--gray-3: #4e5969;--gray-2: #272e3b;--gray-1: #1d2129}";
  const iaaaOAuthPageStyles = '.top,.bottom{display:none}.main{display:flex;flex-direction:column;justify-content:center;background:transparent}.mid{background-image:none!important;display:flex;justify-content:center}.single_col_panel{margin-top:20vh;display:flex;height:max(fit-content,400px);width:300px!important;align-items:center;flex-direction:column;box-shadow:var(--c-box-shadow);background-color:var(--c-card);background-image:var(--i-logo);border:1px solid var(--c-border);background-size:50%;background-position:top center;background-position-y:25px;background-repeat:no-repeat;float:none;border-radius:10px;padding:90px 20px 20px;text-align:center}.row .row-title{border-bottom:1px solid var(--c-border)}.row .row-title a{color:var(--c-text)}.row .row-title .current{color:var(--c-accent)}input:nth-last-child(n+2){background-color:var(--c-input-bg);border:1px solid var(--c-border);color:var(--c-text)}input:nth-last-child(n+2):focus{background-color:transparent;border:2px solid var(--c-accent)}input[type=submit]{background-color:var(--c-accent)}#remember_text{margin-top:4px;color:var(--c-text)!important}#remember_text.pku-art-remember-toggle{display:flex;align-items:center;justify-content:center;text-align:center;width:100%;gap:8px;cursor:pointer;-webkit-user-select:none;user-select:none;font-size:13px}#remember_text.pku-art-remember-toggle>i{position:absolute;width:0;height:0;overflow:hidden}#remember_text.pku-art-remember-toggle .pku-art-remember-icon{width:16px;height:16px;border-radius:3px;border:1px solid var(--c-border);background:var(--c-input-bg);display:inline-flex;align-items:center;justify-content:center;transition:border-color .08s ease,background-color .08s ease;flex-shrink:0}#remember_text.pku-art-remember-toggle .pku-art-remember-icon:after{content:"";width:10px;height:10px;mask-image:var(--i-check-simple);-webkit-mask-image:var(--i-check-simple);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:#fff;opacity:0;transition:opacity .08s ease}#remember_text.pku-art-remember-toggle.is-checked .pku-art-remember-icon{border-color:var(--c-accent);background:var(--c-accent)}#remember_text.pku-art-remember-toggle.is-checked .pku-art-remember-icon:after{opacity:1}.pku-art-remember-checkbox{position:absolute!important;opacity:0!important;pointer-events:none!important;width:0!important;height:0!important}div:has(>input#user_name):before{content:"账号";display:block;height:25px;position:absolute;top:-30px;left:0;font:700 13pt arial,sans-serif;text-align:left;margin-left:5px;margin-bottom:3px;color:var(--c-title)}div:has(>input#password):before{content:"密码";display:block;position:absolute;top:-30px;left:0;font:700 13pt arial,sans-serif;text-align:left;margin-left:5px;margin-bottom:3px;color:var(--c-title)}div:has(>input#user_name),div:has(>input#password){position:relative;margin-top:35px;display:flex;align-items:center;justify-content:center}.fa.fa-times-circle{display:none}.pad-tip{color:var(--c-title);font-weight:400}input[type=password]::placeholder,input[type=text]::placeholder{color:transparent}input{border-radius:6px!important;height:40px!important;box-sizing:border-box}#msg{display:flex;justify-content:center;text-align:center;width:100%;color:var(--c-accent)}';
  const courseLoginPageStyles = '.container>div:nth-child(1),.ad,#footer,iframe{display:none}.container{background:none;width:fit-content;height:fit-content}.container>div{padding:0!important;display:flex;justify-content:center}#login form{padding:0!important}#login{background:none;display:flex;justify-content:center;align-items:center;margin:0;padding:0;height:fit-content}body>div>div>#login>form :not(:first-child){display:none}body>div>div>#login>form{width:100%;height:10px;display:block;text-align:center!important;margin-top:min(20vh,300px)}.login_stu{background-color:var(--c-card);border:1px solid var(--c-border);background-image:var(--i-logo);background-size:50%;background-position:top center;background-position-y:20px;background-repeat:no-repeat;float:none;border-radius:10px;margin:0 auto!important;width:200px!important;height:100px;padding:10px;text-align:center;box-shadow:var(--c-box-shadow)}.login_stu a:before{display:block;content:"";color:#0000;height:1px;width:200px;margin:0 auto;background-color:var(--c-border);position:relative;bottom:17px}.login_stu a{display:block;margin:2px auto;width:100%;height:25px;text-decoration:none;padding-top:5px;color:#fff;position:relative;top:65px;background-color:var(--c-accent);border-radius:10px;font-size:10pt}';
  const courseHomePageStyles = 'body{position:relative}.brandingImgWrap,#appTabList>tbody>tr,.hideoff,#quick_links_wrap,#global-avatar,#global-toggle-img{display:none}#global-nav-link,#global-nav-link:hover,#global-nav-link:focus{overflow:hidden;color:transparent;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-remind);background-size:80%;background-repeat:no-repeat;background-position:center center;border:none;outline:none}#global-nav-link>#badgeTotal>.badge{top:0!important;right:0!important;border-radius:3px;background-color:var(--c-accent);color:#fff}.global-nav-bar.logout a.logout-link,.global-nav-bar.logout a.logout-link:hover,.global-nav-bar.logout a.logout-link:focus{color:transparent;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-exit);background-size:80%;background-repeat:no-repeat;background-position:center center}.container,.locationPane{background-color:var(--c-background)}#globalNavPageNavArea{position:fixed;width:100%;z-index:30}.tabWrapper-right,#globalNavPageNavArea,#topTabs{background-color:var(--c-navbar)}#globalNavPageNavArea{padding:1em 140px 1em 0;height:60px;box-sizing:border-box;display:flex;text-align:right;justify-content:flex-end;flex-direction:row;background-image:var(--i-logo);background-repeat:no-repeat;background-size:auto 30px;background-position:2em center;border-bottom:1px solid var(--c-border)}.tabWrapper-right,.bouncer[role=presentation]{width:fit-content}.global-nav-bar-wrap{position:fixed;right:50px;display:flex;justify-content:flex-end;flex-direction:row-reverse;background-color:var(--c-navbar);width:100px;height:60px;box-sizing:border-box;margin:0;padding:0;border-bottom:1px solid var(--c-border)}.global-nav-bar{margin:0;float:none;height:60px;display:flex;flex-direction:row-reverse;justify-content:center;align-items:center}.global-nav-bar:not(:first-child){margin:0 5px}.topTabs .tabWrapper-right{height:fit-content;padding:0}#globalNavPageNavArea a,#globalNavPageNavArea td{padding:0!important}#globalNavPageContentArea,.locationPane,.contentPaneWide,#content,#content>div,#content>div>div,#content>div>div>div,#content>div>div>div>div{height:fit-content;min-height:100vh;padding:0}.container{margin:0;padding:0;border:none;height:fit-content}.containerPortal{display:flex;flex-direction:row}.locationPane .paneTabs{position:absolute;display:none}#column0{margin:60px 0 0;background-color:var(--c-sidebar);border-right:1px solid var(--c-border);width:min(25%,300px)!important;position:fixed;height:100%}#column0:after{content:"PKU Art @ Arthals";display:block;background-color:var(--c-sidebar);position:absolute;bottom:80px;left:50%;transform:translate(-50%);color:var(--c-text);height:20px;z-index:99999;opacity:.3;visibility:visible!important}html #global-nav-bar-wrap{display:flex;justify-content:flex-end}.clearfix:after,.clearfixParent>div:after,.clearfixParent>li:after{display:none}.portlet{padding:1em;background-color:var(--c-sidebar)}#column0>div:first-child h2{background-color:var(--c-sidebar);font-size:14pt;color:var(--c-title)}#column0>div:first-child{border:none}#column0>div:first-child h2:after{z-index:1;content:"";color:transparent;visibility:visible;display:block;height:10px;position:relative;top:5px;width:60px;border-radius:50px;background-color:var(--c-accent)}#column0>div:first-child div.collapsible{border:none}.portlet .portletList li{border-top:none}.portlet .portletList-img>li{border:none}.portlet .portletList li a{position:relative;color:var(--c-text);font-size:11pt}.portlet .portletList li a:hover{color:var(--red-5)}.portlet .portletList li a:after{content:"";color:transparent;visibility:visible!important;position:absolute;border-bottom:2px solid var(--red-5);border-radius:2px;bottom:-2px;left:100%;width:0;-webkit-transition:width .35s,left .35s;-moz-transition:width .35s,left .35s;transition:width .35s,left .35s}.portlet .portletList li a:hover:after{visibility:visible!important;left:0;width:100%;-webkit-transition:width .35s;-moz-transition:width .35s;transition:width .35s}#column0>div:not(:first-child){display:none}#column0{-webkit-animation:fadeInLeftStablePixel 1s cubic-bezier(.25,.46,.45,.94) forwards;animation:fadeInLeftStablePixel 1s cubic-bezier(.25,.46,.45,.94) forwards}#column1,#column2{-webkit-animation:fadeInUpStablePixel 1s cubic-bezier(.25,.46,.45,.94) forwards;animation:fadeInUpStablePixel 1s cubic-bezier(.25,.46,.45,.94) forwards}#column1{margin-left:calc(min(25%,300px) + 1rem)!important}#column1,#column2{margin-top:60px;margin-left:1em;height:fit-content}#column1 .portlet,#column2 .portlet{border:1px solid var(--c-border);border-radius:5px;background-color:var(--c-card);margin-top:1em}.portlet h2{font-size:14pt;background-color:transparent;color:var(--c-title);border:none}.containerPortal>div:not(:first-child) .portlet .portletList-img>li{padding:7px 10px!important;border-radius:5px;margin-bottom:.25em;position:relative}.collapsible{border-top:none}.containerPortal>div:not(:first-child) .portlet .portletList-img>li:hover{background-color:var(--c-hover)}.containerPortal>div:not(:first-child) .portlet .portletList-img>li>a{display:block;color:var(--c-subtitle);font-size:11pt}.containerPortal>div:not(:first-child) .portlet .portletList-img>li>a:hover{color:var(--blue-5)}.portlet .noItems{text-align:left}#column2 .collapsible div,#column2 .collapsible h3,#column2 .collapsible a,.portlet h3{font-style:normal;color:var(--c-text)}#vertical_container,#bottomButtons{display:none}#global-nav-tools{z-index:9999;height:inherit!important}#global-nav-flyout{box-shadow:none;border-radius:5px;width:40px!important;height:150px!important;transform:translateY(34px);background-color:transparent}#global-nav-tools{background-color:transparent}#global-list-tools{margin:0;box-shadow:var(--c-box-shadow);border:1px solid var(--c-border);padding:5px;border-radius:5px;background-color:var(--c-card)}#global-list-tools>.overview,#global-list-tools>.stream,#global-list-tools>.risktracker{display:none}#global-list-tools>.alerts,#global-list-tools>.grade,#global-list-tools>.calendar{background-color:var(--c-card)}#global-list-tools>.alerts>a:hover,#global-list-tools>.grades>a:hover,#global-list-tools>.calendar>a:hover,#global-list-tools>.more-link a:hover{background-color:var(--c-hover)}#global-list-tools>.alerts>a{border-radius:5px;background:var(--i-alarm);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.grades>a{border-radius:5px;background:var(--i-idcard);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.calendar>a{border-radius:5px;background:var(--i-calendar-tab);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.more-link>a{border-radius:5px;background:var(--i-idcard);background-size:60%;background-repeat:no-repeat;background-position:center center}#global-more-tools{display:none!important}.mybb-tools li a{opacity:1;background-color:var(--c-card)}.mybb-tools li a:focus,.mybb-tools li a:focus img{outline:none}div.edit_controls>a:before,div.edit_controls>a:hover:before{background:var(--i-setting);background-repeat:no-repeat;background-size:contain;color:transparent}';
  const courseContentStyles = 'body{position:relative;display:flex;flex-direction:column;min-height:100%}.brandingImgWrap,#appTabList>tbody>tr,.hideoff,#quick_links_wrap,#global-avatar,#global-toggle-img{display:none!important}#global-nav-link>*{display:none}#global-nav-link,#global-nav-link:hover,#global-nav-link:focus{color:transparent;overflow:hidden;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-remind)!important;background-size:80%;background-repeat:no-repeat;background-position:center center;border:none;outline:none}.global-nav-bar a.logout-link,.global-nav-bar a.logout-link:hover,.global-nav-bar a.logout-link:focus{color:transparent;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-exit)!important;background-size:80%;background-repeat:no-repeat!important;background-position:center center!important}.container,.locationPane,.contentPane,.contentBox{background-color:var(--c-background)}#containerdiv{border:none}.tabWrapper-right,#globalNavPageNavArea,#topTabs{background-color:var(--c-navbar)!important}#globalNavPageNavArea{padding:1em 140px 1em 0;height:60px;box-sizing:border-box;display:flex;text-align:right;justify-content:flex-end;flex-direction:row;background:var(--c-navbar) var(--i-logo) no-repeat 2em center / auto 30px!important;border-bottom:1px solid var(--c-border);position:fixed;width:100%;z-index:30}.tabWrapper-right,.bouncer[role=presentation]{width:fit-content}body .global-nav-bar-wrap{position:fixed;right:50px;display:flex;justify-content:flex-end;flex-direction:row-reverse;background-color:var(--c-navbar);width:100px;height:60px;box-sizing:border-box;margin:0;padding:0;border-bottom:1px solid var(--c-border)}.global-nav-bar{margin:0;float:none!important;height:60px!important;display:flex;flex-direction:row-reverse;justify-content:center;align-items:center}.global-nav-bar:not(:first-child){margin:0 5px}table.bouncer,.appTabs td.active,.appTabs a:hover span,.appTabs a:focus span{border:none}.topTabs .tabWrapper-right{height:fit-content;padding:0}#globalNavPageNavArea a,#globalNavPageNavArea td{padding:0!important}#breadcrumbs{float:right;width:calc(100% - min(25%,300px));padding:1.2em 1em 1em;box-sizing:border-box;height:80px;margin-bottom:1em;margin-top:60px;z-index:10;color:var(--c-title);background-color:var(--c-background);display:flex;text-align:center;justify-content:center;border:none}#breadcrumbs .coursePath{padding:0;margin:0;border-right:none}#breadcrumbs .coursePath .courseArrow a{height:1em;width:1em;background:var(--i-arrow) no-repeat center center;background-size:100%}body>div.cmdiv{border-color:var(--c-border);background:var(--c-card);max-height:30em;width:20em;overflow:hidden auto;border-radius:.6em;padding:.5em;box-shadow:0 20px 25px -5px #0000001a,0 8px 10px -6px #0000001a}body>div.cmdiv ul{width:100%;padding:.6em 0;margin:0;border-top:var(--c-border) solid 1px}body>div.cmdiv ul:first-child{display:none}body>div.cmdiv ul:nth-child(2){border-top:none;padding-top:0}body>div.cmdiv ul:last-child{padding-bottom:0}body>div.cmdiv ul li span.labelMenuItem{margin-left:.6em;color:var(--c-title)}body>div.cmdiv ul li a{padding:.6em;color:var(--c-subtitle);font-weight:700;font-size:1rem}body>div.cmdiv ul li a:hover{color:var(--blue-5);background-color:var(--c-hover)}#breadcrumb_controls_id,#breadcrumbs li:not([class*=coursePath]){display:none}#breadcrumbs span{font-size:18pt;color:var(--c-title);-webkit-animation:tracking-in-expand .7s cubic-bezier(.215,.61,.355,1) both;animation:tracking-in-expand .7s cubic-bezier(.215,.61,.355,1) both}#globalNavPageContentArea{flex-grow:1}.locationPane{min-height:100%}#globalNavPageNavArea{flex-shrink:0}nav.navigationPane{height:100%;transition:none!important}nav.navigationPane:after{content:"PKU Art @ Arthals";display:block;background-color:var(--c-sidebar);position:absolute;bottom:80px;left:50%;transform:translate(-50%);color:var(--c-text);height:20px;z-index:99999;opacity:.3;visibility:visible!important}.locationPane nav{width:min(25%,300px)!important;position:fixed;margin-top:60px}#menuWrap{border-right:1px solid var(--c-border)}#menuWrap>#puller{display:none}.navcollapsed{margin-left:0}#menuWrap,.navPaletteContent,#courseMenuPalette_contents li,#courseMenuPalette div.navPaletteContent{background-color:var(--c-sidebar)!important;border-top:none}#menuWrap .navPalette.tools{border-top:none}.actionBarMicro,li.divider,#copyright,#menuWrap li>hr{display:none!important}#courseMenuPalette_contents li *{color:var(--c-text)!important;font-size:11pt}#menuWrap a[title]{background:none;font-size:12pt;font-weight:700!important;color:var(--c-title)}#courseMenuPalette_paletteTitleHeading h3{background:none!important;border-left:6px solid var(--c-accent)}#menuWrap li a,#menuWrap li span{background:none!important}#menuWrap span{color:var(--c-text);font-size:11pt}#menuWrap a[title]:before,#menuWrap .submenuLink,#menuWrap .submenuLink_active{display:none}#menuWrap h3.navPaletteCol>a{border-left:4px solid var(--c-accent);margin-left:10px;padding-left:16px}#menuWrap>.menuWrap-inner a:hover,#menuWrap>.menuWrap-inner span:not(.reorder):hover{color:var(--red-5)!important;text-decoration:none}#menuWrap h3 a:hover{background-color:var(--c-hover);transition:all ease-in-out .15s}#menuWrap a span{display:inline;position:relative}#menuWrap a span:nth-child(1):after{content:"";color:transparent;visibility:visible!important;position:absolute;border-bottom:2px solid var(--red-5);border-radius:2px;bottom:-2px;left:100%;width:0;-webkit-transition:width .35s,left .35s;-moz-transition:width .35s,left .35s;transition:width .35s,left .35s}#menuWrap a span:nth-child(1):hover:after{visibility:visible!important;left:0;width:100%;-webkit-transition:width .35s;-moz-transition:width .35s;transition:width .35s}.navPalette.tools{border:none}#globalNavPageContentArea .locationPane{background-color:var(--c-background)}.contentPane .shadow{border:none!important;background-color:var(--c-background)}#pageTitleDiv{margin:0!important}#contentPanel{z-index:10;margin-top:60px;margin-left:min(25%,300px)}#content{width:min(100%,1200px);margin:0 auto}#contentPanel{-webkit-animation:fadeInUpStablePixelForContentBox .7s cubic-bezier(.215,.61,.355,1) both;animation-delay:.5s;animation:fadeInUpStablePixelForContentBox .7s cubic-bezier(.215,.61,.355,1) both}.localViewToggle{display:none}#pageTitleHeader{color:var(--blue-7)!important;background-color:var(--blue-2);padding:.3em 1em;border-radius:5px;font-size:20px!important}#pageTitleHeader *{color:var(--blue-7)!important}#pageTitleText{font-weight:700}#vertical_container,#bottomButtons{display:none}#global-nav-tools{z-index:9999;height:inherit!important}#global-nav-flyout{box-shadow:none;border-radius:5px;width:40px!important;height:150px!important;transform:translateY(34px);background-color:transparent}#global-nav-tools{background-color:transparent}#global-list-tools{margin:0!important;box-shadow:var(--c-box-shadow);border:1px solid var(--c-border);padding:5px;border-radius:5px;background-color:var(--c-card)}#global-list-tools>.overview,#global-list-tools>.stream,#global-list-tools>.risktracker{display:none}#global-list-tools>.alerts,#global-list-tools>.grade,#global-list-tools>.calendar{background-color:var(--c-card)}#global-list-tools>.alerts>a:hover,#global-list-tools>.grades>a:hover,#global-list-tools>.calendar>a:hover{background-color:var(--c-hover)}#global-list-tools>.alerts>a{border-radius:5px;background:var(--i-alarm);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.grades>a{border-radius:5px;background:var(--i-idcard);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.calendar>a{border-radius:5px;background:var(--i-calendar-tab);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.more-link>a{border-radius:5px;background:var(--i-idcard);background-size:60%;background-repeat:no-repeat;background-position:center center}#global-more-tools{display:none!important}.mybb-tools li a{opacity:1;background-color:var(--c-card)}.mybb-tools li a:focus,.mybb-tools li a:focus img{outline:none}#pageList a.individualContent-link{background-color:transparent!important;background:linear-gradient(180deg,transparent 90%,var(--red-2) 90%)!important}#pageList a.individualContent-link span{text-decoration:none;color:var(--c-text)!important}#pageList .liItem,#pageList .buildList>li{padding:1rem 1.5rem;border-radius:.5rem;border:1px solid var(--c-border);width:fit-content;transition:all ease-in .15s}#pageList .liItem:hover,#pageList .buildList>li:hover{background:var(--c-hover);border:1px solid var(--c-border)}.pageTitle h1+.contextMenuContainer{display:none!important}.ineditmode div.listCm ul.courseMenu li{border:none!important}#pageList{color:var(--c-text);line-height:1.6rem}';
  const courseAnnouncementStyles = '#containerdiv,#announcementList{border:none}#announcementList>li{border:1px solid var(--c-border);background:var(--c-card);margin-bottom:2em;border-radius:5px;position:relative}#announcementList>li>h3:first-child{color:var(--c-title)!important;font-size:18px}#announcementList>li>.announcementInfo{position:absolute;top:50px;left:30px;height:60px;border:none;display:flex;flex-direction:row;width:fit-content;justify-content:flex-start;padding:0;margin-top:5px}#announcementList>li>.announcementInfo>p{display:inline;width:fit-content;height:fit-content;border-radius:1000px;border:1px solid var(--c-border);background-color:var(--c-label);padding:.2em 1em;color:var(--c-text);margin-right:1em}#announcementList>li>.announcementInfo>p>span{display:none}#announcementList>li>.details{margin:40px 0 0}#announcementList>li>.details *{font-family:inherit!important;color:var(--c-text)!important;text-decoration:none!important;font-style:normal!important;font-size:14px!important;line-height:1.6}#announcementList>li>.details *[style*=background-color],#announcementList>li>.details *[style*=text-decoration]{background-color:transparent!important;background:linear-gradient(180deg,transparent 90%,var(--red-2) 90%)!important}#announcementList>li>.details *[style*="text-decoration-style: initial;"]:not([style*=background-color]){background:none!important}#announcementList>li>.details strong{color:var(--c-accent)!important;font-weight:400}#announcementList>li>.details a{color:var(--c-accent)!important;background:linear-gradient(180deg,transparent 90%,var(--c-link) 90%)!important}#announcementList>li>.details a:hover{background:linear-gradient(180deg,var(--c-hover) 90%,var(--c-link) 90%)!important}#announcementList>li>.details>p:first-child span{display:flex;flex-direction:flex-start;justify-content:center;align-items:center;width:fit-content}#announcementList>li>.details>p:first-child span:before{content:"";display:inline-block;background:var(--i-watch);margin-right:1em;background-size:100%;background-position:center center;width:20px;height:20px;background-repeat:no-repeat}';
  const courseTeachingStaffListStyles = "#pageTitleDiv>*:not([id=pageTitleBar]){display:none}#pageTitleDiv{color:transparent}#actionbar{border:none;border-bottom:1px solid var(--c-border)}#actionbar .mainButton>a,#actionbar .secondaryButton>a{color:var(--c-text);border-radius:5px 5px 0 0;border-bottom:2px solid transparent!important}#actionbar .mainButton>a:hover,#actionbar .secondaryButton>a:hover{background:var(--c-hover);border-bottom:2px solid var(--c-accent)!important}#searchForm{display:none}.container{border:1px solid var(--c-border);background:var(--c-card);border-radius:5px}.container *{font-family:inherit!important;color:var(--c-text)!important;text-decoration:none!important;font-style:normal!important;font-size:14px;line-height:1.6}.container .backLink a{background:var(--c-card)}.container .backLink a:hover{background-color:var(--c-hover)}";
  const courseClassinStyles = "#pageTitleDiv>*:not([id=pageTitleBar]){display:none}#pageTitleDiv{color:transparent}#actionbar{border:none;border-bottom:1px solid var(--c-border)}#actionbar .mainButton>a,#actionbar .secondaryButton>a{color:var(--c-text);border-radius:5px 5px 0 0;border-bottom:2px solid transparent!important}#actionbar .mainButton>a:hover,#actionbar .secondaryButton>a:hover{background:var(--c-hover);border-bottom:2px solid var(--c-accent)!important}#searchForm{display:none}.container{border:1px solid var(--c-border);background:var(--c-card);border-radius:5px}.container *{font-family:inherit!important;color:var(--c-text)!important;text-decoration:none!important;font-style:normal!important;font-size:14px;line-height:1.6}.container .backLink a{background:var(--c-card)}.container .backLink a:hover{background-color:var(--c-hover)}";
  const courseBlankPageStyles = '#containerdiv{border:1px solid var(--c-border);background:var(--c-card);margin-bottom:2em;border-radius:5px;padding:20px 30px;color:var(--c-text)}#containerdiv *{font-family:inherit!important;color:var(--c-text)!important;text-decoration:none!important;font-style:normal!important;font-size:14px!important;line-height:1.6}#containerdiv *[style*=background-color],#containerdiv *[style*=text-decoration]{background-color:transparent!important;background:linear-gradient(180deg,transparent 90%,var(--red-2) 90%)!important}#containerdiv *[style*="text-decoration-style: initial;"]:not([style*=background-color]){background:none!important}';
  const courseVideolistStyles = ".container{margin-top:0;padding-top:0}.searchbar{display:none}#listContainer{border:1px solid var(--c-border);background:var(--c-card);border-radius:5px;padding:5px 0}#listContainer_datatable{padding:0 10px;background:var(--c-card)}#listContainer_datatable .inventoryListHead *{color:var(--c-title);font-weight:700;padding-left:12px}#listContainer_datatable>.inventoryListHead *{border-bottom:1px solid var(--c-border)!important}#listContainer_databody{border-bottom:none}#listContainer_databody>tr{background:var(--c-card)}#listContainer_databody>tr:nth-child(2n){background:var(--gray-1)}#containerdiv{width:inherit}#listContainer_databody>tr>*:first-child{border-radius:5px 0 0 5px}#listContainer_databody>tr>*:last-child{border-radius:0 5px 5px 0;border-bottom:none!important}#listContainer_databody>tr:last-child>*{border-bottom:none!important}#listContainer_databody>tr>*{line-height:24px;margin-top:5px;border:none}#listContainer_databody>tr *{color:var(--c-text)}#listContainer_databody>tr .table-data-cell-value>a{color:var(--cyan-7);border-radius:3px;padding:0 1em}#listContainer_databody>tr .table-data-cell-value>a:hover{text-decoration:none;background:var(--cyan-2)}#listContainer>.rumble_top{display:none}#listContainer_nav_batch_bot{display:flex;justify-content:center;padding:10px 0 0}#listContainer_nav_batch_bot>.inventory_paging{margin:0;padding:0}#listContainer_navpaging_bot .jumpToLinkContainer,#listContainer_navpaging_bot .jumpToLinkContainer *{background:var(--c-primary-light);color:var(--c-primary);border:none;box-shadow:none}#listContainer_navpaging_bot .jumpToLinkContainer{border-radius:5px;padding:5px 8px;display:inline-flex;justify-content:center}#listContainer_navpaging_bot>a{background-color:transparent;border:none;box-shadow:none}#listContainer_pagingcontrols{display:flex;justify-content:center;width:100%;margin-bottom:5px}#listContainer_pagingcontrols #listContainer_itemcount>span{border:none;padding:0;margin:0;color:var(--c-text)}#listContainer_pagingcontrols #listContainer_itemcount>span>strong{color:var(--c-title);display:inline;padding:0 5px}#listContainer_pagingcontrols #listContainer_itemcount>span>strong:last-child{padding-right:0}";
  const courseOtherStyles = "#pageTitleDiv>*:not([id=pageTitleBar]){display:none}#pageTitleDiv{color:transparent}#actionbar{border:none;border-bottom:1px solid var(--c-border)}#actionbar .mainButton>a,#actionbar .secondaryButton>a{color:var(--c-text);background:var(--c-background);outline:none;border-radius:5px 5px 0 0;border-bottom:2px solid transparent!important}#actionbar .mainButton>a:hover,#actionbar .secondaryButton>a:hover{background:var(--c-hover);border-bottom:2px solid var(--c-accent)!important}#actionbar .secondaryButton>a.liveAreaTab{border-bottom:2px solid var(--c-accent)!important}#actionbar+.containerOptions{padding-right:30px;padding-left:30px}#actionbar+.containerOptions .liveArea{border-radius:0 0 5px 5px;border:1px solid var(--c-border);border-top:none}#searchForm{display:none}.container{border:1px solid var(--c-border);background:var(--c-card);border-radius:5px}.container *{font-family:inherit!important;color:var(--c-text)!important;text-decoration:none!important;font-style:normal!important;font-size:14px;line-height:1.6}.container .backLink a{background:var(--c-card)}.container .backLink a:hover{background-color:var(--c-hover)}";
  const courseClassGradeStyles = '#containerdiv{border:none;background:var(--c-background)}.filterBarHorizontal{background:var(--c-background);border-bottom:1px solid var(--c-border)}#filterby{display:inline-flex;height:100%;padding-top:0;padding-bottom:0}#filterby>li{height:100%;position:relative}#filterby a{box-sizing:border-box;height:100%;display:flex;padding:10px 15px;box-shadow:none!important;font-size:11pt;font-weight:700;color:var(--c-text);border-radius:5px 5px 0 0;border:none;border-bottom:2px solid transparent}#filterby a:hover{background:var(--c-hover);border-bottom:2px solid var(--c-accent)}#filterby a.active{color:var(--c-accent);background:var(--c-background);border-bottom:2px solid var(--c-accent)}.filterBarHorizontal select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:var(--c-card);color:var(--c-text);border:1px solid var(--c-border);border-radius:3px;outline:none}.filterBarHorizontal select:hover{background:var(--c-hover);color:var(--c-title)}.gradeTableNew{display:flex;flex-direction:column;margin-top:50px}.gradeTableNew .grades_header{position:relative;width:100%;left:0;right:0;top:0;margin-top:1em;border:1px solid var(--c-border);border-bottom:none;border-radius:5px 5px 0 0;background:var(--c-card);display:flex;padding:0 10px;height:fit-content;box-sizing:border-box}.gradeTableNew .grades_header>div{color:var(--c-title);font-weight:700;font-size:11pt!important;margin-top:10px;border-bottom:1px solid var(--c-border);padding-bottom:10px!important;margin-bottom:4px;height:fit-content!important}.gradeTableNew>#grades_wrapper{width:100%;display:block;margin-top:0;border:1px solid var(--c-border);border-top:none;border-radius:0 0 5px 5px;background:var(--c-card);padding:0 10px 10px;box-sizing:border-box}#grades_wrapper>div{border-radius:5px;padding:5px 0;border:none;box-sizing:border-box;height:65px}#grades_wrapper>div:not(.calculatedRow):nth-child(2n){background:var(--gray-1)}#grades_wrapper>div:not(.calculatedRow):hover{background:var(--c-hover)}#grades_wrapper .calculatedRow{box-shadow:none;border:none;box-sizing:border-box;border-left:6px solid var(--gray-4);border-radius:0 5px 5px 0;background:var(--gray-2);background:linear-gradient(90deg,var(--gray-2) 10%,var(--c-card) 90%);margin-bottom:10px}#grades_wrapper .calculatedRow input{box-shadow:none;text-decoration:none!important;border:none;color:var(--c-text)}#grades_wrapper>div>div.gradable{height:100%}#grades_wrapper>div>div.gradable,#grades_wrapper>div>div.gradable>a{color:var(--gray-7);font-weight:700;font-size:14px}#grades_wrapper>div>div.gradable>a{width:fit-content;display:block;color:var(--blue-6);overflow:visible;margin-bottom:8px}#grades_wrapper>div>div.gradable>div{font-size:12px;display:inline;color:var(--c-text)}#grades_wrapper>div>div.gradable>div:first-child:before{display:block;margin-bottom:8px;content:""}#grades_wrapper>div>div.gradable>a+div:before{display:none}#grades_wrapper>div>div.gradable>div{margin-right:8px}#grades_wrapper>div>div.activity span{color:var(--c-text)}#grades_wrapper>div>div.grade span.grade{color:var(--cyan-7)}#grades_wrapper>div>div.grade span.pointsPossible{color:var(--c-text)}#grades_wrapper>div>div img.tooltip-icon{width:18px;content:var(--i-tip)}#grades_wrapper>div>div i.icon-comment:before{width:18px;background:var(--i-comment);background-size:contain!important;background-repeat:no-repeat;background-position:center center;content:".";color:transparent}#grades_wrapper>div>div .tooltip{background:var(--c-card);border:1px solid var(--c-border);box-shadow:none!important;color:var(--c-title);text-shadow:none}#grades_wrapper>div>div .tooltipContainer-left .tooltip:after{text-shadow:none}#submissionReceipts{background:var(--c-card);color:var(--c-text);font-family:sans-serif}#grades_wrapper>div{position:relative}#grades_wrapper .itemStats{position:absolute;top:0;right:0;padding:5px}div.lb-overlay{z-index:2000}body div.lb-wrapper{background-color:var(--c-card)!important}body div.lb-wrapper div.lb-header{color:var(--c-text);background:transparent}body div.lb-wrapper div.lb-content{background:transparent}body div.lb-wrapper div.lb-content .container{color:var(--c-text);border:none}';
  const courseListContentStyles = '#content_listContainer>li{background:var(--c-card);border:1px solid var(--c-border);border-radius:5px;margin-bottom:16px;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;align-content:center;height:fit-content}#content_listContainer>li:after{display:none}#content_listContainer>li>img{position:relative;top:0;left:0;padding:5px;border-radius:5px;height:32px;width:32px;box-sizing:border-box;margin-right:10px}#content_listContainer>li>img[src*=document],#content_listContainer>li>img[src*=file],#content_listContainer>li>img{content:var(--i-file);background:var(--red-3)}#content_listContainer>li>img[src*=folder]{content:var(--i-folder);background:var(--orange-3)}#content_listContainer>li>img[src*=link]{content:var(--i-link);background:var(--yellow-3)}#content_listContainer>li>div img[alt=链接的项目]{display:none}#content_listContainer>li>div.item{display:inline;flex-basis:calc(100% - 42px);padding:0}#content_listContainer>li>div.item h3 *{text-decoration:none;color:var(--c-title)!important}#content_listContainer>li>div.details{padding-left:0;flex-basis:100%}#content_listContainer>li>div.details>*:not(.alignPanel):first-child{margin-top:10px!important;border-top:1px solid var(--c-border);padding-top:5px!important}#content_listContainer>li>div.details *{background:var(--c-card);border:none;color:var(--c-text)!important;line-height:1.6!important;font-family:inherit!important;font-size:14px!important;text-decoration:none!important;font-style:normal!important}#content_listContainer>li>div.details img{border-radius:5px}#content_listContainer>li>div.details img[alt=文件]{display:none}#content_listContainer>li>div.details *[style*=background]{background:none!important}#content_listContainer>li>div.details span[style*=text-decoration],#content_listContainer>li>div.details span[style*=color],#content_listContainer>li>div.details span[style*=background]{color:var(--c-text)!important;background:linear-gradient(180deg,transparent 90%,var(--red-2) 90%)!important}#content_listContainer>li>div.details a,#content_listContainer>li>div.details span[style*="color: #0000ff"]{color:var(--blue-5)!important;text-decoration:none}.pku-art-batch-download-btn{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border:1px solid var(--c-border);border-radius:5px;background:var(--c-card);color:var(--c-text);font-size:13px;cursor:pointer;transition:all .2s ease;white-space:nowrap;flex-shrink:0}.pku-art-batch-download-btn:hover{background:var(--blue-2);border-color:var(--blue-4);color:var(--blue-6)}.pku-art-batch-download-btn svg{width:16px;height:16px;flex-shrink:0;fill:currentColor}.pku-art-download-all-btn{background:var(--c-button)}#pageTitleDiv{display:flex!important;align-items:center}#pageTitleDiv>.pku-art-download-all-btn{margin-left:auto}#content_listContainer>li>div.item{display:flex!important;align-items:center;justify-content:space-between}#content_listContainer>li>div.item h3{flex:1;margin:0}';
  const courseViewAttemptStyles = "#containerdiv{border-radius:5px;background:var(--c-card);padding:16px;border:1px solid var(--c-border)}#containerdiv h3{padding:0;background:none;margin:0 0 10px;font-size:16px;top:0;color:var(--c-title)}#containerdiv>.stepcontent{background:var(--gray-1);box-sizing:border-box;border-radius:5px;margin-bottom:16px}#containerdiv>.stepcontent .label{color:var(--c-text);border-left:3px solid var(--c-accent);padding-left:6px}#containerdiv>.stepcontent .field{color:var(--c-title)}#containerdiv>.stepcontent li:last-child{padding-bottom:0;margin-bottom:0}#containerdiv>.columnStep>div{background:var(--gray-1);padding:5px;box-sizing:border-box;border-radius:5px;margin-bottom:16px}#containerdiv>.columnStep .attachments tr:first-child{border:none}#containerdiv>.columnStep .attachments tr:first-child *{color:var(--c-title);font-weight:700}#containerdiv>.columnStep .attachments tr:not(:first-child){border-top:1px solid var(--c-border)}#containerdiv>.columnStep .attachments tr:not(:first-child) *{padding-top:5px;padding-bottom:5px;color:var(--c-text)}#containerdiv>.iconlegend a{background:var(--c-label);border:1px solid var(--c-border);border-radius:5px;color:var(--c-text);box-shadow:none}#containerdiv>.backLink a{border-radius:5px 0;background:var(--c-card);box-shadow:none;color:var(--c-text)}#containerdiv>.backLink a:hover{background:var(--c-hover);color:var(--c-primary)}";
  const courseToolFrameStyles = '.brandingImgWrap,#appTabList>tbody>tr,.hideoff,#quick_links_wrap,#global-avatar,#global-toggle-img{display:none}#global-nav-link>*{display:none}#global-nav-link,#global-nav-link:hover,#global-nav-link:focus{color:transparent;overflow:hidden;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-remind)!important;background-size:80%;background-repeat:no-repeat;background-position:center center;border:none;outline:none}.global-nav-bar a.logout-link,.global-nav-bar a.logout-link:hover,.global-nav-bar a.logout-link:focus{color:transparent;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-exit)!important;background-size:80%;background-repeat:no-repeat;background-position:center center}.container,.locationPane,.contentPane{background-color:var(--c-background)}.tabWrapper-right,#globalNavPageNavArea,#topTabs{background-color:var(--c-navbar)}#globalNavPageNavArea{padding:1em 140px 1em 0;height:60px;box-sizing:border-box;display:flex;text-align:right;justify-content:flex-end;flex-direction:row;background-image:var(--i-logo);background-repeat:no-repeat;background-size:auto 30px;background-position:2em center;border-bottom:1px solid var(--c-border)}.tabWrapper-right,.bouncer[role=presentation]{width:fit-content}.global-nav-bar-wrap{position:absolute;right:50px;display:flex;justify-content:flex-end;flex-direction:row-reverse;background-color:var(--c-navbar);width:100px;height:60px;box-sizing:border-box;margin:0;padding:0;border-bottom:1px solid var(--c-border)}.global-nav-bar{margin:0;float:none;height:60px;display:flex;flex-direction:row-reverse;justify-content:center;align-items:center}.global-nav-bar:not(:first-child){margin:0 5px}table.bouncer,.appTabs td.active,.appTabs a:hover span,.appTabs a:focus span{border:none}.topTabs .tabWrapper-right{height:fit-content;padding:0}#globalNavPageNavArea a,#globalNavPageNavArea td{padding:0!important}#globalNavPageContentArea,#globalNavPageContentArea .locationPane,#contentPanel,#content,#containerdiv,#containerdiv>div,#iframe_wrap{height:fit-content!important}#globalNavPageContentArea{height:calc(100vh - 60px)!important;top:0}nav.navigationPane{height:100%}#side_nav:after{content:"PKU Art @ Arthals";display:block;background-color:var(--c-sidebar);position:absolute;bottom:20px;left:50%;transform:translate(-50%);color:var(--c-text);height:20px;z-index:99999;opacity:.3;visibility:visible!important}.locationPane{background-color:var(--c-background)}.contentPane .shadow{border:none}#pageTitleDiv{margin:0!important}#vertical_container,#bottomButtons{display:none}#global-nav-tools{z-index:9999;height:inherit!important}#global-nav-flyout{box-shadow:none;border-radius:5px;width:40px!important;height:150px!important;transform:translateY(34px);background-color:transparent}#global-nav-tools{background-color:transparent}#global-list-tools{margin:0;box-shadow:var(--c-box-shadow);border:1px solid var(--c-border);padding:5px;border-radius:5px;background-color:var(--c-card)}#global-list-tools>.overview,#global-list-tools>.stream,#global-list-tools>.risktracker{display:none}#global-list-tools>.alerts,#global-list-tools>.grade,#global-list-tools>.calendar{background-color:var(--c-card)}#global-list-tools>.alerts>a:hover,#global-list-tools>.grades>a:hover,#global-list-tools>.calendar>a:hover{background-color:var(--c-hover)}#global-list-tools>.alerts>a{border-radius:5px;background:var(--i-alarm);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.grades>a{border-radius:5px;background:var(--i-idcard);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.calendar>a{border-radius:5px;background:var(--i-calendar-tab);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.more-link>a{border-radius:5px;background:var(--i-idcard);background-size:60%;background-repeat:no-repeat;background-position:center center}#global-more-tools{display:none!important}.mybb-tools li a{opacity:1;background-color:var(--c-card)}.mybb-tools li a:focus,.mybb-tools li a:focus img{outline:none}#globalNavPageNavArea .bouncer *{vertical-align:middle;font-weight:700!important;overflow:visible;border:none}#globalNavPageNavArea a{margin:0}#globalNavPageContentArea,#globalNavPageContentArea .locationPane,#contentPanel,#content{background:var(--c-background)}#side_nav{background:var(--c-sidebar);border-right:1px solid var(--c-border);width:min(25%,300px)!important;padding:1em}#side_nav:before{content:"工具";display:block;width:100%;font-size:19px;text-align:left;color:var(--c-title);font-weight:700;padding:7px 18px 0}#side_nav #mybbListTools{display:flex;flex-direction:column;box-sizing:border-box;width:100%;padding:0 18px;margin-top:0}#side_nav #mybbListTools:before{z-index:1;content:"";color:transparent;visibility:visible;display:block;height:10px;position:relative;top:5px;width:60px;border-radius:50px;box-sizing:border-box;background-color:var(--c-accent);margin-bottom:21px}#side_nav #mybbListTools li{display:none;border:none;border-left:6px solid transparent}#side_nav #mybbListTools li[id*=Alerts],#side_nav #mybbListTools li[id*=MyGrades],#side_nav #mybbListTools li[id*=calendar]{display:block}#side_nav #mybbListTools li *{background-color:transparent;box-shadow:none;outline:none;text-decoration:none}#side_nav #mybbListTools li.active{border-left:6px solid var(--c-accent)}#side_nav #mybbListTools li span.menu-icon{padding-left:50px;border-radius:5px;display:flex;justify-content:left;flex-direction:row;justify-items:flex-start;align-items:center;text-decoration:none!important}#side_nav #mybbListTools li.active span.menu-icon{border-radius:0 5px 5px 0}#side_nav #mybbListTools li[id*=Alerts] span.menu-icon{background:var(--i-sandclock);background-repeat:no-repeat;background-size:25px 25px;background-position:10px;transition:all ease-in-out .15s}#side_nav #mybbListTools li[id*=Alerts] span.menu-icon:after{content:"禁止摸鱼";color:var(--c-text);display:block;font-size:16px}#side_nav #mybbListTools li[id*=MyGrades] span.menu-icon{background:var(--i-clover);background-repeat:no-repeat;background-size:25px 25px;background-position:10px;transition:all ease-in-out .15s}#side_nav #mybbListTools li[id*=MyGrades] span.menu-icon:after{content:"绩点高高";color:var(--c-text);display:block;font-size:16px}#side_nav #mybbListTools li[id*=calendar] span.menu-icon{background:var(--i-calendar);background-repeat:no-repeat;background-size:25px 25px;background-position:10px;transition:all ease-in-out .15s}#side_nav #mybbListTools li[id*=calendar] span.menu-icon:after{content:"晨钟暮鼓";color:var(--c-text);display:block;font-size:16px}#side_nav #mybbListTools li span.menu-icon:hover:after{color:var(--c-accent)}#side_nav #mybbListTools li span.menu-icon:hover{background-color:var(--c-hover)!important}#side_nav #mybbListTools li[id*=Alerts] img{display:none}#iframe_wrap{margin-left:min(25%,300px);position:relative;left:0;box-shadow:none;border:none;display:flex;align-items:center;justify-content:center;height:100%;padding-top:calc(10vh - 30px)}#iframe_wrap iframe{width:min(100%,1200px);height:80vh!important;border-radius:5px;border:1px solid var(--c-border);padding:5px;background:var(--c-card)}';
  const courseToolAlertStyles = 'html,body,#outer_left_stream_alerts{background:var(--c-card)!important}*{box-shadow:none!important}html,.locationPane,#contentPanel{padding:0;height:fit-content}#streamHeader_alerts,#streamHeader_alerts *{background:var(--c-card);text-shadow:none}#settingsContainer_alerts,#outer_left_stream_alerts{border:none}#settingsContainer_alerts{background:var(--c-card);border:1px solid var(--c-border);margin:10px}#settingsContainer_alerts *{color:var(--c-text)}#settingsContainer_alerts .streamSettingHelpLinks{border-top:1px solid var(--c-border)}#streamSettingButtons a{color:var(--cyan-5);border:none;border-radius:3px;font-size:12px;background:var(--c-label)}#streamSettingButtons a:hover{background:var(--cyan-2);color:var(--cyan-7)}#streamHeader_alerts{padding-bottom:0;height:100%;border:none}#streamHeader_alerts span.current-page,#streamHeader_alerts span.icon{display:none}#filter_by_alerts button{color:var(--c-text);border:1px solid var(--c-border);border-radius:.2rem}#filter_by_alerts button:hover{background:var(--c-hover);color:var(--c-accent)}#streamHeader_alerts .title-text{color:var(--c-title);font-weight:700;text-shadow:none;padding-left:12px}#streamHeader_alerts li{padding:0}#streamHeader_alerts a[id*=filter_type_all]{background:var(--c-label);border:1px solid var(--c-border)}#streamHeader_alerts h5{color:var(--c-title);font-weight:700}#streamHeader_alerts a{color:var(--c-text);line-height:1.6;text-decoration:none;border-radius:0;border:none;border-left:4px solid transparent}#streamHeader_alerts a.active{box-shadow:none;border-left:4px solid var(--c-accent)}#streamHeader_alerts a:hover{color:var(--red-5);background:var(--c-hover)}#stream_alerts #stream_currentFilterText_alerts,#stream_alerts .left_stream_wrapper{box-shadow:none;background:var(--c-card);border:none}#stream_currentFilterText_alerts{color:var(--c-text);font-weight:700;text-shadow:none}#left_stream_alerts>div,#left_stream_alerts>div *{color:var(--c-text);font-style:normal;font-family:sans-serif!important;border-radius:5px;border:none}#left_stream_alerts>div.stream_new_entry{background:inherit}#left_stream_alerts>div.stream_new_entry .stream_context:before{content:"New";color:var(--c-accent);font-size:12px;font-weight:700;padding:0 5px;background:var(--c-label);border-radius:5px;margin-right:5px}#left_stream_alerts>div:nth-child(2n){background:var(--gray-1)}#left_stream_alerts>div:hover{background:var(--c-card-hover)!important;transition:all ease-in .2s}#left_stream_alerts>div span.stream_area_name{color:var(--c-secondary)}#left_stream_alerts>div span.inlineContextMenu>a{color:var(--cyan-5);border:none;border-radius:3px;font-size:12px}#left_stream_alerts>div span.inlineContextMenu>a:hover{background:var(--cyan-2);color:var(--cyan-7)}#left_stream_alerts>div div.stream_details *{font-size:14px;line-height:1em;max-width:100%}span.open_stream_settings{background:var(--i-setting)!important;background-repeat:no-repeat;background-position:center center}.streamError{display:none}';
  const courseToolGradeStyles = ".stream_pages{display:flex;justify-content:space-between;width:100%}*{background:var(--c-card);box-shadow:none!important;outline:none!important;font-style:normal!important;font-family:sans-serif!important}.stream_page_left,.stream_right,html,body{border:none!important;background:var(--c-card)!important}.stream_page_left{width:400px!important;flex-basis:400px;box-sizing:border-box}.stream_header>h1 span.current-page,.stream_header span.icon{display:none}.stream_header>h1 span.title-text{color:var(--c-title);font-weight:700;text-shadow:none;padding-left:12px}.stream_list_filter{display:flex;flex-wrap:wrap;height:fit-content}.stream_list_filter>li{background:transparent!important}.stream_list_filter>li:nth-child(1),.stream_list_filter>li:nth-child(2){flex-basis:50%;margin-bottom:10px;padding:10px 8px 5px;box-sizing:border-box;border-bottom:1px solid var(--c-border)}.stream_list_filter>li:nth-child(1) a,.stream_list_filter>li:nth-child(2) a{background:transparent;color:var(--c-text);border-bottom:2px solid transparent;transition:all ease-in-out .15s}.stream_list_filter>li:nth-child(1) a:hover,.stream_list_filter>li:nth-child(2) a:hover{border-bottom:2px solid var(--c-accent);background:var(--c-hover);border-radius:5px 5px 0 0}.stream_list_filter>li.stream_filterlinks_divider{border:none}.stream_list_filter>li a:hover{color:var(--c-accent)!important}.stream_list_filter>li:nth-child(4) button,.stream_list_filter>li:nth-child(5) button,.stream_list_filter>li:nth-child(6) button{color:var(--c-text);border-bottom:2px solid transparent;background:transparent;border:none!important}.stream_list_filter>li button.active{background:var(--c-hover)}.stream_header{border:none}.stream_dynamic_filters{background-color:var(--c-card)!important;border:1px solid var(--c-border);padding:10px;box-shadow:var(--c-box-shadow)!important}.stream_dynamic_filters h5{color:var(--c-title);font-size:15px!important;font-weight:700}.stream_dynamic_filters li a{color:var(--c-text);border-radius:3px;margin-bottom:2px}.stream_dynamic_filters li a:hover{background:var(--c-hover)}.stream_left>div{border:none!important;border-radius:6px}.stream_left>div:last-child{margin-bottom:50px}.stream_left>div *{background:transparent}.stream_left>div.active_stream_item{background:var(--c-hover)}.stream_left>div .grade-value{color:var(--c-secondary)}.stream_left>div.active_stream_item .grade-value{color:var(--cyan-7)}.stream_left>div .stream_context{color:var(--c-text)!important;font-size:14px!important}.stream_left>div .stream_area_name{background-color:var(--c-secondary);border-radius:100px;padding:0 5px;color:var(--c-card)}.stream_left>div.active_stream_item .stream_area_name{background-color:var(--cyan-7)}.stream_pages>.stream_settings{position:absolute;display:none!important}.stream_pages:after{position:absolute;display:none!important}iframe.stream_right{width:calc(100% - 420px)!important;flex-basis:calc(100% - 420px);padding:5px!important;box-sizing:border-box}.streamError{display:none}";
  const courseToolGradeClassStyles = '*{box-shadow:none!important;text-shadow:none!important}body,html,.container{border:none;background:var(--c-card)!important}#streamDetailHeaderRight>span{display:none}#streamDetailHeaderRight h2.streamHeader a{color:var(--cyan-8);border:none}#streamDetailHeaderRight{height:fit-content;min-height:0;border-bottom:none;padding-bottom:0;margin-bottom:10px}.filterBarHorizontal{background:var(--c-card);border-bottom:1px solid var(--c-border)}#filterby{display:inline-flex;height:100%;padding-top:0;padding-bottom:0}#filterby>li{height:100%;position:relative}#filterby a{box-sizing:border-box;height:100%;display:flex;padding:10px 15px;box-shadow:none!important;font-size:11pt;font-weight:700;color:var(--c-text);border-radius:5px 5px 0 0;border:none;border-bottom:2px solid transparent}#filterby a:hover{background:var(--c-hover)!important;border-bottom:2px solid var(--c-secondary)}#filterby a.active{color:var(--c-secondary);background:var(--c-card);border-bottom:2px solid var(--c-secondary)}.filterBarHorizontal select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:var(--c-card);color:var(--c-text);border:1px solid var(--c-border);border-radius:5px;outline:none;padding:3px 10px}.filterBarHorizontal select:hover{background:var(--c-hover)!important;color:var(--c-title)!important}.gradeTableNew .grades_header{border-bottom:none;border-radius:5px 5px 0 0;background:var(--c-card);display:flex;padding:0 10px;height:fit-content;box-sizing:border-box}.gradeTableNew .grades_header .cell.grade{font-size:12px}.gradeTableNew .grades_header>div{color:var(--c-title);font-weight:700;font-size:11pt!important;font-family:sans-serif;margin-top:10px;border-bottom:1px solid var(--c-border);padding-bottom:10px!important;margin-bottom:4px;height:fit-content!important}.gradeTableNew #grades_wrapper{margin-top:90px!important}#grades_wrapper>div{border-radius:5px;padding:5px 0;border:none;box-sizing:border-box;height:65px;transition:all ease-in .2s}#grades_wrapper>div:last-child{margin-bottom:50px}#grades_wrapper>div:not(.calculatedRow):nth-child(2n){background:var(--gray-1)}#grades_wrapper>div:not(.calculatedRow):hover{background:var(--c-card-hover)}#grades_wrapper>div:first-child{margin-top:10px}#grades_wrapper .calculatedRow{box-shadow:none;border:none;box-sizing:border-box;border-left:6px solid var(--gray-4);border-radius:0 5px 5px 0;background:var(--gray-2);background:linear-gradient(90deg,var(--gray-2) 10%,var(--c-card) 90%);margin-bottom:10px}#grades_wrapper .calculatedRow input{box-shadow:none;text-decoration:none!important;border:none;color:var(--c-text)}#grades_wrapper>div>div.gradable{height:100%}#grades_wrapper>div>div.gradable,#grades_wrapper>div>div.gradable>a{color:var(--gray-7);font-weight:700;font-size:14px}#grades_wrapper>div>div.gradable>a{width:fit-content;display:block;color:var(--cyan-6);overflow:visible;margin-bottom:8px}#grades_wrapper>div>div.gradable>div{font-size:12px;display:inline;color:var(--c-text)}#grades_wrapper>div>div.gradable>div:first-child:before{display:block;margin-bottom:8px;content:""}#grades_wrapper>div>div.gradable>a+div:before{display:none}#grades_wrapper>div>div.gradable>div{margin-right:8px}#grades_wrapper>div>div.activity span{color:var(--c-text)}#grades_wrapper>div>div.grade span.grade{color:var(--cyan-7)}#grades_wrapper>div>div.grade span.pointsPossible{color:var(--c-text)}#grades_wrapper>div>div img.tooltip-icon{width:18px;content:var(--i-tip)}#grades_wrapper>div>div i.icon-comment:before{width:18px;background:var(--i-comment);background-size:contain!important;background-repeat:no-repeat;background-position:center center;content:".";color:transparent}#grades_wrapper>div>div .tooltip{background:var(--c-card);border:1px solid var(--c-border);box-shadow:none!important;color:var(--c-title);text-shadow:none}#grades_wrapper>div>div .tooltipContainer-left .tooltip:after{text-shadow:none}#submissionReceipts{background:var(--c-card);color:var(--c-text);font-family:sans-serif}#grades_wrapper>div{position:relative}#grades_wrapper .itemStats{position:absolute;top:0;right:0;padding:5px}div.lb-overlay{z-index:2000}body div.lb-wrapper{background-color:var(--c-card)!important}body div.lb-wrapper div.lb-header{color:var(--c-text);background:transparent}body div.lb-wrapper div.lb-content{background:transparent}body div.lb-wrapper div.lb-content .container{color:var(--c-text);border:none}';
  const courseToolGradeItemStyles = "*{box-shadow:none!important;text-shadow:none!important}body,html,.container{border:none;background:var(--c-card)!important}#streamDetailHeaderRight>span{display:none}#streamDetailHeaderRight h2.streamHeader a{color:var(--cyan-8);border:none}#streamDetailHeaderRight{height:fit-content;min-height:0;border-bottom:none;padding-bottom:0;margin-bottom:10px}.gb_feedback{border-left:6px solid var(--cyan-2);height:fit-content;padding:5px 10px;margin-bottom:10px}.gb_feedback:before{display:none}.gb_feedback p{font-family:sans-serif;font-size:14px;color:var(--c-text);line-height:1.6}.gb_feedback p:last-child{margin-bottom:0}.gradeTable *{background:var(--c-card);border:none!important;color:var(--c-text)!important}.gradeTable .gradeCellGrade{color:var(--cyan-7)!important}.gradesByDate input[type=button]{color:var(--c-text)!important;padding:3px 8px;text-decoration:none;border-radius:3px}.gradesByDate input[type=button]:hover{background:var(--cyan-2)}#grades_wrapper>div{position:relative}#grades_wrapper .itemStats{position:absolute;top:0;right:0;padding:5px}";
  const courseFileEmbedStyles = "ul#content_listContainer{background:var(--cyan-1)}ul#content_listContainer>li:hover{background:var(--cyan-1);border:none;border-left:6px solid var(--cyan-6)}ul#content_listContainer>li{border-left:6px solid var(--cyan-6);border-top:none;border-bottom:none;padding:5px 10px;color:var(--c-text);display:flex;justify-content:center;align-items:center;flex-direction:column;transition:none;margin:0}ul#content_listContainer>li>*{padding:0;width:100%}ul#content_listContainer>li a{color:var(--cyan-6)}#pageTitleBar span.contextMenuContainer{display:none!important}embed{margin-top:50px;position:relative;height:min(1000px,80vh)!important;background:var(--c-card);border-radius:10px;border:1px solid var(--c-border);padding:10px;box-sizing:border-box}";
  const courseAssignmentUploadStyles = "#containerdiv{border:none}.container>form{background:var(--c-card);border-radius:5px;border:1px solid var(--c-border);padding:10px}.container>form *{background:var(--c-card);color:var(--c-text);font-style:normal;font-family:sans-serif}.container>form #instructions *[style*=color]{color:var(--c-text)!important;background:transparent!important;background:linear-gradient(180deg,transparent 90%,var(--red-2) 90%)!important}#dataCollectionContainer,#dataCollectionContainer>div{background:var(--c-card)}#dataCollectionContainer>div[id^=step]{border-top:none;background:var(--c-card)!important;padding-bottom:16px}#dataCollectionContainer>div[id^=step]>.steptitle{position:relative;top:0;margin:0 0 10px;padding:0;font-size:18px;color:var(--c-title)}div[id*=stepcontent]{border-bottom:1px solid var(--c-border);background:var(--c-card)!important}#metadata div.metaSection{border:none;border-left:6px solid var(--cyan-6);background:var(--cyan-2)!important}#metadata div[class*=meta],#metadata div[class*=meta] span.metaSubInfo{background:transparent}#metadata div.metaField{color:var(--cyan-8);font-size:16px}form[name=uploadAssignmentForm] a#submissionLink,form[name=uploadAssignmentForm] input[type=file],form[name=uploadAssignmentForm] input[type=button]{border-radius:5px;background:var(--c-button);box-shadow:none;color:var(--c-text)}form[name=uploadAssignmentForm] a#submissionLink:hover,form[name=uploadAssignmentForm] input[type=file]:hover,form[name=uploadAssignmentForm] input[type=button]:hover{background:var(--gray-2);color:var(--c-title);font-weight:700}form[name=uploadAssignmentForm] input[type=submit].submit{border-radius:5px;background:var(--c-primary-light);box-shadow:none;color:var(--c-primary)}form[name=uploadAssignmentForm] input[type=submit].submit:hover{background:var(--blue-2);color:var(--blue-7);font-weight:700}form[name=uploadAssignmentForm] ol[role=presentation]>li{display:flex;justify-content:space-between;align-items:flex-start;padding-left:20px;border:2px solid transparent;margin:10px}form[name=uploadAssignmentForm] ol[role=presentation]>li div.label{width:40px;min-width:none;max-width:none}form[name=uploadAssignmentForm] ol[role=presentation]>li.dropzone{border:2px dashed var(--c-border)!important}form[name=uploadAssignmentForm] ol[role=presentation]>li.dropzone.hover{background:var(--c-hover)!important}form[name=uploadAssignmentForm] ol[role=presentation]>li.dropzone div,form[name=uploadAssignmentForm] ol[role=presentation]>li.dropzone label{background:transparent}form[name=uploadAssignmentForm] #newFile_table *{border-color:var(--c-border)!important}form[name=uploadAssignmentForm] #newFile_table img{display:none}form[name=uploadAssignmentForm] li#newFile_listHtmlDiv{margin-top:30px!important}form[name=uploadAssignmentForm] table.mceLayout{border:1px solid var(--c-border)!important;border-radius:5px;padding:5px}form[name=uploadAssignmentForm] table.mceLayout *{border:none!important;background:transparent!important;box-shadow:none!important}form[name=uploadAssignmentForm] .vtbehelp{margin-bottom:5px}form[name=uploadAssignmentForm] .mceFirst:hover,form[name=uploadAssignmentForm] .mceLast:hover{background:transparent}form[name=uploadAssignmentForm] .defaultSkin .mceSplitButton span.mceAction{background-image:var(--i-check);background-repeat:no-repeat;background-position:center center;background-size:contain}form[name=uploadAssignmentForm] div[role=listbox]{background:var(--c-card);border:1px solid var(--c-border);border-radius:5px;padding:5px;box-shadow:var(--c-box-shadow)}form[name=uploadAssignmentForm] div[role=listbox] *{border:none!important}form[name=uploadAssignmentForm] .defaultSkin .mceMenu{top:0;left:0;position:relative}.defaultSkin .mceMenu table,.defaultSkin .mceMenuItemTitle a{background:var(--c-card)}.defaultSkin .mceMenu .mceMenuItemEnabled a:hover,.defaultSkin .mceMenu .mceMenuItemActive{background:var(--c-hover)}@media screen and (prefers-color-scheme:dark){.tox.tox-tinymce{-webkit-filter:invert(100%) hue-rotate(180deg);filter:invert(100%) hue-rotate(180deg)}.tox.tox-tinymce svg{-webkit-filter:invert(100%) hue-rotate(180deg);filter:invert(100%) hue-rotate(180deg)}}#inlineReceipt_good{background:var(--c-accent)}#inlineGrader{border:1px solid var(--c-border);border-radius:5px;background:var(--c-card)}#inlineGrader *{color:var(--c-text);border:none;box-shadow:none;background:transparent;text-decoration:none;line-height:1.6}#inlineGrader .fileTile{background:var(--c-card)!important}#inlineGrader .fileTile>img{content:var(--i-file);width:50px;height:50px}#inlineGrader .fileTile>h5{color:var(--c-title)}#inlineGrader .fileTile>a{background:var(--c-button);border-radius:5px}#inlineGrader .fileTile>a:hover{background:var(--cyan-2);color:var(--c-title);font-weight:700}#inlineGrader #gradingPanel{border-left:1px solid var(--c-border);padding:15px 0}#inlineGrader #gradingPanel .gradingPanelHeader{border-left:6px solid var(--cyan-5);height:auto}#inlineGrader #gradingPanel .gradingPanelHeader h2{margin:5px 0}#inlineGrader #gradingPanel .gradingPanelHeader span{color:var(--c-title);font-weight:700;font-size:16px}#inlineGrader .resizeControls{top:17px;border-radius:5px}#inlineGrader .resizeControls a{border-radius:5px}#inlineGrader .resizeControls a:hover{background:var(--c-hover)}#inlineGrader .resizeControls #maximizer_btn{display:none}#inlineGrader #gradingPanel h3,#inlineGrader #gradingPanel h4,#inlineGrader #gradingPanel span.mainLabel{color:var(--c-title);font-weight:700;font-size:14px}#inlineGrader #gradingPanel .attemptHeader{background:var(--cyan-2)!important}#inlineGrader #gradingPanel div.attemptHeaderLabel{margin-left:15px}#inlineGrader #gradingPanel .attemptContent .segment{margin:35px 0}#inlineGrader #gradingPanel .genericFile{background-image:var(--i-file);background-repeat:no-repeat;background-size:15px;background-position:5px center}#inlineGrader #gradingPanel .filesList .dwnldBtn{background-image:var(--i-download);background-repeat:no-repeat;background-size:15px;background-position:center center}#inlineGrader #gradingPanel .backLink a{background:var(--c-card);border-radius:5px 0}#inlineGrader #gradingPanel .backLink a:hover{background:var(--c-hover)}#inlineGrader div.contentDetailsHeader{margin-top:15px}";
  const courseGlobalPageStyles = "body{position:relative}.brandingImgWrap,#appTabList>tbody>tr,.hideoff,#quick_links_wrap,#global-avatar,#global-toggle-img{display:none}#global-nav-link>*{display:none}#global-nav-link,#global-nav-link:hover,#global-nav-link:focus{color:transparent;overflow:hidden;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-remind)!important;background-size:80%;background-repeat:no-repeat;background-position:center center;border:none;outline:none}.global-nav-bar a.logout-link,.global-nav-bar a.logout-link:hover,.global-nav-bar a.logout-link:focus{color:transparent;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-exit)!important;background-size:80%;background-repeat:no-repeat;background-position:center center}.container,.locationPane,.contentPane{background-color:var(--c-background)}.tabWrapper-right,#globalNavPageNavArea,#topTabs{background-color:var(--c-navbar)}#globalNavPageNavArea{padding:1em 140px 1em 0;height:60px;top:0!important;box-sizing:border-box;display:flex;text-align:right;justify-content:flex-end;flex-direction:row;background-image:var(--i-logo);background-repeat:no-repeat;background-size:auto 30px;background-position:2em center;border-bottom:1px solid var(--c-border);position:fixed;width:100%;z-index:20}.tabWrapper-right,.bouncer[role=presentation]{width:fit-content}.global-nav-bar-wrap{position:fixed;z-index:30;right:50px;display:flex;justify-content:flex-end;flex-direction:row-reverse;background-color:var(--c-navbar);width:100px;height:60px;box-sizing:border-box;margin:0;padding:0;border-bottom:1px solid var(--c-border)}.global-nav-bar{margin:0;float:none;height:60px;display:flex;flex-direction:row-reverse;justify-content:center;align-items:center}.global-nav-bar:not(:first-child){margin:0 5px}table.bouncer,.appTabs td.active,.appTabs a:hover span,.appTabs a:focus span{border:none}.topTabs .tabWrapper-right{height:fit-content;padding:0}#globalNavPageNavArea a,#globalNavPageNavArea td{padding:0!important}#breadcrumbs{padding:1.2em 1em 1em;box-sizing:border-box;height:80px;margin-bottom:1em;margin-top:60px;z-index:10;color:var(--c-title);background-color:var(--c-background);display:flex;text-align:center;justify-content:center;border:none}#breadcrumbs .coursePath{padding:0;margin:0}#breadcrumbs span{font-size:18pt;color:var(--c-title);-webkit-animation:tracking-in-expand .7s cubic-bezier(.215,.61,.355,1) both;animation:tracking-in-expand .7s cubic-bezier(.215,.61,.355,1) both}#globalNavPageContentArea{margin-top:60px}#globalNavPageContentArea,#globalNavPageContentArea .locationPane,#contentPanel,div#content,div.container{height:fit-content!important}.locationPane{background-color:var(--c-background)}.contentPane .shadow{border:none}#pageTitleDiv{margin:0!important}#content{width:min(100%,1200px);margin:0 auto}#contentPanel{-webkit-animation:fadeInUpStablePixel .7s cubic-bezier(.215,.61,.355,1) both;animation-delay:.5s;animation:fadeInUpStablePixel .7s cubic-bezier(.215,.61,.355,1) both}.localViewToggle{display:none}#pageTitleHeader{color:var(--blue-7)!important;background-color:var(--blue-2);padding:.3em 1em;border-radius:5px;font-size:20px!important}#pageTitleHeader *{color:var(--blue-7)!important}#pageTitleText{font-weight:700}#vertical_container,#bottomButtons{display:none}#global-nav-tools{z-index:9999;height:inherit!important}#global-nav-flyout{box-shadow:none;border-radius:5px;width:40px!important;height:150px!important;transform:translateY(34px);background-color:transparent}#global-nav-tools{background-color:transparent}#global-list-tools{margin:0;box-shadow:var(--c-box-shadow);border:1px solid var(--c-border);padding:5px;border-radius:5px;background-color:var(--c-card)}#global-list-tools>.overview,#global-list-tools>.stream,#global-list-tools>.risktracker{display:none}#global-list-tools>.alerts,#global-list-tools>.grade,#global-list-tools>.calendar{background-color:var(--c-card)}#global-list-tools>.alerts>a:hover,#global-list-tools>.grades>a:hover,#global-list-tools>.calendar>a:hover{background-color:var(--c-hover)}#global-list-tools>.alerts>a{border-radius:5px;background:var(--i-alarm);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.grades>a{border-radius:5px;background:var(--i-idcard);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.calendar>a{border-radius:5px;background:var(--i-calendar-tab);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.more-link>a{border-radius:5px;background:var(--i-idcard);background-size:60%;background-repeat:no-repeat;background-position:center center}#global-more-tools{display:none!important}.mybb-tools li a{opacity:1;background-color:var(--c-card)}.mybb-tools li a:focus,.mybb-tools li a:focus img{outline:none}";
  const courseGlobalAnnouncementStyles = ".announcementFilter,.announcementList{margin:0}#containerdiv{margin-top:0;padding-top:0}.announcementFilter{display:flex;align-items:center;justify-content:center;border-bottom:none;margin-bottom:10px}.announcementFilter select#searchSelectId{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:var(--c-card);color:var(--c-text);border:1px solid var(--c-border);border-right:none;border-radius:5px 0 0 5px;outline:none;padding:3px 10px;box-sizing:border-box;height:30px;margin:0}.announcementFilter a.genericButton{background:var(--c-button);color:var(--c-title);border:1px solid var(--c-border);border-left:none;border-radius:0 5px 5px 0;outline:none;padding:3px 10px;box-sizing:border-box;height:30px;box-shadow:none}.announcementFilter a.genericButton:hover{background:var(--cyan-2);color:var(--cyan-6)}";
  const courseVideoPlayStyles = "#content,.container{border:none;width:auto!important}iframe{min-height:100vh;height:fit-content}";
  const courseVideoPlayFrameStyles = 'body{position:relative}html,body,#app{background:var(--c-background)!important}.course-info__wrapper{margin-bottom:0}.course-info__header{display:flex;justify-content:center!important;align-items:center}.course-info__header span{font-weight:700;font-size:18pt;color:var(--c-title);-webkit-animation:tracking-in-expand .7s cubic-bezier(.215,.61,.355,1) both;animation:tracking-in-expand .7s cubic-bezier(.215,.61,.355,1) both}.course-info__wrapper .course-info__main{background:var(--c-card);padding:5px;border-radius:5px;border:1px solid var(--c-border)}.course-info__wrapper .course-info__footer{display:grid;width:fit-content;grid-template-columns:repeat(3,250px);justify-content:center;align-items:center;gap:10px;margin:10px auto}.course-info__wrapper .course-info__footer.rename-unsupported{grid-template-columns:repeat(2,250px)}.course-info__wrapper .course-info__footer button{background:var(--c-tip);border:none;color:var(--c-text);margin-left:0;height:35px}#injectDownloadSwitchArea{background:var(--c-tip);color:var(--c-text);padding:10px 20px;border-radius:4px;display:inline-flex;flex-direction:row;justify-content:center;align-items:center;gap:1rem;height:35px;line-height:14px;font-size:14px;box-sizing:border-box;border:none;font-weight:700;border-image-width:0;transition:.1s;height:35px!important}#injectDownloadRenameUnsupported{background:var(--c-tip);color:var(--c-text);padding:10px 20px;border-radius:4px;display:inline-flex;flex-direction:row;justify-content:center;align-items:center;gap:.5rem;height:35px;line-height:14px;font-size:14px;box-sizing:border-box;border:none;font-weight:700;grid-column:span 2}#injectDownloadRenameUnsupported .i-warning{display:inline-block;width:16px;height:16px;background-image:var(--i-warning);background-size:100% 100%;background-position:center;background-repeat:no-repeat}#injectDownloadSwitch{display:none}#injectDownloadSwitch:checked+label{background-color:var(--c-text);mask-image:var(--i-check-simple);-webkit-mask-image:var(--i-check-simple);mask-size:80% 80%;-webkit-mask-size:80% 80%;mask-position:center;-webkit-mask-position:center;mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat}label[for=injectDownloadSwitch]{display:inline-block;width:16px;height:16px;background:var(--c-tip);border:1px solid var(--c-border);border-radius:4px}label[for=injectDownloadSwitch]:before{content:"";transition:.1s}#injectDownloadButton,#injectCopyDownloadUrlButton,#injectMagicLink{background:var(--c-tip);border:none;color:var(--c-text);margin-left:0;height:35px;font-size:14px;font-weight:700;border-radius:4px;display:flex;align-items:center;justify-content:center;gap:10px}#injectDownloadButton .i-download,#injectCopyDownloadUrlButton .i-link,#injectMagicLink .i-magic{width:16px;height:16px;background-size:100% 100%;background-position:center;background-repeat:no-repeat;color:var(--c-text)}#injectDownloadTip{background:var(--c-tip);color:var(--c-text);padding:10px 20px;border-radius:4px;font-size:14px;box-sizing:border-box;border:none;font-weight:700;transition:.1s;line-height:1.5rem;grid-column:1 / 4;width:100%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;gap:20px}.rename-unsupported #injectDownloadTip{grid-column:1 / 3}#injectDownloadTipText{flex:1;-webkit-user-select:text;user-select:text}#injectDownloadTip a{color:var(--c-accent);text-decoration:underline}#injectDownloadTipActions{display:flex;flex-direction:row;gap:10px;flex-shrink:0}#injectDownloadTipActions button{background:var(--c-card);border:1px solid var(--c-border);color:var(--c-text);padding:6px 12px;border-radius:4px;font-size:12px;font-weight:700;cursor:pointer;transition:.1s;white-space:nowrap;display:flex;align-items:center;gap:6px}#injectDownloadTipActions button svg{width:14px;height:14px;flex-shrink:0}#injectDownloadTipActions button:hover{background:var(--cyan-2);color:var(--cyan-6);border-color:var(--cyan-6)}#injectDownloadTipActions button:disabled{opacity:.5;cursor:not-allowed}#injectDownloadTipActions button:disabled:hover{background:var(--c-card);color:var(--c-text);border-color:var(--c-border)}#injectDownloadButton:hover,#injectCopyDownloadUrlButton:hover,#injectMagicLink:hover,#injectDownloadSwitchArea:hover{background:var(--cyan-2);color:var(--cyan-6);cursor:pointer}#injectMagicLink:hover *,#injectDownloadButton:hover *,#injectCopyDownloadUrlButton:hover *,#injectDownloadSwitchArea:hover *{background:var(--cyan-2);color:var(--cyan-6);font-weight:700;transition:.1s}#injectDownloadSwitchArea:has(#injectDownloadSwitch:checked):hover label[for=injectDownloadSwitch]{background-color:var(--cyan-6)}#injectDownloadSwitchArea:hover label[for=injectDownloadSwitch]{border-color:var(--cyan-6)}#injectDownloadUrlInput:hover::placeholder,#injectMagicLink:hover::placeholder{color:var(--cyan-6);transition:.1s}';
  const courseTaskStyles = "";
  const courseDiscussionStyles = `*[var=nameFormatEnum] #breadcrumbs{margin-top:0}#containerdiv form table.inventory{background-color:var(--c-card)}#conferenceFormId th,#conferenceFormId td{vertical-align:middle!important}#conferenceFormId th{background-color:var(--c-card)}.inventory>tbody tr{background:var(--c-card)!important}.inventory>tbody tr td,.inventory>tbody tr th,.inventory>thead tr th,.splashTable thead tr th{border-color:var(--c-border)!important}table.inventory>tbody tr:last-child td,table.inventory>tbody tr:last-child th{border-bottom:1px solid var(--c-border)!important}.inventory>tbody .gray td,.inventory>tbody .gray th{background-color:var(--c-hover)!important}table.inventory a.cmimg{display:none}table.inventory .vtbegenerated tbody tr td,table.inventory .vtbegenerated tbody tr th,table.reorderable .vtbegenerated tbody tr td,table.reorderable .vtbegenerated tbody tr th,table.inventory .vtbegenerated tbody tr:hover td,table.inventory .vtbegenerated tbody tr:hover th,table.reorderable .vtbegenerated tbody tr:hover td,table.reorderable .vtbegenerated tbody tr:hover th,table.reorderable .vtbegenerated tbody tr:hover{background:transparent!important}table.inventory .gray .vtbegenerated tbody tr td,table.inventory .gray .vtbegenerated tbody tr th,table.reorderable .gray .vtbegenerated tbody tr td,table.reorderable .gray .vtbegenerated tbody tr th,table.inventory .gray .vtbegenerated tbody tr:hover td,table.inventory .gray .vtbegenerated tbody tr:hover th,table.reorderable .gray .vtbegenerated tbody tr:hover td,table.reorderable .gray .vtbegenerated tbody tr:hover th,table.reorderable .gray .vtbegenerated tbody tr:hover{background-color:var(--c-hover)!important}table.inventory .vtbegenerated tbody tr:last-child td{border-bottom:none!important}table.inventory .unread-count:not(.none){color:#fff!important;background:#e44c47!important}table.inventory .unread-count.none{background:transparent!important;color:var(--c-text)!important}#containerdiv.container{border:1px solid var(--c-border)!important;background-color:var(--c-card)}.inventory>thead tr th.sorted,th.sorted,.splashTable thead tr th.sorted{background-color:var(--c-card)!important;color:var(--c-text)!important}.inventory>thead tr th.sorted a{color:var(--c-text)!important}.genericButton,.genericButtonImg,input[type=submit].genericButton,.browse,.browseIcon,.rumble h3+ul>li>a,.rumble_top h3+ul>li>a,.paging a,.itemHeaderControl>a,.actionMenuButton,.button-3,.button-3-img,.button-4,.button-4-img,#toolsSearchBox+.button-4,.treeContainer .tree li a.button-4-img,.rumble a,.rumble_top a,.rumble .abutton,.rumble_top .abutton{background:var(--c-button)!important;box-shadow:none!important}.nav .sub ul,.nav.gb_currView .sub>ul,.menumini ul,.quickAddPal,.keyboardAccess,span.currentTags,.liveArea,.liveArea-slim,.previewArea,.jumptopage,.panelTabs li.active a.edit,.panelTabs li.active a.edit:hover,.panelTabs li.active a.edit:focus,.flyout,.bcContent .flyout,ul.tree li a+img+a:focus,ul.tree li img+img+a:focus,div.treeContainer ul.tree li a.itemActive,#learningUnitToc ul.tree li a.itemActive,ul.tree li a.itemActive,#loginLang ul,.unread-posts,.need-moderation,.unread-replies-to-me-posts{background:var(--c-button)!important;border:1px solid var(--c-border)!important;border-radius:5px}.thread-detail-page .contentBox{background:var(--c-background)}.db-message-wrapper{box-shadow:none;background:var(--c-card);border:1px solid var(--c-border)!important;border-radius:5px}.reply-lvl-0 .message-wrapper-inner,.db-head-message .message-wrapper-inner{background:var(--c-card);border:none!important;box-shadow:none}.db-reply-block,.reply-lvl-0 .messageTemplate{border:none;box-shadow:none;background:var(--c-card)}.db-collapse-control{display:none}.reply-lvl-0 .threadButtons .browse,.threadButtons .browse,.threadButtons .reply{background:var(--c-button)!important;border:1px solid var(--c-border)!important;border-radius:5px!important;width:fit-content;height:100%;display:block;margin:0}.threadButtons{display:flex!important;flex-direction:row;width:fit-content;gap:5px}.db-message .profileCardAvatarThumb img{height:64px;width:64px;border:1px solid var(--c-border)!important;display:inline-block;padding:1px;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:10px;box-shadow:none;background:transparent}.db-message-wrapper .profileCardAvatarThumb{color:var(--c-title)!important}.profileCardAvatarThumb img{box-shadow:none;background:transparent;border:1px solid var(--c-border)!important}img[src="/images/ci/ng/default_profile_avatar.svg"]{content:var(--i-student)!important}.msg-fringe.db-message-fringe-show{display:none}#inlinePost{margin-top:30px}.steptitle,div[id*=step],div[id*=Step],#dataCollectionContainer,.container{background:var(--c-card)}div[id*=stepcontent]{background:var(--c-card)!important}input[type=text],input[type=password],select{border:1px solid var(--c-border)!important;background:var(--c-card)!important}@media screen and (prefers-color-scheme:dark){.tox.tox-tinymce{-webkit-filter:invert(100%) hue-rotate(180deg);filter:invert(100%) hue-rotate(180deg)}.tox.tox-tinymce svg{-webkit-filter:invert(100%) hue-rotate(180deg);filter:invert(100%) hue-rotate(180deg)}}.taskbuttondiv_wrapper{background:var(--c-card)}#bottom_submitButtonRow{display:flex;gap:10px}form[id=inlineMessageForm] a#submissionLink,form[id=inlineMessageForm] input[type=file],form[id=inlineMessageForm] input[type=button]{border-radius:5px;background:var(--c-button);box-shadow:none;color:var(--c-text);font-size:12px}form[id=inlineMessageForm] a#submissionLink:hover,form[id=inlineMessageForm] input[type=file]:hover,form[id=inlineMessageForm] input[type=button]:hover{background:var(--gray-2);color:var(--c-title);font-weight:700}form[id=inlineMessageForm] input[type=submit].submit{border-radius:5px;background:var(--c-primary-light);box-shadow:none;color:var(--c-primary);font-size:12px}form[id=inlineMessageForm] input[type=submit].submit:hover{background:var(--blue-2);color:var(--blue-7);font-weight:700}.nav .sub ul li a,.cmdiv a,.menumini a,#loginLang ul li a{color:var(--c-text)}div[id*=step],.submittitle,#infoStep,#taskStatusStep,#linkedContentStep,div[id*=stepcontent]{border:none!important}h3.steptitle,span.reqfield{display:none!important}.submitStepTop:has(span.reqfield:only-child){height:20px!important}input[type=text][name=title]{width:100%}input[type=checkbox]{-webkit-appearance:none;-moz-appearance:none;appearance:none;width:16px;height:16px;background-color:var(--c-card);border:1px solid var(--c-border);border-radius:3px}input[type=checkbox]:checked{background-color:var(--c-accent);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'/%3E%3C/svg%3E");background-size:80%;background-position:center;background-repeat:no-repeat}.vtbegenerated::-webkit-scrollbar{width:10px;height:10px}.vtbegenerated::-webkit-scrollbar-track{background-color:transparent}.vtbegenerated::-webkit-scrollbar{height:5px}.vtbegenerated::-webkit-scrollbar-thumb{background-color:var(--c-scrollbar);border-radius:9999px}.author_props .highlight-pop{background:var(--i-verified);background-repeat:no-repeat;background-position:center;background-size:100% 100%;width:20px;height:20px}img[src="../images/paperclip.png"]{display:none}img[src="/images/ci/ng/cal_year_event.gif"]{content:var(--i-file)}.dbAttachment{border:1px solid var(--c-border);border-radius:5px;width:fit-content;padding:3px 5px}.dbAttachment img{width:20px;height:20px}.dbAttachment:hover{background-color:var(--c-hover)}.navigationBar div>button{border:1px solid var(--c-border);display:inline-block;box-shadow:none;background:var(--c-button);border-radius:3px;color:var(--c-text);text-shadow:none;margin:0;padding:0}a.reply-count-link{bottom:3px;position:absolute;background:transparent;display:block;border-radius:3px!important;border:1px solid var(--c-border)!important}.db_msg_metadata,.reply-lvl-0 .db_msg_metadata{border:1px solid var(--c-border)!important;box-shadow:none;background:var(--c-card);border-radius:0 0 0 2px;line-height:1.5;top:3px;right:3px;min-width:140px;text-align:right}#actionbar{position:relative;padding-right:60px;box-shadow:none;opacity:1!important;background:transparent!important;border-bottom:none!important}.collapsedMessage .db-message .profileCardAvatarThumb:after{display:none}.thread-detail-page #actionbar .mainButton>a,.thread-detail-page #actionbar .secondaryButton>a{color:var(--c-text)!important}.thread-detail-page #actionbar .mainButton>a:hover,.thread-detail-page #actionbar .secondaryButton>a:hover{background:var(--c-hover)!important}.thread-detail-page #navsecondary a#refreshTreeActionButtonId:before{content:"";display:inline-block;height:20px;width:20px;background-image:var(--i-refresh);background-size:contain;background-repeat:no-repeat;background-position:center}.thread-detail-page #navsecondary #searchActionButtonId a:before{content:"";display:inline-block;height:20px;width:20px;background-image:var(--i-search);background-size:contain;background-repeat:no-repeat;background-position:center}img[src="/images/ci/actionbar/flag.gif"]{display:none}img[src="/images/ci/ng/sort_on2.gif"]{content:var(--i-arrow);width:16px;height:16px}img[src="/images/ci/ng/sort_on_up2.gif"]{content:var(--i-arrow);transform:rotate(180deg);width:16px;height:16px}`;
  const courseExternalLinkStyles = "body{height:auto}.locationPane{background-color:var(--c-background)}#pageTitleDiv,#pageTitleDiv *{color:var(--c-title)}#containerdiv{border:1px solid var(--c-border);background-color:var(--c-card);border-radius:5px;padding:20px}#containerdiv *{color:var(--c-text);font-size:14px;line-height:1.6}#containerdiv a{color:var(--blue-5)!important;text-decoration:none}";
  const courseToolCalendarStyles = "html,#outer_left_stream_calendar,body{background:var(--c-card)!important}*{box-shadow:none!important;text-shadow:none!important}html,.locationPane,#contentPanel{padding:0;height:fit-content}#streamHeader_calendar{background:var(--c-card);text-shadow:none}#streamHeader_calendar a{color:var(--c-text);line-height:1.6;text-decoration:none;border-radius:0;border:none;border-left:4px solid transparent}#streamHeader_calendar a.active{box-shadow:none;border-left:4px solid var(--c-accent)}#streamHeader_calendar a:hover{color:var(--red-5);background:var(--c-hover)}#calendar_content{border:none;background:var(--c-card)}#streamHeader_calendar{padding-bottom:0;height:inherit!important;border:none}#streamHeader_calendar span.current-page,#streamHeader_calendar span.icon{display:none}#streamHeader_calendar .title-text{color:var(--c-title);font-weight:700;text-shadow:none;padding-left:12px}#calendar_content{border:none}#streamHeader_calendar ul.cal-nav li#agendaDay{background-image:var(--i-calendar-day);background-repeat:no-repeat;background-size:25px 25px;background-position:center center}#streamHeader_calendar ul.cal-nav li#agendaWeek{background-image:var(--i-calendar-week);background-repeat:no-repeat;background-size:25px 25px;background-position:center center}#streamHeader_calendar ul.cal-nav li#month{background-image:var(--i-calendar-month);background-repeat:no-repeat;background-size:25px 25px;background-position:center center}#streamHeader_calendar ul.cal-nav li.active,#streamHeader_calendar ul.cal-nav a{border-radius:5px}#streamHeader_calendar ul.cal-nav li.active{border:1px solid var(--c-border)}#streamHeader_calendar ul.cal-nav a:hover{background:none}#streamHeader_calendar ul.cal-nav li:hover{background-color:var(--c-hover)}#streamHeader_calendar div.filter-content-wrapper a[data-handler=prev] span{background:var(--i-arrow);background-repeat:no-repeat;background-size:25px 25px;background-position:center center;rotate:90deg}#streamHeader_calendar div.filter-content-wrapper a[data-handler=next] span{background:var(--i-arrow);background-repeat:no-repeat;background-size:25px 25px;background-position:center center;rotate:270deg}#streamHeader_calendar div.filter-content-wrapper div.ui-datepicker-title{color:var(--c-text);transform:translateY(-2px)}#datepicker td[data-handler=selectDay] a{background:var(--c-button)}#datepicker th{font-size:8px;color:var(--c-text)}#calendarList,#calendarList *{color:var(--c-text)}#calendarsForm{max-height:350px;overflow-y:auto}#calendarsForm #checkUncheckAll{display:flex;justify-content:center;align-items:center;gap:5px;margin-bottom:10px;position:sticky;top:0;background:var(--c-card);z-index:100}#calendarsForm #checkUncheckAll a{width:fit-content;padding:2px 5px;border-radius:5px;font-weight:700}#calendars{display:flex;flex-wrap:wrap;align-items:flex-start;gap:5px}#calendars div.calendar-item.calendar-name{width:100%}#calendars div.calendar-item.calendar-name label{border:1px solid var(--c-border);border-radius:5px}#calendars div.calendar-item.calendar-name label:hover{background:var(--c-hover);color:var(--c-accent)}#calendars div.calendar-item.calendar-name span.colorPicker-picker{display:none}#streamHeader_calendar h3{color:var(--c-subtitle);font-weight:700}#ical{background:var(--c-button);border:1px solid var(--c-border);border-radius:5px;padding:5px 15px;color:var(--c-text);font-weight:700}#ical:hover{background:var(--c-hover);color:var(--c-accent)}#outer_left_stream_alerts{display:flex;background:var(--c-card);border:none}#calendar_content{flex:1;margin:0}#calendar{background:var(--c-card)}#calendar,#calendar *{font-weight:400;border-color:var(--c-border)}#calendar thead *,#calendar .fc-day-number{color:var(--c-text)}#calendar td.fc-header-left{display:flex;justify-content:start;align-items:center}#calendar td.fc-header-left button{background:var(--c-button);border:1px solid var(--c-border);border-radius:5px;padding:5px 10px;color:var(--c-text);font-weight:700}#calendar td.fc-header-left button:hover{background:var(--cyan-2);color:var(--cyan-7)}#calendar td.fc-header-left button[title=上一个时段] span{background:var(--i-arrow);background-repeat:no-repeat;background-size:25px 25px;background-position:center center;rotate:90deg}#calendar td.fc-header-left button[title=下一个时段] span{background:var(--i-arrow);background-repeat:no-repeat;background-size:25px 25px;background-position:center center;rotate:270deg}#calendar td.fc-header-left .fc-header-title h2{margin:0;color:var(--cyan-8);font-weight:700}#calendar td.fc-header-right{text-align:right}#calendar td.fc-header-right button{float:right;background:var(--c-button);border:1px solid var(--c-border);border-radius:5px;padding:5px 10px;color:var(--c-text);font-weight:700}#calendar td.fc-header-right button span{background:var(--i-add);background-repeat:no-repeat;background-size:20px 20px;background-position:center center}#calendar td.fc-header-right button:hover{background:var(--cyan-2);color:var(--cyan-7)}#calendar .fc-state-highlight{background:var(--cyan-2)}#calendar .fc-event *{color:normal!important}#calendar .fc-agenda-divider-inner{background:var(--c-subtitle)}#calendar .fc-event-inner img{display:none}div.ui-widget-overlay.ui-front{background:var(--c-card)}div[role=dialog]{background:var(--c-card)!important;border:1px solid var(--c-border)!important;border-radius:10px!important;color:var(--c-text)}div[role=dialog] *{color:var(--c-text)}div.ui-dialog>div.ui-resizable-handle.ui-resizable-se.ui-icon.ui-icon-gripsmall-diagonal-se{background:var(--i-resize);background-repeat:no-repeat;background-size:20px 20px;background-position:center center}div.ui-dialog-titlebar span.ui-dialog-title{color:var(--c-title);font-weight:700;font-size:1.5rem;margin-top:10px}#eventtitle,#eventdesc{background:var(--c-input-bg);border:1px solid var(--c-border);border-radius:5px;padding:5px 10px;color:var(--c-text);font-weight:700}#eventdesc{margin-top:10px}div[role=dialog] label{color:var(--c-text);font-weight:700}div[role=dialog] .ui-dialog-buttonset button{background:var(--c-button);border:1px solid var(--c-border);border-radius:5px;padding:5px 10px;color:var(--c-text);font-weight:700}div[role=dialog] .ui-dialog-buttonset button:hover{background:var(--cyan-2);color:var(--cyan-7)}select[disabled]{display:none}#create-new-event fieldset{display:flex;flex-direction:column;row-gap:10px}div[role=dialog] input[type=datetime]{background:var(--c-input-bg);border:1px solid var(--c-border);border-radius:5px;padding:5px 10px;color:var(--c-text);font-weight:700}";
  const courseOralTrainingStyles = "#pageTitleDiv>*:not([id=pageTitleBar]){display:none}#pageTitleDiv{color:transparent}#actionbar{border:none;border-bottom:1px solid var(--c-border)}#actionbar .mainButton>a,#actionbar .secondaryButton>a{color:var(--c-text);border-radius:5px 5px 0 0;border-bottom:2px solid transparent!important}#actionbar .mainButton>a:hover,#actionbar .secondaryButton>a:hover{background:var(--c-hover);border-bottom:2px solid var(--c-accent)!important}#searchForm{display:none}.container{border:1px solid var(--c-border);background:var(--c-card);border-radius:5px}.container *{font-family:inherit!important;color:var(--c-text)!important;text-decoration:none!important;font-style:normal!important;font-size:14px;line-height:1.6}.container .backLink a{background:var(--c-card)}.container .backLink a:hover{background-color:var(--c-hover)}";
  const courseViewGroupStyles = "#column0 div.portlet{background:var(--c-card);border:1px solid var(--c-border);border-radius:5px;padding:16px}#column0 div.portlet h2{color:var(--c-title);background:transparent;font-size:1.5rem;border-bottom:1px solid var(--c-border)}#column0 div.portlet div.collapsible{border:none;color:var(--c-text)}#column0 div.portlet div.collapsible ul.userEmailLabel{display:flex!important;flex-direction:column;justify-content:center;align-items:start;list-style:none;row-gap:10px}#column0 div.portlet div.collapsible ul.userEmailLabel li span img{display:none}#column0 div.portlet div.collapsible h3{color:var(--c-title);font-size:1.2rem;font-weight:600;margin-bottom:10px}#column0 div.portlet div.collapsible h3:not(:first-child){margin-top:15px}";
  const electiveSsoLoginStyles = 'body{background:var(--c-background)!important;display:flex!important;flex-direction:column;height:100svh;justify-content:center;align-items:center;position:relative;overflow:hidden}body #div{background-image:var(--i-logo)!important;background-color:var(--c-card)!important;background-size:150px 42px!important;background-repeat:no-repeat!important;background-position:50% 20px!important;padding-top:90px!important;border-radius:10px!important;border:1px solid var(--c-border)!important;left:inherit;margin:0!important;height:fit-content;position:relative;overflow:visible;transition:none!important;animation:none!important}body #div>div{background:var(--c-button);color:var(--c-text);font-weight:700;border-radius:10px;bottom:inherit!important;transition:none!important;animation:none!important}.overClass{border:none!important;color:var(--c-accent)!important;background:var(--c-button-hover)!important;transition:none!important;animation:none!important}body #div3{position:absolute;margin:0!important;left:50%;transform:translate(-50%) translateY(-40px);transition:none!important;animation:none!important;border:1px solid var(--red-4)!important;background:var(--red-1)!important;color:var(--red-6)!important;border-radius:999px!important;display:flex!important;align-items:center;justify-content:center;gap:10px;padding:4px 12px!important;width:fit-content!important;font-size:18px!important}body #div3:before{content:"";display:block;width:28px;height:28px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6)}';
  const electiveMainStyles = 'body{background:var(--c-background)!important;color:var(--c-text);font-size:14px;line-height:1.6;padding-bottom:48px}*,*:before,*:after{text-shadow:none!important;box-shadow:none!important;line-height:1.5}body{position:relative}body>table:first-of-type{margin:0!important;width:100%;position:sticky;top:0;height:60px!important;overflow:hidden;z-index:9999}body>table:first-of-type td{background-image:var(--i-logo)!important;background-size:auto 30px!important;background-repeat:no-repeat!important;background-position:2em center!important;background-color:var(--c-card)!important;border-bottom:1px solid var(--c-border);display:flex;justify-content:end;align-items:center;position:relative;overflow:hidden;padding:1em 2em;height:100%!important;box-sizing:border-box}body>table:first-of-type td img{display:none}#menu{margin:0;padding:0 90px 0 0!important;list-style:none;display:flex!important;flex-wrap:wrap;flex-direction:row-reverse;gap:28px;justify-content:flex-start;float:right;width:fit-content!important;position:relative}#menu li:first-of-type{position:absolute;right:0!important;top:50%!important;transform:translateY(-50%);height:fit-content;width:fit-content}#menu li:first-of-type a{color:transparent;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-exit);background-size:80%;background-repeat:no-repeat;background-position:center center;border:none;display:block}.pku-art-theme-toggle-bar{position:absolute;right:42px;top:50%;transform:translateY(-50%)}#menu li a{padding:5px 2px;border-radius:8px;border:none;background:transparent;color:var(--c-text);font-size:13px;font-weight:500;text-decoration:none;transition:none;float:none;position:relative}#menu li:not(:first-child) a:hover{background:transparent;color:var(--c-accent);transition:all .3s ease-in-out}#menu li:not(:first-child) a:after{content:"";color:transparent;visibility:visible!important;position:absolute;border-bottom:2px solid var(--red-5);border-radius:2px;bottom:-2px;left:100%;width:0;-webkit-transition:width .35s,left .35s;-moz-transition:width .35s,left .35s;transition:width .35s,left .35s}#menu li:not(:first-child) a:hover:after{visibility:visible!important;left:0;width:100%;-webkit-transition:width .35s;-moz-transition:width .35s;transition:width .35s}body div[style*="pku_view.jpg"]{background:transparent!important}td[background*="/elective2008/resources/images/11-1.png"]{background:var(--c-card)!important;border:1px solid var(--c-border);border-radius:14px;padding:20px;margin-top:28px;position:relative}td[background*="/elective2008/resources/images/11-1.png"]:before{content:"";display:block;width:50px;height:50px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6);position:absolute;top:50%;transform:translateY(-50%);padding-left:50px}td[background*="/elective2008/resources/images/11-1.png"] *{color:var(--c-text)}.errmsg{display:inline-flex;align-items:center;gap:10px;padding:4px 12px!important;border-radius:999px;border:1px solid var(--red-4);background:var(--red-1);color:var(--red-6)!important;font-size:12px;margin:10px 0}body>table:last-of-type{margin:10px auto!important}body>table:last-of-type td{background:transparent;color:var(--c-text)!important}body>table:last-of-type td:after{content:"PKU Art @ Arthals";display:block;color:var(--c-text);padding-top:5px;height:20px}';
  const electivePlanStyles = 'body>table:not(:first-of-type),body>table:last-of-type{width:min(1180px,calc(100vw - 64px))!important;margin:0 auto;border-spacing:0}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2){background:var(--c-card);border:1px solid var(--c-border);border-radius:14px;padding:20px;margin-top:28px}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2):before{content:"选课计划列表";display:block;font-size:24px;font-weight:700;color:var(--c-title);margin:12px 0 24px}body>table:nth-of-type(2) td{padding:0;border:none}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]){float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:5px;padding:4px 12px!important;margin:0 0 8px;border-radius:999px;background:var(--red-1);border:1px solid var(--red-4);color:var(--red-6);font-size:12px;font-weight:500}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]) img{display:none}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]) td{width:fit-content!important}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]):before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6)}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]){float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:5px;padding:4px 12px!important;margin:0 0 8px;border-radius:999px;background:var(--green-1);border:1px solid var(--green-4);color:var(--green-6);font-size:12px;font-weight:500}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]) img{display:none}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]) td{width:fit-content!important}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]):before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-check-simple);-webkit-mask-image:var(--i-check-simple);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--green-6)}p.pkuportal-remark{display:none}td:has(img[src="/elective2008/resources/images/attention.jpg"]) img[src="/elective2008/resources/images/attention.jpg"]{display:none!important}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child{padding:2px 1px!important}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a{float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:10px;padding:4px 12px!important;margin:0;border-radius:999px;background:var(--blue-1);border:1px solid var(--blue-4);color:var(--blue-6);font-size:12px;font-weight:500}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a:before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-tip);-webkit-mask-image:var(--i-tip);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--blue-6)}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a:hover{background:var(--blue-2);border:1px solid var(--blue-5);color:var(--blue-7);transition:all .3s ease-in-out}a:link,a:visited{color:inherit;text-decoration:none}img[src*=arrow_red]{display:none!important}.subTitle{display:none}.errmsg{display:inline-flex;align-items:center;gap:10px;padding:4px 12px!important;border-radius:999px;border:1px solid var(--red-4);background:var(--red-1);color:var(--red-6);font-size:12px;margin-bottom:10px}.errmsg:before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6)}table.datagrid{border:none;border-collapse:collapse;margin-top:10px;color:var(--c-text)}table.datagrid tr.datagrid-header{color:var(--c-title);font-weight:700;padding-left:12px;background:transparent;border:none}table.datagrid tr.datagrid-header th.datagrid{border-width:2px 0px 1px 0px;border-style:solid;border-color:var(--c-border);background:transparent!important;padding:5px 0}table.datagrid tr.datagrid-header th.datagrid{text-align:center;vertical-align:middle}table.datagrid>tbody>tr.datagrid-even,table.datagrid>tbody>tr.datagrid-even:hover,table.datagrid>tbody>tr:nth-child(2n):not(.datagrid-header):not(:last-of-type){background:var(--c-card)!important}table.datagrid>tbody>tr.datagrid-odd,table.datagrid>tbody>tr.datagrid-odd:hover,table.datagrid>tbody>tr:nth-child(odd):not(.datagrid-header):not(:last-of-type){background:var(--gray-1)!important}table.datagrid>tbody td.datagrid{padding:5px}table.datagrid>tbody>tr.datagrid-footer{border:1px solid var(--c-border);height:1px}table.datagrid>tbody>tr:last-of-type td{padding-top:10px}table.datagrid>tbody>tr a{color:var(--blue-5)}table.datagrid>tbody td.pku-art-pnp-valid,table.datagrid>tbody td.pku-art-pnp-invalid{text-align:center;vertical-align:middle}table.datagrid>tbody td.pku-art-pnp-valid svg,table.datagrid>tbody td.pku-art-pnp-invalid svg{width:18px;height:18px;vertical-align:middle}';
  const electiveResultsStyles = 'body>table:not(:first-of-type),body>table:last-of-type{width:min(1180px,calc(100vw - 64px))!important;margin:0 auto;border-spacing:0}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2){background:var(--c-card);border:1px solid var(--c-border);border-radius:14px;padding:20px;margin-top:28px}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2) td{padding:0;border:none}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2):before{content:"选课结果";display:block;font-size:24px;font-weight:700;color:var(--c-title);margin:12px 0 24px}body>table:nth-of-type(2) td[colspan="0"] div{gap:10px;padding:4px 12px!important;border-radius:999px;border:1px solid var(--red-4);background:var(--red-1);color:var(--red-6)!important;font-size:12px!important;margin-bottom:10px;display:flex;width:fit-content;align-items:center;justify-content:center}body>table:nth-of-type(2) td[colspan="0"] div:before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6)}body>table:nth-of-type(2) td[colspan="0"] .message_success{display:none}.pkuportal-remark{display:none}a:link,a:visited{color:inherit;text-decoration:none}a:link{color:var(--blue-5)}img[src*=arrow_red]{display:none!important}table.datagrid{border:none;border-collapse:collapse;margin-top:10px;color:var(--c-text)}table.datagrid tr.datagrid-header{color:var(--c-title);font-weight:700;padding-left:12px;background:transparent;border:none}table.datagrid tr.datagrid-header th.datagrid{border-width:2px 0px 1px 0px;border-style:solid;border-color:var(--c-border);background:transparent!important;padding:5px 0}table.datagrid tr.datagrid-header th.datagrid{text-align:center;vertical-align:middle}table.datagrid>tbody>tr.datagrid-even,table.datagrid>tbody>tr.datagrid-even:hover,table.datagrid>tbody>tr:nth-child(2n):not(.datagrid-header):not(:last-of-type){background:var(--c-card)!important}table.datagrid>tbody>tr.datagrid-odd,table.datagrid>tbody>tr.datagrid-odd:hover,table.datagrid>tbody>tr:nth-child(odd):not(.datagrid-header):not(:last-of-type){background:var(--gray-1)!important}table.datagrid>tbody td.datagrid{padding:5px}table.datagrid>tbody>tr.datagrid-footer{border:1px solid var(--c-border);height:1px}table.datagrid>tbody>tr:last-of-type td{padding-top:10px}table.datagrid>tbody>tr a{color:var(--blue-5)}table.datagrid>tbody>tr span[style="color:red"]{color:var(--red-6)!important}#classAssignment{border:none;color:#000;border-collapse:collapse}#classAssignment caption{border:none;margin-bottom:10px}#classAssignment caption span{color:var(--c-title)!important;font-weight:700;font-size:20px!important}#classAssignment tr.course-header{color:var(--c-title);font-weight:700;padding-left:12px;background:transparent;border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--c-border)}#classAssignment tr.course-header .course{border:none;padding:5px 0}#classAssignment tr:not(.course-header) td:first-of-type{color:var(--c-title)!important}#classAssignment tbody{border-width:2px 0px 2px 0px;border-style:solid;border-color:var(--c-border)}';
  const electiveHelpStyles = 'body>table:not(:first-of-type),body>table:last-of-type{width:min(1180px,calc(100vw - 64px))!important;margin:0 auto;border-spacing:0}body>table:not(:first-of-type):not(:last-of-type){background:var(--c-card);border-width:0px 1px 0px 1px;border-style:solid;border-color:var(--c-border);padding:20px}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2){background:var(--c-card);border:1px solid var(--c-border);border-radius:14px 14px 0 0;padding:20px;margin-top:28px;border-bottom:0;border-top:1px solid var(--c-border)!important}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2):before{content:"帮助页面";display:block;font-size:24px;font-weight:700;color:var(--c-title);margin:12px 0 24px}body>table:nth-of-type(2) td{padding:0;border:none}body>table:nth-last-of-type(2){border-radius:0 0 14px 14px;border-bottom:1px solid var(--c-border)!important}tbody{position:relative}tr:has(.red){position:relative}.red{display:inline-flex;align-items:center;gap:10px;padding:4px 12px!important;border-radius:999px;border:1px solid var(--red-4);background:var(--red-1);color:var(--red-6);font-size:12px;width:fit-content!important;white-space:nowrap;position:absolute;left:50%;transform:translate(-50%)}.red:before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6)}td:has(+.red){display:none}.red+td{display:none}td.pkuportal-important{color:var(--c-title)!important;font-weight:700;font-size:1.2rem!important;text-indent:-.5ch;padding:10px 0}td.pkuportal-important img{display:none}td:has(>img[src="/elective2008/resources/images/s.jpg"]):not(:has(>*:nth-of-type(2))){padding:10px 0;color:transparent;height:0px;overflow:hidden}td:has(>img[src="/elective2008/resources/images/s.jpg"]):not(:has(>*:nth-of-type(2)))>img{display:none}td:has(>img[src="/elective2008/resources/images/s.jpg"]):not(:has(>*:nth-of-type(2))):before{content:"";display:block;width:100%;color:transparent;border-bottom:1px solid var(--c-border)}.pkuportal-remark{color:var(--gray-7)!important}a.titlelink2:link,a.titlelink2:visited,a.titlelink2:active{color:var(--blue-6)!important;text-decoration:none}a.titlelink2:hover{color:var(--blue-7)!important;text-decoration:none;top:0!important;left:0!important}img[src*="/elective2008/resources/images/1-4.jpg"]{display:none}.pkuportal-table-portlet td,span,div,input{font-size:14px}.pkuportal-important{color:var(--red-6)!important}table.datagrid{border:none;border-collapse:collapse;margin-top:10px;color:var(--c-text);border-width:2px 0px 2px 0px;border-style:solid;border-color:var(--c-border)}table.datagrid tr.datagrid-header{color:var(--c-title);font-weight:700;padding-left:12px;background:transparent;border:none}table.datagrid tr.datagrid-header th.datagrid{border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--c-border);background:transparent!important;padding:5px 0}table.datagrid tr.datagrid-header th.datagrid{text-align:center;vertical-align:middle}table.datagrid>tbody>tr.datagrid-even,table.datagrid>tbody>tr.datagrid-even:hover,table.datagrid>tbody>tr:nth-child(2n):not(.datagrid-header):not(:last-of-type){background:var(--c-card)!important}table.datagrid>tbody>tr.datagrid-odd,table.datagrid>tbody>tr.datagrid-odd:hover,table.datagrid>tbody>tr:nth-child(odd):not(.datagrid-header):not(:last-of-type){background:var(--gray-1)!important}table.datagrid>tbody td.datagrid{padding:5px;border:none}table.datagrid>tbody>tr.datagrid-footer{border:1px solid var(--c-border);height:1px}table.datagrid>tbody>tr:last-of-type td{padding-top:10px}table.datagrid>tbody>tr a{color:var(--blue-5)}table.datagrid>tbody>tr span[style="color:red"]{color:var(--red-6)!important}';
  const electiveDetailStyles = 'body{position:relative}body:before{position:sticky;content:"";background-image:var(--i-logo);background-size:auto 30px;background-repeat:no-repeat;background-position:2em center;background-color:var(--c-card);border-bottom:1px solid var(--c-border);overflow:hidden;padding:1em 2em;height:60px;box-sizing:border-box;display:block}p[style*="color: #39961D"]{color:var(--c-title)!important;font-size:24px!important;font-weight:700;margin:10px auto}body>table:has(.pkuportal-table-portlet){width:min(1180px,calc(100vw - 64px))!important}td:has(>.pkuportal-table-portlet){background:var(--c-card);padding:20px;border-radius:14px;border:1px solid var(--c-border)}.pkuportal-table-portlet{border-collapse:collapse;border-width:2px 0px 2px 0px;border-style:solid;border-color:var(--c-border);margin:0 auto}.pkuportal-table-portlet th,.pkuportal-table-portlet td{padding:5px;color:var(--c-text);font-size:14px;border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--c-border)}.pkuportal-table-portlet .pkuportal-td-title{color:var(--c-title);background:transparent;font-weight:700;margin:10px auto}.pkuportal-table-portlet>tbody>tr.datagrid-even,.pkuportal-table-portlet>tbody>tr.datagrid-even:hover,.pkuportal-table-portlet>tbody>tr:nth-child(2n):not(.datagrid-header):not(:last-of-type){background:var(--c-card)!important}.pkuportal-table-portlet>tbody>tr.datagrid-odd,.pkuportal-table-portlet>tbody>tr.datagrid-odd:hover,.pkuportal-table-portlet>tbody>tr:nth-child(odd):not(.datagrid-header):not(:last-of-type){background:var(--gray-1)!important}body:after{content:"PKU Art @ Arthals";display:block;color:var(--c-text);padding-top:5px;height:20px;visibility:visible!important;margin:10px auto;width:fit-content}';
  const electiveCourseQueryStyles = 'body{background:var(--c-background)!important;color:var(--c-text);font-size:14px;line-height:1.6;padding-bottom:48px}*,*:before,*:after{text-shadow:none!important;box-shadow:none!important;line-height:1.2rem}body{position:relative}body>table:first-of-type{margin:0!important;width:100%;position:sticky;top:0;height:60px!important;overflow:hidden;z-index:9999}body>table:first-of-type td{background-image:var(--i-logo)!important;background-size:auto 30px!important;background-repeat:no-repeat!important;background-position:2em center!important;background-color:var(--c-card)!important;border-bottom:1px solid var(--c-border);display:flex;justify-content:end;align-items:center;position:relative;overflow:hidden;padding:1em 2em;height:100%!important;box-sizing:border-box}body>table:first-of-type td img{display:none}#menu{margin:0;padding:0 90px 0 0!important;list-style:none;display:flex!important;flex-wrap:wrap;flex-direction:row-reverse;gap:28px;justify-content:flex-start;float:right;width:fit-content!important;position:relative}#menu li:first-of-type{position:absolute;right:0!important;top:50%!important;transform:translateY(-50%);height:fit-content;width:fit-content}#menu li:first-of-type a{color:transparent;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-exit);background-size:80%;background-repeat:no-repeat;background-position:center center;border:none;display:block}.pku-art-theme-toggle-bar{position:absolute;right:42px;top:50%;transform:translateY(-50%)}#menu li a{padding:5px 2px;border-radius:8px;border:none;background:transparent;color:var(--c-text);font-size:13px;font-weight:500;text-decoration:none;transition:none;float:none;position:relative}#menu li:not(:first-child) a:hover{background:transparent;color:var(--c-accent);transition:all .3s ease-in-out}#menu li:not(:first-child) a:after{content:"";color:transparent;visibility:visible!important;position:absolute;border-bottom:2px solid var(--red-5);border-radius:2px;bottom:-2px;left:100%;width:0;-webkit-transition:width .35s,left .35s;-moz-transition:width .35s,left .35s;transition:width .35s,left .35s}#menu li:not(:first-child) a:hover:after{visibility:visible!important;left:0;width:100%;-webkit-transition:width .35s;-moz-transition:width .35s;transition:width .35s}body div[style*="pku_view.jpg"]{background:transparent!important}td[background*="/elective2008/resources/images/11-1.png"]{background:var(--c-card)!important;border:1px solid var(--c-border);border-radius:14px;padding:20px;margin-top:28px;position:relative}td[background*="/elective2008/resources/images/11-1.png"]:before{content:"";display:block;width:50px;height:50px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6);position:absolute;top:50%;transform:translateY(-50%);padding-left:50px}td[background*="/elective2008/resources/images/11-1.png"] *{color:var(--c-text)}.errmsg{display:inline-flex;align-items:center;gap:10px;padding:4px 12px!important;border-radius:999px;border:1px solid var(--red-4);background:var(--red-1);color:var(--red-6)!important;font-size:12px;margin:10px 0}body>table:not(:first-of-type),body>table:last-of-type{margin:0 auto;border-spacing:0}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2){background:var(--c-card);border:1px solid var(--c-border);border-radius:14px;padding:20px;margin-top:28px}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2):before{content:"添加选课计划课程";display:block;font-size:24px;font-weight:700;color:var(--c-title);margin:12px 0 24px}body>table:nth-of-type(2) td{padding:0;border:none}.pkuportal-remark{display:none}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]){float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:5px;padding:4px 12px!important;margin:0 0 8px;border-radius:999px;background:var(--red-1);border:1px solid var(--red-4);color:var(--red-6);font-size:12px;font-weight:500}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]) img{display:none}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]) td{width:fit-content!important}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]):before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6)}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]){float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:5px;padding:4px 12px!important;margin:0 0 8px;border-radius:999px;background:var(--green-1);border:1px solid var(--green-4);color:var(--green-6);font-size:12px;font-weight:500}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]) img{display:none}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]) td{width:fit-content!important}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]):before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-check-simple);-webkit-mask-image:var(--i-check-simple);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--green-6)}td:has(img[src="/elective2008/resources/images/attention.jpg"]) img[src="/elective2008/resources/images/attention.jpg"]{display:none!important}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child{padding:2px 1px!important}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a{float:none!important;display:inline-flex!important;align-items:center;gap:10px;padding:4px 12px!important;margin:0;border-radius:999px;background:var(--blue-1);border:1px solid var(--blue-4);color:var(--blue-6);font-size:12px;font-weight:500}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a:before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-tip);-webkit-mask-image:var(--i-tip);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--blue-6)}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a:hover{background:var(--blue-2);border:1px solid var(--blue-5);color:var(--blue-7);transition:all .3s ease-in-out}a:link,a:visited{color:inherit;text-decoration:none}#qyForm tr:has(>#kcfl){padding:10px;display:flex;justify-content:center;align-items:center}#qyForm tr:has(>#kcfl) *{font-size:14px;color:var(--c-text);width:fit-content}#kcfl{gap:12px!important;flex-wrap:wrap}#kcfl span{display:none}#kcfl input[type=radio]{-moz-appearance:none;appearance:none;-webkit-appearance:none;display:inline-flex;align-items:center;padding:6px 12px;border-radius:999px;background:var(--c-button);border:1px solid var(--c-border);color:var(--ui-text);font-size:12px;font-weight:500;cursor:pointer;-webkit-user-select:none;user-select:none;position:relative;margin:0;box-sizing:border-box}#kcfl input[type=radio]:before{content:"";width:14px;height:14px;border:1px solid var(--c-border);border-radius:50%;background:var(--gray-4);margin-right:8px;flex-shrink:0;box-sizing:border-box;transition:all .2s ease}#kcfl input[type=radio]:after{color:var(--c-text);transition:color .2s ease}#education_plan_bk:after{content:"培养方案"}#speciality:after{content:"专业课"}#politics:after{content:"政治课"}#english:after{content:"英语课"}#gym:after{content:"体育课"}#tsk_choice:after{content:"通识课"}#pub_choice:after{content:"公选课"}#liberal_computer:after{content:"计算机基础课"}#ldjyk:after{content:"劳动教育课"}#szxzxbx:after{content:"思政选择性必修课"}#kcfl input[type=radio]:hover{border-color:var(--red-4);background:var(--red-1)}#kcfl input[type=radio]:hover:before{border-color:var(--red-4);background-color:var(--red-4)}#kcfl input[type=radio]:checked{background:var(--red-5);border-color:var(--red-5)}#kcfl input[type=radio]:checked:before{background-size:11px 11px;mask-image:var(--i-check-simple);-webkit-mask-image:var(--i-check-simple);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:#fff}#kcfl input[type=radio]:checked:after{color:#fff}#kcfl input[type=radio]:focus-visible{outline:2px solid var(--ui-primary);outline-offset:2px}#kcfl input[type=radio]:disabled{opacity:.5;cursor:not-allowed}table.datagrid{border:none;border-collapse:collapse;margin-top:10px;color:var(--c-text)}table.datagrid tr.datagrid-header{color:var(--c-title);font-weight:700;padding-left:12px;background:transparent;border:none}table.datagrid tr.datagrid-header th.datagrid{border-width:2px 0px 1px 0px;border-style:solid;border-color:var(--c-border);background:transparent!important;padding:5px 0}table.datagrid tr.datagrid-header th.datagrid{text-align:center;vertical-align:middle}table.datagrid>tbody>tr.datagrid-even,table.datagrid>tbody>tr.datagrid-even:hover,table.datagrid>tbody>tr:nth-child(2n):not(.datagrid-header):not(:last-of-type){background:var(--c-card)!important}table.datagrid>tbody>tr.datagrid-odd,table.datagrid>tbody>tr.datagrid-odd:hover,table.datagrid>tbody>tr:nth-child(odd):not(.datagrid-header):not(:last-of-type){background:var(--gray-1)!important}table.datagrid>tbody td.datagrid{padding:5px}table.datagrid>tbody>tr.datagrid-footer{border:1px solid var(--c-border);height:1px}table.datagrid>tbody>tr:last-of-type td{padding-top:10px}table.datagrid>tbody>tr a{color:var(--blue-5)}table.datagrid>tbody>tr span[style="color:red"]{color:var(--red-6)!important}tr[valign=left]{display:grid;grid-template-columns:repeat(3,80px 1fr);flex-wrap:wrap;gap:10px;padding:0;border-radius:12px;align-items:center}tr[valign=left]>td:nth-child(2),tr[valign=left]>td:nth-child(4),tr[valign=left]>td:nth-child(6),tr[valign=left]>td:nth-child(2)>*[style*="width:"],tr[valign=left]>td:nth-child(4)>*[style*="width:"],tr[valign=left]>td:nth-child(6)>*[style*="width:"]{box-sizing:border-box;width:100%!important;height:100%!important}tr[valign=left]>td:nth-child(8){grid-column:span 3;display:block;width:100%}tr[valign=left]>td:nth-child(8) tr{display:flex;justify-content:space-between;gap:10px;align-items:center}tr[valign=left]>td:nth-child(8) tr td{padding:0}tr[valign=left]>td{display:flex!important;align-items:center;gap:8px;margin:0;padding:0;flex-shrink:0}tr[valign=left]>td:not(:has(input)):not(:has(select)):not(:has(table)){color:var(--c-title);font-size:14px;font-weight:500;white-space:nowrap}tr[valign=left] div[style*="font-size:15px"]{color:var(--red-5);font-size:16px;font-weight:600;float:none;margin:0 2px 0 0}tr[valign=left] input[type=text].selectize-input{-moz-appearance:none;appearance:none;-webkit-appearance:none;padding:8px 12px;border:1px solid var(--c-border);border-radius:8px;background:var(--c-input-bg);color:var(--c-title);font-size:14px;outline:none;box-sizing:border-box}tr[valign=left] input[type=text].selectize-input:hover{border-color:var(--red-4);background:var(--c-focus)}tr[valign=left] input[type=text].selectize-input:focus{background:var(--c-focus)}tr[valign=left] select.selectized{display:none}tr[valign=left] .selectize-control{min-width:150px}tr[valign=left] .selectize-input:before{display:none}tr[valign=left] .selectize-input{padding:8px 12px;border:1px solid var(--c-border)!important;border-radius:8px;background:var(--c-input-bg)!important;color:var(--c-title);font-size:14px;box-shadow:none;min-height:auto;line-height:1.5}tr[valign=left] .selectize-input:hover{border-color:var(--red-4);background:var(--c-focus)}tr[valign=left] .selectize-input.focus,tr[valign=left] .selectize-input.dropdown-active{border-color:var(--red-5);background:var(--c-focus)}tr[valign=left] .selectize-input .item{padding:0;margin:0;background:transparent;border:none;color:var(--c-title);font-size:14px}tr[valign=left] .selectize-dropdown{border:1px solid var(--c-border);border-radius:8px;background:var(--c-card);margin-top:4px;padding:4px;max-height:300px;overflow-y:auto;z-index:1000}tr[valign=left] .selectize-dropdown .option{padding:8px 12px;border-radius:6px;color:var(--c-text);font-size:14px;cursor:pointer;margin:2px 0}tr[valign=left] .selectize-dropdown .option:hover,tr[valign=left] .selectize-dropdown .option.active{background:var(--red-1);color:var(--red-6)}tr[valign=left] .selectize-dropdown .option.selected{background:var(--red-5);color:#fff;font-weight:500}tr[valign=left] td:has(>table[width="90%"]){flex:1;min-width:300px}tr[valign=left] td table[width="90%"]{width:100%!important;border-collapse:collapse}tr[valign=left] input[type=checkbox]{-moz-appearance:none;appearance:none;-webkit-appearance:none;width:18px;height:18px;border:2px solid var(--c-border);border-radius:4px;background:var(--c-input-bg);cursor:pointer;position:relative;margin:0;flex-shrink:0}tr[valign=left] input[type=checkbox]:hover{border-color:var(--red-4);background:var(--red-1)}tr[valign=left] input[type=checkbox]:checked{background:var(--red-5);border-color:var(--red-5)}tr[valign=left] input[type=checkbox]:checked:after{content:"";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:10px;height:10px;background:#fff;mask-image:var(--i-check-simple);-webkit-mask-image:var(--i-check-simple);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center}tr[valign=left] td:has(input[type=checkbox])+td{font-size:13px!important;color:var(--c-text)!important}tr[valign=left] input[type=button].selectize-input{-moz-appearance:none;appearance:none;-webkit-appearance:none;padding:8px 20px;border:none!important;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;outline:none;-webkit-user-select:none;user-select:none;white-space:nowrap}tr[valign=left] input[type=button]#b_query{background:var(--red-5)!important;color:#fff!important;box-sizing:border-box;height:38px}tr[valign=left] input[type=button]#b_query:hover{background:var(--red-6)!important}tr[valign=left] input[type=button]#b_cancel{width:fit-content;background:var(--c-button)!important;color:var(--c-text)!important;border:1px solid var(--c-border)!important;box-sizing:border-box;height:38px}tr[valign=left] input[type=button]#b_cancel:hover{background:var(--c-button-hover)!important;border-color:var(--red-4)!important;color:var(--red-5)!important}tr[valign=left] input[type=button]#b_cancel:active{border:1px solid var(--c-border);border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;outline:none;-webkit-user-select:none;user-select:none;white-space:nowrap;padding:8px 20px;box-sizing:border-box;background:var(--c-button)}tr[valign=left] input[type=hidden]{display:none!important}tr[valign=left] input:focus-visible,tr[valign=left] .selectize-input.focus{outline:none}tr[valign=left] input:disabled,tr[valign=left] .selectize-input.disabled{opacity:.5!important;cursor:not-allowed!important}.pku-art-navigation-area{display:flex!important;gap:12px;background:var(--c-card)!important;border-radius:12px!important;margin-top:16px;justify-content:flex-end;align-items:center;width:100%!important;font-size:0!important}.pku-art-navigation-area>*:not(form){font-size:14px!important;color:var(--c-text)!important;display:inline-flex!important;align-items:center;gap:8px}.pku-art-navigation-area a,.pku-art-navigation-area span:not(:has(select)){display:inline-flex!important;align-items:center;justify-content:center;min-width:32px;height:32px;padding:0 12px;border-radius:6px;font-size:14px!important;font-weight:500;text-decoration:none!important;cursor:pointer;-webkit-user-select:none;user-select:none;white-space:nowrap;box-sizing:border-box}.pku-art-navigation-area a{background:var(--c-button)!important;color:var(--c-text)!important;border:1px solid var(--c-border)}.pku-art-navigation-area a:hover{background:var(--red-1)!important;color:var(--red-5)!important;border-color:var(--red-4)}.pku-art-navigation-area span:not(:has(select)){background:transparent!important;color:var(--c-subtitle)!important;cursor:default;border:1px solid transparent}.pku-art-navigation-area:after{content:"";width:1px;height:20px;background:var(--c-border);margin:0 4px}.pku-art-navigation-area form[name=pageForm]{display:inline-flex!important;align-items:center;gap:8px;margin:0!important;padding:0!important}.pku-art-navigation-area form:before{content:"跳转到:";color:var(--c-text);font-size:14px!important;font-weight:500;white-space:nowrap}.pku-art-navigation-area form{font-size:0!important}.pku-art-navigation-area script{display:none!important}.pku-art-navigation-area select[name=netui_row]{-moz-appearance:none;appearance:none;-webkit-appearance:none;min-width:80px;height:32px;padding:0 32px 0 12px;border:1px solid var(--c-border);border-radius:6px;background:var(--c-input-bg);color:var(--c-title);font-size:14px;font-weight:500;cursor:pointer;outline:none;background-image:var(--i-arrow)!important;background-repeat:no-repeat;background-position:right 8px center;background-size:16px}.pku-art-navigation-area select[name=netui_row]:hover{border-color:var(--red-4)!important;background-color:var(--c-focus)!important}.pku-art-navigation-area select[name=netui_row]:focus{border-color:var(--red-5)!important;box-shadow:0 0 0 3px var(--red-1)!important;background-color:var(--c-focus)!important}.pku-art-navigation-area select[name=netui_row] option{padding:8px 12px;background:var(--c-card);color:var(--c-title);font-size:14px}.pku-art-navigation-area select[name=netui_row] option:hover,.pku-art-navigation-area select[name=netui_row] option:checked{background:var(--red-1);color:var(--red-5)}.pku-art-navigation-area:after{content:none}table.datagrid>tbody td.pku-art-pnp-valid,table.datagrid>tbody td.pku-art-pnp-invalid{text-align:center;vertical-align:middle}table.datagrid>tbody td.pku-art-pnp-valid svg,table.datagrid>tbody td.pku-art-pnp-invalid svg{width:18px;height:18px;vertical-align:middle}';
  const electiveFaqStyles = 'body>table:not(:first-of-type),body>table:last-of-type{width:min(1180px,calc(100vw - 64px))!important;margin:0 auto;border-spacing:0}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table.datagrid{background:var(--c-card);border:1px solid var(--c-border);border-radius:14px;padding:20px;margin-top:28px}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table.datagrid td{padding:0;border:none}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table.datagrid:before{content:"选课 FAQ";display:block;font-size:24px;font-weight:700;color:var(--c-title);margin:12px 0 24px}table.datagrid{padding:20px;display:flex;flex-direction:column;position:relative}table.datagrid td{font-size:14px}table.datagrid tbody{display:flex;flex-direction:column;gap:10px}.pagehead,.datagrid-header{display:none}table.datagrid tr.datagrid-even{background:var(--c-card)!important}table.datagrid tr.datagrid-even td{font-size:1.2rem!important;font-weight:700!important;color:var(--c-title)!important}';
  const electiveWorkStyles = 'body{background:var(--c-background)!important;color:var(--c-text);font-size:14px;line-height:1.6;padding-bottom:48px}*,*:before,*:after{text-shadow:none!important;box-shadow:none!important;line-height:1.5}body{position:relative}body>#scopeOneSpan>table:first-of-type{margin:0!important;width:100%;position:sticky;top:0;height:60px!important;overflow:hidden;z-index:9999}body>#scopeOneSpan>table:first-of-type td{background-image:var(--i-logo)!important;background-size:auto 30px!important;background-repeat:no-repeat!important;background-position:2em center!important;background-color:var(--c-card)!important;border-bottom:1px solid var(--c-border);display:flex;justify-content:end;align-items:center;position:relative;overflow:hidden;padding:1em 2em;height:100%!important;box-sizing:border-box}body>#scopeOneSpan>table:first-of-type td img{display:none}#menu{margin:0;padding:0 90px 0 0!important;list-style:none;display:flex!important;flex-wrap:wrap;flex-direction:row-reverse;gap:28px;justify-content:flex-start;float:right;width:fit-content!important;position:relative}#menu li:first-of-type{position:absolute;right:0!important;top:50%!important;transform:translateY(-50%);height:fit-content;width:fit-content}#menu li:first-of-type a{color:transparent;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-exit);background-size:80%;background-repeat:no-repeat;background-position:center center;border:none;display:block}.pku-art-theme-toggle-bar{position:absolute;right:42px;top:50%;transform:translateY(-50%)}#menu li a{padding:5px 2px;border-radius:8px;border:none;background:transparent;color:var(--c-text);font-size:13px;font-weight:500;text-decoration:none;transition:none;float:none;position:relative}#menu li:not(:first-child) a:hover{background:transparent;color:var(--c-accent);transition:all .3s ease-in-out}#menu li:not(:first-child) a:after{content:"";color:transparent;visibility:visible!important;position:absolute;border-bottom:2px solid var(--red-5);border-radius:2px;bottom:-2px;left:100%;width:0;-webkit-transition:width .35s,left .35s;-moz-transition:width .35s,left .35s;transition:width .35s,left .35s}#menu li:not(:first-child) a:hover:after{visibility:visible!important;left:0;width:100%;-webkit-transition:width .35s;-moz-transition:width .35s;transition:width .35s}body div[style*="pku_view.jpg"]{background:transparent!important}td[background*="/elective2008/resources/images/11-1.png"]{background:var(--c-card)!important;border:1px solid var(--c-border);border-radius:14px;padding:20px;margin-top:28px;position:relative}td[background*="/elective2008/resources/images/11-1.png"]:before{content:"";display:block;width:50px;height:50px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6);position:absolute;top:50%;transform:translateY(-50%);padding-left:50px}td[background*="/elective2008/resources/images/11-1.png"] *{color:var(--c-text)}.errmsg{display:inline-flex;align-items:center;gap:10px;padding:4px 12px!important;border-radius:999px;border:1px solid var(--red-4);background:var(--red-1);color:var(--red-6)!important;font-size:12px;margin:10px 0}body>#scopeOneSpan>table:last-of-type{margin:10px auto!important}body>#scopeOneSpan>table:last-of-type td{background:transparent;color:var(--c-text)!important}body>#scopeOneSpan>table:last-of-type td:after{content:"PKU Art @ Arthals";display:block;color:var(--c-text);padding-top:5px;height:20px}body>#scopeOneSpan>table:not(:first-of-type),body>#scopeOneSpan>table:last-of-type{width:min(1180px,calc(100vw - 64px))!important;margin:0 auto;border-spacing:0}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>#scopeOneSpan>table:nth-of-type(2){background:var(--c-card);border:1px solid var(--c-border);border-radius:14px;padding:20px;margin-top:28px}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>#scopeOneSpan>table:nth-of-type(2):before{content:"预选";display:block;font-size:24px;font-weight:700;color:var(--c-title);margin:12px 0 24px}body>#scopeOneSpan>table:nth-of-type(2) td{padding:0;border:none}p.pkuportal-remark{font-size:0}td.message_success{display:none}td.pku-art-elective-notice{display:flex;flex-direction:column;gap:5px;background:var(--c-card);border:1px solid var(--c-border);border-radius:12px;margin:0 auto}td.pku-art-elective-notice>span:first-child{font-size:13px;font-weight:700;color:var(--c-title)}span.errmsg{width:fit-content}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]){float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:5px;padding:4px 12px!important;margin:0 0 8px;border-radius:999px;background:var(--red-1);border:1px solid var(--red-4);color:var(--red-6);font-size:12px;font-weight:500}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]) img{display:none}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]) td{width:fit-content!important}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]):before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6)}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]){float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:5px;padding:4px 12px!important;margin:0 0 8px;border-radius:999px;background:var(--green-1);border:1px solid var(--green-4);color:var(--green-6);font-size:12px;font-weight:500}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]) img{display:none}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]) td{width:fit-content!important}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]):before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-check-simple);-webkit-mask-image:var(--i-check-simple);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--green-6)}td:has(img[src="/elective2008/resources/images/attention.jpg"]) img[src="/elective2008/resources/images/attention.jpg"]{display:none!important}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child{padding:2px 1px!important}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a{float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:10px;padding:4px 12px!important;margin:0;border-radius:999px;background:var(--blue-1);border:1px solid var(--blue-4);color:var(--blue-6);font-size:12px;font-weight:500}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a:before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-tip);-webkit-mask-image:var(--i-tip);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--blue-6)}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a:hover{background:var(--blue-2);border:1px solid var(--blue-5);color:var(--blue-7);transition:all .3s ease-in-out}a:link,a:visited{color:inherit;text-decoration:none}img[src*=arrow_red]{display:none!important}.subTitle{display:none}.errmsg{display:inline-flex;align-items:center;gap:10px;padding:4px 12px!important;border-radius:999px;border:1px solid var(--red-4);background:var(--red-1);color:var(--red-6);font-size:12px;margin-bottom:10px}.errmsg:before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6)}table.datagrid{border:none;border-collapse:collapse;margin-top:10px;color:var(--c-text)}table.datagrid tr.datagrid-header{color:var(--c-title);font-weight:700;padding-left:12px;background:transparent;border:none}table.datagrid tr.datagrid-header th.datagrid{border-width:2px 0px 1px 0px;border-style:solid;border-color:var(--c-border);background:transparent!important;padding:12px 8px!important;text-align:center;vertical-align:middle}table.datagrid>tbody>tr.datagrid-even,table.datagrid>tbody>tr.datagrid-even:hover,table.datagrid>tbody>tr:nth-child(2n):not(.datagrid-header):not(:last-of-type){background:var(--c-card)!important}table.datagrid>tbody>tr.datagrid-odd,table.datagrid>tbody>tr.datagrid-odd:hover,table.datagrid>tbody>tr:nth-child(odd):not(.datagrid-header):not(:last-of-type){background:var(--gray-1)!important}table.datagrid>tbody td.datagrid{padding:5px!important;line-height:1.6!important}table.datagrid>tbody>tr.datagrid-footer{border:1px solid var(--c-border);height:1px}table.datagrid>tbody>tr:last-of-type td{padding-top:10px!important}body:has(.pku-art-navigation-area) table.datagrid>tbody>tr:last-of-type td[align=right]{display:none!important}table.datagrid>tbody>tr a{color:var(--blue-5)}table.datagrid>tbody td.pku-art-pnp-valid,table.datagrid>tbody td.pku-art-pnp-invalid{text-align:center;vertical-align:middle}table.datagrid>tbody td.pku-art-pnp-valid svg,table.datagrid>tbody td.pku-art-pnp-invalid svg{width:18px;height:18px;vertical-align:middle}span.pkuportal-remark:not(:has(span)){float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:10px;padding:4px 12px!important;margin:10px 0 0;border-radius:999px;background:var(--blue-1);border:1px solid var(--blue-4);color:var(--blue-6);font-size:12px;font-weight:500}span.pkuportal-remark:not(:has(span)):before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-tip);-webkit-mask-image:var(--i-tip);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--blue-6)}font.pkuportal-remark:not(:has(span)){display:inline-flex!important;color:var(--blue-6);padding:0 12px!important;font-size:12px!important;font-weight:500}.pku-art-navigation-area{display:flex!important;align-items:center;gap:12px;background:var(--c-card)!important;border-radius:12px!important;margin-top:16px;justify-content:flex-end;width:100%!important;font-size:0!important}.pku-art-navigation-area>*:not(form){font-size:14px!important;color:var(--c-text)!important;display:inline-flex!important;align-items:center;gap:8px}.pku-art-navigation-area a,.pku-art-navigation-area span:not(:has(select)){display:inline-flex!important;align-items:center;justify-content:center;min-width:32px;height:32px;padding:0 12px;border-radius:6px;font-size:14px!important;font-weight:500;text-decoration:none!important;cursor:pointer;-webkit-user-select:none;user-select:none;white-space:nowrap;box-sizing:border-box}.pku-art-navigation-area a{background:var(--c-button)!important;color:var(--c-text)!important;border:1px solid var(--c-border)}.pku-art-navigation-area a:hover{background:var(--red-1)!important;color:var(--red-5)!important;border-color:var(--red-4)}.pku-art-navigation-area span:not(:has(select)){background:transparent!important;color:var(--c-subtitle)!important;cursor:default;border:1px solid transparent}.pku-art-navigation-area form[name=pageForm]{display:inline-flex!important;align-items:center;gap:8px;margin:0!important;padding:0!important}.pku-art-navigation-area form:before{content:"跳转到:";color:var(--c-text);font-size:14px!important;font-weight:500;white-space:nowrap}.pku-art-navigation-area form{font-size:0!important}.pku-art-navigation-area script{display:none!important}.pku-art-navigation-area select[name=netui_row]{-moz-appearance:none;appearance:none;-webkit-appearance:none;min-width:80px;height:32px;padding:0 32px 0 12px;border:1px solid var(--c-border);border-radius:6px;background:var(--c-input-bg);color:var(--c-title);font-size:14px;font-weight:500;cursor:pointer;outline:none;background-image:var(--i-arrow)!important;background-repeat:no-repeat;background-position:right 8px center;background-size:16px}.pku-art-navigation-area select[name=netui_row]:hover{border-color:var(--red-4)!important;background-color:var(--c-focus)!important}.pku-art-navigation-area select[name=netui_row]:focus{border-color:var(--red-5)!important;box-shadow:0 0 0 3px var(--red-1)!important;background-color:var(--c-focus)!important}.pku-art-navigation-area select[name=netui_row] option{padding:8px 12px;background:var(--c-card);color:var(--c-title);font-size:14px}.pku-art-navigation-area select[name=netui_row] option:hover,.pku-art-navigation-area select[name=netui_row] option:checked{background:var(--red-1);color:var(--red-5)}';
  function injectStyles(styleString, cssFileName) {
    const styleElement = document.createElement("style");
    styleElement.textContent = styleString;
    styleElement.dataset.cssFileName = cssFileName;
    styleElement.dataset.author = "Arthals";
    styleElement.className = "PKU-Art";
    document.documentElement.appendChild(styleElement);
  }
  const currentUrl = window.location.href;
  const globalStyleScopes = [
    /^https:\/\/iaaa\.pku\.edu\.cn\/\S*$/,
    /^https:\/\/course\.pku\.edu\.cn\/\S*$/,
    /^https:\/\/onlineroomse\.pku\.edu\.cn\/\S*$/,
    /^https:\/\/elective\.pku\.edu\.cn\/\S*$/

];
  const styleRules = [
    {
      patterns: globalStyleScopes,
      excludePatterns: [],
      styleContent: mainStyles,
      fileName: "main.css"
    },
    {
      patterns: globalStyleScopes,
      excludePatterns: [],
      styleContent: arcoPaletteStyles,
      fileName: "arco-palette.css"
    },
    {
      patterns: [/^https:\/\/iaaa\.pku\.edu\.cn\/\S*$/],
      excludePatterns: [],
      styleContent: iaaaOAuthPageStyles,
      fileName: "iaaaOAuthPage.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/login\S*$/, /^https:\/\/course\.pku\.edu\.cn[\/]?$/],
      excludePatterns: [],
      styleContent: courseLoginPageStyles,
      fileName: "courseLoginPage.css"
    },
    {
      patterns: [
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/?$/,
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/portal\/\S*$/
      ],
      excludePatterns: [],
      styleContent: courseHomePageStyles,
      fileName: "courseHomePage.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*$/],
      excludePatterns: [],
      styleContent: courseContentStyles,
      fileName: "courseContent.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\S*announcement\S*$/],
      excludePatterns: [],
      styleContent: courseAnnouncementStyles,
      fileName: "courseAnnouncement.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*getTeachingStaffList\S*$/],
      excludePatterns: [],
      styleContent: courseTeachingStaffListStyles,
      fileName: "courseTeachingStaffList.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*classinCourseClass\S*$/],
      excludePatterns: [],
      styleContent: courseClassinStyles,
      fileName: "courseClassin.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*blankPage\S*$/],
      excludePatterns: [],
      styleContent: courseBlankPageStyles,
      fileName: "courseBlankPage.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*videoList\S*$/],
      excludePatterns: [],
      styleContent: courseVideolistStyles,
      fileName: "courseVideolist.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*((discussionboard)|(groupContentList))\S*$/],
      excludePatterns: [],
      styleContent: courseOtherStyles,
      fileName: "courseOther.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*myGrades\S*course_id\S*is_stream=false\S*$/],
      excludePatterns: [],
      styleContent: courseClassGradeStyles,
      fileName: "courseClassGrade.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*listContent\S*$/],
      excludePatterns: [],
      styleContent: courseListContentStyles,
      fileName: "courseListContent.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*viewAttempts\S*$/],
      excludePatterns: [],
      styleContent: courseViewAttemptStyles,
      fileName: "courseViewAttempt.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*toolId\S*$/],
      excludePatterns: [],
      styleContent: courseToolFrameStyles,
      fileName: "courseToolFrame.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=alerts\S*$/],
      excludePatterns: [],
      styleContent: courseToolAlertStyles,
      fileName: "courseToolAlert.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=mygrades\S*$/],
      excludePatterns: [],
      styleContent: courseToolGradeStyles,
      fileName: "courseToolGrade.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*stream_name=mygrades$/],
      excludePatterns: [],
      styleContent: courseToolGradeClassStyles,
      fileName: "courseToolGradeClass.css"
    },
    {
      patterns: [
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*stream_name=mygrades_d\S*gradable_item_id\S*$/
      ],
      excludePatterns: [],
      styleContent: courseToolGradeItemStyles,
      fileName: "courseToolGradeItem.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*content\/file\?cmd=view\S*$/],
      excludePatterns: [],
      styleContent: courseFileEmbedStyles,
      fileName: "courseFileEmbed.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*assignment\/uploadAssignment\?\S*$/],
      excludePatterns: [],
      styleContent: courseAssignmentUploadStyles,
      fileName: "courseAssignmentUpload.css"
    },
    {
      patterns: [
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*context=mybb\S*$/,
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/execute\/announcement$/,
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*playVideo\S*$/
      ],
      excludePatterns: [],
      styleContent: courseGlobalPageStyles,
      fileName: "courseGlobalPage.css"
    },
    {
      patterns: [
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*announcement\S*context=mybb\S*$/,
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/execute\/announcement$/
      ],
      excludePatterns: [],
      styleContent: courseGlobalAnnouncementStyles,
      fileName: "courseGlobalAnnouncement.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*playVideo\S*$/],
      excludePatterns: [],
      styleContent: courseVideoPlayStyles,
      fileName: "courseVideoPlay.css"
    },
    {
      patterns: [/^https:\/\/onlineroomse\.pku\.edu\.cn\/player\?course_id\S*$/],
      excludePatterns: [],
      styleContent: courseVideoPlayFrameStyles,
      fileName: "courseVideoPlayFrame.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*taskView\S*$/],
      excludePatterns: [],
      styleContent: courseTaskStyles,
      fileName: "courseTask.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*discussionboard\S*$/],
      excludePatterns: [],
      styleContent: courseDiscussionStyles,
      fileName: "courseDiscussion.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*contentWrapperNoFrame\S*$/],
      excludePatterns: [],
      styleContent: courseExternalLinkStyles,
      fileName: "courseExternalLink.css"
    },
{
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/calendar\/\S*$/],
      excludePatterns: [],
      styleContent: courseToolCalendarStyles,
      fileName: "courseToolCalendar.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*oralTraining\S*$/],
      excludePatterns: [],
      styleContent: courseOralTrainingStyles,
      fileName: "courseOralTraining.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*viewGroup\S*$/],
      excludePatterns: [],
      styleContent: courseViewGroupStyles,
      fileName: "courseViewGroup.css"
    },
{
      patterns: [/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/ssoLogin\.do\?_rand\S*$/],
      excludePatterns: [],
      styleContent: electiveSsoLoginStyles,
      fileName: "electiveSsoLogin.css"
    },
    {
      patterns: [/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\S*$/],
      excludePatterns: [/^\S*goNested\.do\S*$/, /^\S*courseQuery\S*$/, /^\S*getCourseDetail\.do\S*$/],
      styleContent: electiveMainStyles,
      fileName: "electiveMain.css"
    },
    {
      patterns: [
        /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/electivePlan\/\S*$/
      ],
      excludePatterns: [],
      styleContent: electivePlanStyles,
      fileName: "electivePlan.css"
    },
    {
      patterns: [
        /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/electiveWork\/showResults\.do\S*$/
      ],
      excludePatterns: [],
      styleContent: electiveResultsStyles,
      fileName: "electiveResults.css"
    },
    {
      patterns: [
        /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/help\/HelpController\.jpf\S*$/
      ],
      excludePatterns: [],
      styleContent: electiveHelpStyles,
      fileName: "electiveHelp.css"
    },
    {
      patterns: [
        /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/\S*\/goNested\.do\S*$/,
        /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/\S*\/getCourseDetail.do\S*$/
      ],
      excludePatterns: [],
      styleContent: electiveDetailStyles,
      fileName: "electiveDetail.css"
    },
    {
      patterns: [
        /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/courseQuery\/\S*$/
      ],
      excludePatterns: [/^\S*goNested\.do\S*$/, /^\S*getCourseDetail\.do\S*$/],
      styleContent: electiveCourseQueryStyles,
      fileName: "electiveCourseQuery.css"
    },
    {
patterns: [
        /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/help\/faqForUnderGrad\.jsp\S*$/
      ],
      excludePatterns: [],
      styleContent: electiveFaqStyles,
      fileName: "electiveFaq.css"
    },
    {


patterns: [
        /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/electiveWork\/(ElectiveWorkController\.jpf|election\.jsp|electCourse\.do|cancelCourse\.do)\S*$/
      ],
      excludePatterns: [],
      styleContent: electiveWorkStyles,
      fileName: "electiveWork.css"
    }
  ];
  function matchesAnyPattern(patterns, url) {
    return patterns.some((pattern) => pattern.test(url));
  }
  function applyStylesForCurrentPage(url = currentUrl) {
    styleRules.forEach(({ patterns, excludePatterns, styleContent, fileName }) => {
      if (matchesAnyPattern(patterns, url) && !matchesAnyPattern(excludePatterns, url)) {
        injectStyles(styleContent, fileName);
        console.log(`[PKU Art] ${fileName} imported`);
      }
    });
  }
  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 19a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1m6.364-2.05l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414m-12.728 0a1 1 0 0 1 1.497 1.32l-.083.094l-.707.707a1 1 0 0 1-1.497-1.32l.083-.094zM12 6a6 6 0 1 1 0 12a6 6 0 0 1 0-12m0 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-8 3a1 1 0 0 1 .117 1.993L4 13H3a1 1 0 0 1-.117-1.993L3 11zm17 0a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2zM4.929 4.929a1 1 0 0 1 1.32-.083l.094.083l.707.707a1 1 0 0 1-1.32 1.497l-.094-.083l-.707-.707a1 1 0 0 1 0-1.414m14.142 0a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1"/></g></svg>`;
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12.477 4.546a1.01 1.01 0 0 1 1.097-1.409A9 9 0 0 1 12 21c-4.434 0-8.118-3.206-8.863-7.426a1.01 1.01 0 0 1 1.409-1.097a6 6 0 0 0 7.931-7.931m2.404 1.072a8 8 0 0 1-9.263 9.263A7.002 7.002 0 0 0 19 12.001a7 7 0 0 0-4.12-6.383ZM5.565 7.716l.064.14a3.26 3.26 0 0 0 1.237 1.363l.1.059a.068.068 0 0 1 0 .118l-.1.058a3.26 3.26 0 0 0-1.237 1.364l-.064.14a.071.071 0 0 1-.13 0l-.064-.14a3.26 3.26 0 0 0-1.237-1.364l-.1-.058a.068.068 0 0 1 0-.118l.1-.059A3.26 3.26 0 0 0 5.37 7.855l.064-.14a.071.071 0 0 1 .13 0Zm2.832-4.859c.04-.09.166-.09.206 0l.102.222a5.2 5.2 0 0 0 1.97 2.172l.157.092a.108.108 0 0 1 0 .189l-.158.092a5.2 5.2 0 0 0-2.07 2.394a.113.113 0 0 1-.207 0l-.102-.222a5.2 5.2 0 0 0-1.97-2.172l-.158-.092a.108.108 0 0 1 0-.189l.158-.092a5.2 5.2 0 0 0 1.97-2.172z"/></g></svg>`;
  const autoIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" fill-rule="nonzero" d="M19 3a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-4v1h1a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h1v-1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm-6 15h-2v1h2zm6-13H5v11h14z"/></g></svg>`;
  const downloadIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="PKU-Art i-download" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M20 15a1 1 0 0 1 1 1v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a1 1 0 1 1 2 0v4h14v-4a1 1 0 0 1 1-1M12 2a1 1 0 0 1 1 1v10.243l2.536-2.536a1 1 0 1 1 1.414 1.414l-4.066 4.066a1.25 1.25 0 0 1-1.768 0L7.05 12.121a1 1 0 1 1 1.414-1.414L11 13.243V3a1 1 0 0 1 1-1"/></g></svg>`;
  const linkIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="PKU-Art i-link" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none" fill-rule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M1 10a5 5 0 0 1 5-5h6a5 5 0 0 1 0 10a1 1 0 1 1 0-2a3 3 0 1 0 0-6H6a3 3 0 0 0-.75 5.906a1 1 0 0 1-.5 1.936A5 5 0 0 1 1 10m11 1a3 3 0 1 0 0 6h6a3 3 0 0 0 .75-5.905a1 1 0 0 1 .5-1.937A5.002 5.002 0 0 1 18 19h-6a5 5 0 0 1 0-10a1 1 0 1 1 0 2"/></g></svg>`;
  const refreshIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M20 9a1 1 0 0 1 1 1v1a8 8 0 0 1-8 8H9.414l.793.793a1 1 0 0 1-1.414 1.414l-2.496-2.496a1 1 0 0 1-.287-.567L6 17.991a1 1 0 0 1 .237-.638l.056-.06l2.5-2.5a1 1 0 0 1 1.414 1.414L9.414 17H13a6 6 0 0 0 6-6v-1a1 1 0 0 1 1-1m-4.793-6.207l2.5 2.5a1 1 0 0 1 0 1.414l-2.5 2.5a1 1 0 1 1-1.414-1.414L14.586 7H11a6 6 0 0 0-6 6v1a1 1 0 1 1-2 0v-1a8 8 0 0 1 8-8h3.586l-.793-.793a1 1 0 0 1 1.414-1.414"/></g></svg>`;
  const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="m12 13.414l5.657 5.657a1 1 0 0 0 1.414-1.414L13.414 12l5.657-5.657a1 1 0 0 0-1.414-1.414L12 10.586L6.343 4.929A1 1 0 0 0 4.93 6.343L10.586 12l-5.657 5.657a1 1 0 1 0 1.414 1.414z"/></g></svg>`;
  const validIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M21.192 5.465a1 1 0 0 1 0 1.414L9.95 18.122a1.1 1.1 0 0 1-1.556 0l-5.586-5.586a1 1 0 1 1 1.415-1.415l4.95 4.95L19.777 5.465a1 1 0 0 1 1.414 0Z"/></g></svg>`;
  const invalidIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="m12 13.414l5.657 5.657a1 1 0 0 0 1.414-1.414L13.414 12l5.657-5.657a1 1 0 0 0-1.414-1.414L12 10.586L6.343 4.929A1 1 0 0 0 4.93 6.343L10.586 12l-5.657 5.657a1 1 0 1 0 1.414 1.414z"/></g></svg>`;
  var _GM_addValueChangeListener = (() => typeof GM_addValueChangeListener != "undefined" ? GM_addValueChangeListener : void 0)();
  var _GM_download = (() => typeof GM_download != "undefined" ? GM_download : void 0)();
  var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_setClipboard = (() => typeof GM_setClipboard != "undefined" ? GM_setClipboard : void 0)();
  var _GM_setValue = (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  class ThemeManager {
    constructor() {
      this.themeModes = {
        LIGHT: "light",
        DARK: "dark",
        AUTO: "auto"
      };
      this.storageKeys = {
        primary: "pku-art-theme-mode",
        legacy: "themeMode"
      };
      this.currentMode = this.getStoredTheme() || this.themeModes.AUTO;
      this.isDark = false;
      this.init();
    }
    init() {
      if (window.matchMedia) {
        this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        this.mediaQuery.addEventListener("change", () => {
          if (this.currentMode === this.themeModes.AUTO) {
            this.updateTheme();
          }
        });
      }
      this.setupSyncListeners();
      this.updateTheme();
      console.log("[PKU Art] ThemeManager initialized with mode:", this.currentMode);
    }
    getStoredTheme() {
      const keys = [this.storageKeys.primary, this.storageKeys.legacy];
      if (typeof _GM_getValue === "function") {
        for (const key of keys) {
          try {
            const value = _GM_getValue(key, null);
            if (this.isValidMode(value)) {
              return value;
            }
          } catch (error) {
          }
        }
      }
      try {
        for (const key of keys) {
          const value = localStorage.getItem(key);
          if (this.isValidMode(value)) {
            return value;
          }
        }
      } catch (error) {
        console.warn("[PKU Art] localStorage unavailable when reading theme mode:", error);
      }
      return null;
    }
    setStoredTheme(mode) {
      if (!this.isValidMode(mode)) {
        return;
      }
      const keys = [this.storageKeys.primary, this.storageKeys.legacy];
      let gmStored = false;
      if (typeof _GM_setValue === "function") {
        for (const key of keys) {
          try {
            _GM_setValue(key, mode);
            gmStored = true;
          } catch (error) {
          }
        }
      }
      let localStored = false;
      for (const key of keys) {
        try {
          localStorage.setItem(key, mode);
          localStored = true;
        } catch (error) {
        }
      }
      if (!gmStored && !localStored) {
        console.warn("[PKU Art] Failed to persist theme mode. Manual sync may not propagate to other frames.");
      }
    }
    setTheme(mode) {
      if (!Object.values(this.themeModes).includes(mode)) {
        console.warn("[PKU Art] Invalid theme mode:", mode);
        return;
      }
      this.currentMode = mode;
      this.setStoredTheme(mode);
      this.updateTheme();
      console.log("[PKU Art] Theme changed to:", mode);
    }
    updateTheme() {
      const shouldBeDark = this.resolveShouldBeDark(this.currentMode);
      this.isDark = shouldBeDark;
      this.applyTheme(shouldBeDark);
    }
    applyTheme(isDark, broadcast = true) {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add("pku-art-dark");
        root.classList.remove("pku-art-light");
      } else {
        root.classList.add("pku-art-light");
        root.classList.remove("pku-art-dark");
      }
      window.dispatchEvent(
        new CustomEvent("pku-art-theme-change", {
          detail: { isDark, mode: this.currentMode }
        })
      );
      if (broadcast) {
        this.broadcastThemeToIframes();
      }
    }
    getCurrentMode() {
      return this.currentMode;
    }
    isDarkMode() {
      return this.isDark;
    }
    resolveShouldBeDark(mode) {
      switch (mode) {
        case this.themeModes.LIGHT:
          return false;
        case this.themeModes.DARK:
          return true;
        case this.themeModes.AUTO:
          return this.mediaQuery ? this.mediaQuery.matches : false;
        default:
          return false;
      }
    }
    isValidMode(mode) {
      return Object.values(this.themeModes).includes(mode);
    }
    setupSyncListeners() {
      this.setupGMValueListeners();
      this.setupLocalStorageListener();
      this.setupPostMessageListener();
    }
    setupLocalStorageListener() {
      window.addEventListener("storage", (event) => {
        if (!event || !event.key) {
          return;
        }
        if (![this.storageKeys.primary, this.storageKeys.legacy].includes(event.key)) {
          return;
        }
        this.handleExternalThemeChange(event.newValue);
      });
    }
    setupGMValueListeners() {
      if (typeof _GM_addValueChangeListener !== "function") {
        return;
      }
      const keys = [this.storageKeys.primary, this.storageKeys.legacy];
      keys.forEach((key) => {
        try {
          _GM_addValueChangeListener(key, (_name, _oldValue, newValue, remote) => {
            if (!remote) {
              return;
            }
            this.handleExternalThemeChange(newValue);
          });
        } catch (error) {
          console.warn("[PKU Art] GM_addValueChangeListener unavailable for key:", key, error);
        }
      });
    }
    handleExternalThemeChange(rawValue) {
      const incomingMode = this.isValidMode(rawValue) ? rawValue : this.themeModes.AUTO;
      if (incomingMode !== this.currentMode) {
        this.currentMode = incomingMode;
        this.updateTheme();
        return;
      }
      const shouldBeDark = this.resolveShouldBeDark(incomingMode);
      if (shouldBeDark !== this.isDark) {
        this.isDark = shouldBeDark;
        this.applyTheme(shouldBeDark);
      }
    }
    setupPostMessageListener() {
      window.addEventListener("message", (event) => {
        var _a;
        if (!event.data || typeof event.data !== "object") {
          return;
        }
        if (event.data.type === "pku-art-theme-request") {
          (_a = event.source) == null ? void 0 : _a.postMessage(
            {
              type: "pku-art-theme-sync",
              mode: this.currentMode,
              isDark: this.isDark
            },
            "*"
          );
          return;
        }
        if (event.data.type === "pku-art-theme-sync") {
          const { mode, isDark } = event.data;
          if (this.isValidMode(mode) && mode !== this.currentMode) {
            this.currentMode = mode;
            this.isDark = isDark;
            this.applyTheme(isDark, false);
            if (window.parent === window) {
              this.broadcastThemeToIframes(event.source);
            }
          }
        }
      });
      this.requestThemeFromParent();
    }
    broadcastThemeToIframes(excludeSource = null) {
      const message = {
        type: "pku-art-theme-sync",
        mode: this.currentMode,
        isDark: this.isDark
      };
      const iframes = document.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        try {
          if (iframe.contentWindow && iframe.contentWindow !== excludeSource) {
            iframe.contentWindow.postMessage(message, "*");
          }
        } catch (e) {
        }
      });
    }
    requestThemeFromParent() {
      if (window.parent !== window) {
        try {
          window.parent.postMessage({ type: "pku-art-theme-request" }, "*");
        } catch (e) {
        }
      }
    }
  }
  const themeToggleIcons = {
    light: sunIcon,
    dark: moonIcon,
    auto: autoIcon
  };
  function initializeThemeManager() {
    const userThemeMode = themeManager.getStoredTheme() || "auto";
    themeManager.setTheme(userThemeMode);
    console.log("[PKU Art] Theme manager initialized with mode:", userThemeMode);
  }
  function initializeThemeToggleButton() {
    if (!/^https:\/\/(course|elective)\.pku\.edu\.cn\//.test(window.location.href)) {
      return;
    }
    let attempts = 0;
    const maxAttempts = 20;
    const attachToggle = () => {
      if (document.querySelector(".pku-art-theme-toggle")) {
        return;
      }
      const remindLink = document.querySelector("#global-nav-link");
      const navWrap = document.querySelector(".global-nav-bar-wrap");
      if (/^https:\/\/course\.pku\.edu\.cn\//.test(window.location.href)) {
        if (!remindLink || !navWrap) {
          if (attempts < maxAttempts) {
            attempts += 1;
            setTimeout(attachToggle, 300);
          }
          return;
        }
      }
      const menuExit = document.querySelector('#menu li:first-of-type:has(a[href="/elective2008/logout.do"])');
      if (/^https:\/\/elective\.pku\.edu\.cn\//.test(window.location.href)) {
        if (!menuExit) {
          if (attempts < maxAttempts) {
            attempts += 1;
            setTimeout(attachToggle, 300);
          }
          return;
        }
      }
      const wrapper = document.createElement("div");
      wrapper.className = "pku-art-theme-toggle-bar";
      const toggleButton = document.createElement("button");
      toggleButton.type = "button";
      toggleButton.className = "pku-art-theme-toggle";
      toggleButton.setAttribute("aria-label", "切换日夜模式");
      const setIconMarkup = (mode) => {
        const normalizedMode = themeToggleIcons[mode] ? mode : "auto";
        if (toggleButton.dataset.icon !== normalizedMode) {
          toggleButton.innerHTML = themeToggleIcons[normalizedMode];
          toggleButton.dataset.icon = normalizedMode;
        }
      };
      const updateButtonState = () => {
        const currentMode = themeManager.getCurrentMode();
        const isDark = themeManager.isDarkMode();
        let tooltipText = "切换主题";
        if (currentMode === "auto") {
          toggleButton.dataset.mode = "auto";
          toggleButton.dataset.state = isDark ? "dark" : "light";
          tooltipText = isDark ? "跟随系统（当前：黑夜模式）" : "跟随系统（当前：日间模式）";
          setIconMarkup("auto");
        } else if (currentMode === "dark") {
          tooltipText = "黑夜模式";
          toggleButton.dataset.mode = "dark";
          toggleButton.removeAttribute("data-state");
          setIconMarkup("dark");
        } else {
          tooltipText = "日间模式";
          toggleButton.dataset.mode = "light";
          toggleButton.removeAttribute("data-state");
          setIconMarkup("light");
        }
        toggleButton.setAttribute("title", tooltipText);
      };
      const persistThemeMode = (mode) => {
        try {
          if (typeof _GM_setValue !== "undefined") {
            _GM_setValue("themeMode", mode);
            return;
          }
        } catch (error) {
          console.warn("[PKU Art] GM_setValue unavailable for themeMode persistence:", error);
        }
        try {
          localStorage.setItem("themeMode", mode);
        } catch (storageError) {
          console.warn("[PKU Art] localStorage unavailable for themeMode persistence:", storageError);
        }
      };
      const cycleThemeMode = () => {
        const currentMode = themeManager.getCurrentMode();
        let nextMode = "light";
        if (currentMode === "light") {
          nextMode = "dark";
        } else if (currentMode === "dark") {
          nextMode = "auto";
        }
        themeManager.setTheme(nextMode);
        persistThemeMode(nextMode);
        updateButtonState();
      };
      toggleButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        cycleThemeMode();
      });
      wrapper.appendChild(toggleButton);
      if (/^https:\/\/course\.pku\.edu\.cn\//.test(window.location.href)) {
        const navBarItem = remindLink.closest(".global-nav-bar");
        wrapper.classList.add("global-nav-bar");
        if (navBarItem && navBarItem.parentElement) {
          navBarItem.parentElement.insertBefore(wrapper, navBarItem.nextSibling);
        } else {
          navWrap.appendChild(wrapper);
        }
      }
      if (/^https:\/\/elective\.pku\.edu\.cn\//.test(window.location.href)) {
        if (menuExit && menuExit.parentElement) {
          menuExit.parentElement.insertBefore(wrapper, menuExit.nextSibling);
        }
      }
      updateButtonState();
      window.addEventListener("pku-art-theme-change", updateButtonState);
    };
    attachToggle();
    document.addEventListener("DOMContentLoaded", attachToggle);
    window.addEventListener("load", attachToggle);
  }
  window.PKUArtThemeManager = new ThemeManager();
  const themeManager = window.PKUArtThemeManager;
  function initializeLogoNavigation() {
    if (!/^https:\/\/course\.pku\.edu\.cn\/|^https:\/\/elective\.pku\.edu\.cn\//.test(window.location.href)) {
      return;
    }
    const isElectivePage = /^https:\/\/elective\.pku\.edu\.cn\//.test(window.location.href);
    const isGoNestedPage = /goNested\.do/.test(window.location.href);
    const isWorkPage = /(ElectiveWorkController\.jpf|election\.jsp|electCourse\.do|cancelCourse\.do)/.test(
      window.location.href
    );
    const homeURL = isElectivePage ? "https://elective.pku.edu.cn/elective2008/edu/pku/stu/elective/controller/help/HelpController.jpf" : "https://course.pku.edu.cn";
    const getElement = () => {
      if (isGoNestedPage) {
        return document.body;
      }
      if (isWorkPage) {
        return document.querySelector("body > #scopeOneSpan > table:first-of-type td");
      }
      if (isElectivePage) {
        return document.querySelector("body > table:first-of-type td");
      }
      return document.getElementById("globalNavPageNavArea");
    };
    console.log(
      "[PKU Art] initializeLogoNavigation() has been used at " + ( new Date()).toLocaleString() + ", isElectivePage: " + isElectivePage + ", isGoNestedPage: " + isGoNestedPage + ", isWorkPage: " + isWorkPage
    );
    const handleLogoClick = (event) => {
      const navArea = event.currentTarget;
      const clickOffsetX = event.clientX - navArea.getBoundingClientRect().left;
      const clickOffsetY = event.clientY - navArea.getBoundingClientRect().top;
      if (clickOffsetX <= 150 && clickOffsetY <= 60) {
        window.location.href = homeURL;
      }
    };
    const bindLogoNavigation = () => {
      const element = getElement();
      if (element && !element.dataset.pkuArtLogoBound) {
        element.addEventListener("click", handleLogoClick);
        element.dataset.pkuArtLogoBound = "true";
      }
    };
    bindLogoNavigation();
    document.addEventListener("DOMContentLoaded", bindLogoNavigation);
  }
  function ensureSidebarVisible() {
    if (!/^https:\/\/course\.pku\.edu\.cn\//.test(window.location.href)) {
      return;
    }
    const resetNavigationPane = () => {
      const navigationPane = document.getElementById("navigationPane");
      if (navigationPane && navigationPane.classList.contains("navcollapsed")) {
        const puller = document.getElementById("menuPuller");
        if (puller) {
          puller.click();
          console.log("[PKU Art] sidebar reseted by auto click at " + ( new Date()).toLocaleString());
        }
      }
    };
    resetNavigationPane();
    window.addEventListener("resize", resetNavigationPane);
  }
  function overrideSiteIcons() {
    if (!/^https:\/\/(course|autolab|disk|elective)\.pku\.edu\.cn\//.test(window.location.href)) {
      return;
    }
    console.log("[PKU Art] overrideSiteIcons() has been used at " + ( new Date()).toLocaleString());
    const replaceIcons = () => {
      const all_icons = document.querySelectorAll('link[rel="icon" i], link[rel="shortcut icon" i]');
      const not_custom_icons = document.querySelectorAll(
        'link[rel="icon" i]:not([href^="https://cdn.arthals.ink/"]), link[rel="shortcut icon" i]:not([href^="https://cdn.arthals.ink/"])'
      );
      if (all_icons.length == 0 || not_custom_icons.length > 0) {
        not_custom_icons.forEach((icon) => {
          icon.parentNode.removeChild(icon);
        });
        const newIcon = document.createElement("link");
        newIcon.rel = "SHORTCUT ICON";
        newIcon.href = "https://cdn.arthals.ink/css/src/PKU.svg";
        document.head.appendChild(newIcon);
        const appleIcon16 = document.createElement("link");
        appleIcon16.rel = "icon";
        appleIcon16.type = "image/png";
        appleIcon16.sizes = "16x16";
        appleIcon16.href = "https://cdn.arthals.ink/css/src/pku_16x16.png";
        document.head.appendChild(appleIcon16);
        const appleIcon32 = document.createElement("link");
        appleIcon32.rel = "icon";
        appleIcon32.type = "image/png";
        appleIcon32.sizes = "32x32";
        appleIcon32.href = "https://cdn.arthals.ink/css/src/pku_32x32.png";
        document.head.appendChild(appleIcon32);
        const appleIconTouch = document.createElement("link");
        appleIconTouch.rel = "apple-touch-icon";
        appleIconTouch.sizes = "180x180";
        appleIconTouch.href = "https://cdn.arthals.ink/css/src/pku_180x180.png";
        document.head.appendChild(appleIconTouch);
      }
    };
    replaceIcons();
    document.addEventListener("DOMContentLoaded", replaceIcons);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
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
    document.addEventListener("DOMContentLoaded", observeHead);
  }
  function removeCourseSerialNumbers() {
    const url = window.location.href;
    const isPortalPage = /^https:\/\/course\.pku\.edu\.cn\/webapps\/?$|^https:\/\/course\.pku\.edu\.cn\/webapps\/portal\/\S*$/.test(url);
    const isAlertsStreamPage = /^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=alerts\S*$/.test(url);
    if (isPortalPage) {
      const stripPortalSerials = () => {
        const courseLinks = document.querySelectorAll(
          ".containerPortal > div:not(:first-child) .portlet .portletList-img > li > a"
        );
        courseLinks.forEach((courseLink) => {
          courseLink.innerHTML = courseLink.innerHTML.replace(/^.*?: /, "").replace(/\(\d+-\d+学年第\d学期.*?\)/, "");
        });
        console.log("[PKU Art] course serial deleted: " + courseLinks.length + " courses");
      };
      stripPortalSerials();
      document.addEventListener("DOMContentLoaded", stripPortalSerials);
    }
    if (isAlertsStreamPage) {
      let alertCleanupTimer;
      const stripAlertSerials = () => {
        const courseLinks = document.querySelectorAll("#streamHeader_alerts a");
        courseLinks.forEach((courseLink) => {
          courseLink.innerHTML = courseLink.innerHTML.replace(/\(\d+-\d+学年第\d学期\)/, "");
        });
        if (courseLinks.length !== 0 && alertCleanupTimer) {
          clearInterval(alertCleanupTimer);
        }
      };
      stripAlertSerials();
      alertCleanupTimer = setInterval(() => {
        const courseLinks = document.querySelectorAll("#streamHeader_alerts a");
        if (courseLinks.length !== 0) {
          stripAlertSerials();
        }
      }, 50);
    }
    const removeContextMenuSerials = () => {
      const contextMenuOpenLink = document.querySelector("#breadcrumbs .coursePath .courseArrow a");
      const doRemoveContextMenuSerials = () => {
        contextMenuOpenLink.removeEventListener("mouseover", doRemoveContextMenuSerials);
        contextMenuOpenLink.removeEventListener("click", doRemoveContextMenuSerials);
        const waitForContextMenuReadyInterval = setInterval(() => {
          console.log("[PKU Art] Waiting for context menu ready...");
          if (contextMenuOpenLink.savedDiv.querySelector('li[id^="最近访问"]')) {
            clearInterval(waitForContextMenuReadyInterval);
            contextMenuOpenLink.savedDiv.innerHTML = contextMenuOpenLink.savedDiv.innerHTML.replace(
              /\(\d+-\d+学年第\d学期\)/g,
              ""
            );
            const emptyMenu = contextMenuOpenLink.savedDiv.querySelector(
              'ul[role="presentation"]:has(.contextmenu_empty)'
            );
            if (emptyMenu) {
              contextMenuOpenLink.savedDiv.removeChild(emptyMenu);
              console.log("[PKU Art] Removed empty context menu");
            }
          }
        }, 100);
      };
      if (contextMenuOpenLink) {
        contextMenuOpenLink.addEventListener("mouseover", doRemoveContextMenuSerials);
        contextMenuOpenLink.addEventListener("click", doRemoveContextMenuSerials);
        contextMenuOpenLink.addEventListener("click", registerCloseContextMenuOnPage);
      }
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", removeContextMenuSerials);
    } else {
      removeContextMenuSerials();
    }
  }
  async function initializeDirectDownload() {
    const url = window.location.href;
    if (!/^https:\/\/onlineroomse\.pku\.edu\.cn\/player\?course_id\S*$/.test(url)) return;
    console.log("[PKU Art] Injected directDownload() at " + ( new Date()).toLocaleString());
    let downloadUrl = "";
    let downloadJson = "";
    let courseName = "";
    let subTitle = "";
    let lecturerName = "";
    let fileName = "";
    let JWT = "";
    const RELOAD_ATTEMPTS_KEY = "PKU_ART_DIRECT_DOWNLOAD_RELOAD_ATTEMPTS";
    const MAX_RELOAD_ATTEMPTS = 3;
    const originalSend = XMLHttpRequest.prototype.send;
    const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
    XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
      if (!this._headers) {
        this._headers = {};
      }
      this._headers[header] = value;
      originalSetRequestHeader.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function() {
      this.addEventListener("load", function() {
        if (this.responseURL.includes("get-sub-info-by-auth-data")) {
          downloadJson = JSON.parse(this.response);
          try {
            sessionStorage.removeItem(RELOAD_ATTEMPTS_KEY);
          } catch (error) {
            console.warn("[PKU Art] 无法清除重载计数", error);
          }
          if (this._headers) {
            for (const headerName in this._headers) {
              if (headerName.toLowerCase() === "authorization") {
                JWT = this._headers[headerName].split(" ")[1];
                break;
              }
            }
          }
          if (JWT) {
            console.log("[PKU Art] 成功捕获到 JWT:\n", JWT);
            sessionStorage.setItem("PKU_ART_DIRECT_DOWNLOAD_JWT", JWT);
            console.log("[PKU Art] JWT 已保存到 sessionStorage");
          } else {
            console.log("[PKU Art] 未在此请求中找到 JWT。");
          }
          console.log("[PKU Art] XHR 响应结果：\n", downloadJson);
          courseName = downloadJson.list[0].title;
          subTitle = downloadJson.list[0].sub_title;
          lecturerName = downloadJson.list[0].lecturer_name;
          fileName = `${courseName} - ${subTitle} - ${lecturerName}.mp4`;
          const filmContent = JSON.parse(downloadJson.list[0].sub_content);
          const isM3u8 = filmContent.save_playback.is_m3u8;
          let resolvedDownloadUrl = "";
          if (isM3u8 == "yes") {
            const m3u8 = filmContent.save_playback.contents;
            const m3u8Pattern = /https:\/\/resourcese\.pku\.edu\.cn\/play\/0\/harpocrates\/\d+\/\d+\/\d+\/([a-zA-Z0-9]+)(\/.+)\/playlist\.m3u8.*/;
            const hash = m3u8.match(m3u8Pattern)[1];
            resolvedDownloadUrl = `https://course.pku.edu.cn/webapps/bb-streammedia-hqy-BBLEARN/downloadVideo.action?resourceId=${hash}`;
            console.log("[PKU Art] m3u8 下载链接转换成功：\n", resolvedDownloadUrl);
          } else {
            resolvedDownloadUrl = filmContent.save_playback.contents;
          }
          downloadUrl = resolvedDownloadUrl;
          console.log("[PKU Art] 下载链接解析成功：\n", downloadUrl);
        }
      });
      originalSend.apply(this, arguments);
    };
    const INJECTION_OBSERVATION_MS = 3e3;
    const didCaptureDownloadInfo = await new Promise((resolve) => {
      const injectionStartTime = Date.now();
      const checkExist = setInterval(() => {
        const footer = document.querySelector(".course-info__wrap .course-info__footer");
        if (downloadJson && footer) {
          console.log("[PKU Art] 页面加载完成，下载链接解析成功\n", downloadJson);
          clearInterval(checkExist);
          resolve(true);
          return;
        }
        if (footer && !downloadJson && Date.now() - injectionStartTime >= INJECTION_OBSERVATION_MS) {
          clearInterval(checkExist);
          let shouldContinue = true;
          try {
            let currentAttempts = Number(sessionStorage.getItem(RELOAD_ATTEMPTS_KEY) || "0");
            if (Number.isNaN(currentAttempts) || currentAttempts < 0) {
              currentAttempts = 0;
            }
            if (currentAttempts >= MAX_RELOAD_ATTEMPTS) {
              console.warn(`[PKU Art] 已尝试强制重载 ${currentAttempts} 次，停止自动重载`);
            } else {
              sessionStorage.setItem(RELOAD_ATTEMPTS_KEY, String(currentAttempts + 1));
              console.warn("[PKU Art] 未能及时截获课程数据，即将刷新页面重试");
              shouldContinue = false;
              window.location.reload();
            }
          } catch (error) {
            console.warn("[PKU Art] 记录重载次数失败，尝试通过刷新页面恢复", error);
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
    const downloadAreaFooter = document.querySelector(".course-info__wrap .course-info__footer");
    if (!downloadAreaFooter) {
      console.warn("[PKU Art] 未找到 course-info__footer，无法注入下载功能");
      return;
    }
    const replayTitle = document.querySelector(".course-info__wrap .course-info__header > span");
    if (replayTitle) {
      replayTitle.innerText = `${courseName} - ${subTitle} - ${lecturerName}`;
    }
    while (downloadAreaFooter.firstChild) {
      downloadAreaFooter.removeChild(downloadAreaFooter.firstChild);
    }
    const createFooterButton = (id, label, icon) => {
      const button = document.createElement("button");
      button.id = id;
      button.type = "button";
      button.className = "PKU-Art";
      button.innerHTML = `<span class="PKU-Art">${icon}</span><span class="PKU-Art">${label}</span>`;
      return button;
    };
    const downloadButton = createFooterButton("injectDownloadButton", "下载视频", downloadIcon);
    const copyDownloadUrlButton = createFooterButton("injectCopyDownloadUrlButton", "复制链接地址", linkIcon);
    const downloadSwitchArea = document.createElement("div");
    downloadSwitchArea.id = "injectDownloadSwitchArea";
    downloadSwitchArea.className = "PKU-Art";
    downloadSwitchArea.innerHTML = `
<input type="checkbox" id="injectDownloadSwitch" class="PKU-Art" checked>
<label for="injectDownloadSwitch"></label>
<span id="injectDownloadSwitchDesc" class="PKU-Art"> 重命名文件</span>
`;
    downloadSwitchArea.addEventListener("click", (e) => {
      const isCheckboxOrLabel = e.target.id === "injectDownloadSwitch" || e.target.htmlFor === "injectDownloadSwitch";
      if (!isCheckboxOrLabel) {
        const checkbox = downloadSwitchArea.querySelector("#injectDownloadSwitch");
        checkbox.checked = !checkbox.checked;
      }
    });
    downloadAreaFooter.appendChild(downloadButton);
    downloadAreaFooter.appendChild(copyDownloadUrlButton);
    downloadAreaFooter.appendChild(downloadSwitchArea);
    const switchInput = downloadSwitchArea.querySelector("#injectDownloadSwitch");
    const isSafari = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
    const renameSupported = typeof _GM_download === "function";
    if (!renameSupported) {
      downloadSwitchArea.remove();
      downloadAreaFooter.classList.add("rename-unsupported");
      const renameUnsupportedTip = document.createElement("div");
      renameUnsupportedTip.id = "injectDownloadRenameUnsupported";
      renameUnsupportedTip.className = "PKU-Art";
      const warningIcon = isSafari ? '<span class="PKU-Art i-warning"></span>' : "";
      const tipText = isSafari ? "Safari + UserScripts 不支持重命名文件" : "当前环境不支持自动重命名文件";
      renameUnsupportedTip.innerHTML = `${warningIcon}<span class="PKU-Art">${tipText}</span>`;
      downloadAreaFooter.appendChild(renameUnsupportedTip);
    }
    const copySupported = typeof _GM_setClipboard === "function" || navigator.clipboard && navigator.clipboard.writeText;
    if (!copySupported) {
      copyDownloadUrlButton.disabled = true;
      copyDownloadUrlButton.querySelector("span").textContent = "复制链接不可用";
    }
    let currentDownload = null;
    let isDownloading = false;
    const startDownload = (renameEnabled) => {
      const downloadTipText = document.getElementById("injectDownloadTipText");
      const cancelBtn = document.getElementById("injectCancelDownload");
      const restartBtn = document.getElementById("injectRestartDownload");
      let downloadInfo = `下载文件名：${fileName}<br/>下载地址：<a target="_blank" href="${downloadUrl}">文件源地址</a>`;
      if (!renameEnabled) {
        downloadInfo = `正常文件名：${fileName}<br/>下载地址：<a target="_blank" href="${downloadUrl}">文件源地址</a>`;
      }
      if (!renameEnabled) {
        window.open(downloadUrl, "_blank");
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
        currentDownload = _GM_download({
          url: downloadUrl,
          name: fileName,
          saveAs: true,
          onerror(event) {
            console.error("[PKU Art] 下载失败：", event);
            isDownloading = false;
            cancelBtn.disabled = true;
            restartBtn.disabled = false;
            downloadTipText.innerHTML = `下载失败：${event.error}<br/>${downloadInfo}`;
          },
          onprogress(event) {
            const currentTime = Date.now();
            if (event.total && currentTime - lastPrintTime >= 100) {
              const percentComplete = event.loaded / event.total * 100;
              const currentProgress = percentComplete.toFixed(2);
              const bytesDownloadedInLast100ms = event.loaded - lastBytesLoaded;
              const lastSpeed = bytesDownloadedInLast100ms / (currentTime - lastPrintTime);
              averageSpeed = SMOOTHING_FACTOR * lastSpeed + (1 - SMOOTHING_FACTOR) * averageSpeed;
              const bytesRemaining = event.total - event.loaded;
              const estimatedTimeRemaining = bytesRemaining / averageSpeed;
              let estimatedTimeRemainingSeconds = Math.round(estimatedTimeRemaining / 1e3);
              if (Number.isNaN(estimatedTimeRemainingSeconds) || estimatedTimeRemainingSeconds > 9999) {
                estimatedTimeRemainingSeconds = "inf";
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
          }
        });
        window.addEventListener(
          "beforeunload",
          () => {
            if (currentDownload) {
              currentDownload.abort();
            }
          },
          { once: true }
        );
      } catch (error) {
        console.warn("[PKU Art] GM_download 调用失败，回退到新窗口下载", error);
        window.open(downloadUrl, "_blank");
        isDownloading = false;
        cancelBtn.disabled = true;
        restartBtn.disabled = false;
        downloadTipText.innerHTML = `已在新窗口启动下载<br/>正常文件名：${fileName}<br/>下载地址：<a target="_blank" href="${downloadUrl}">文件源地址</a>`;
        alert("看上去当前环境不支持自动重命名功能，已尝试使用新标签页下载");
      }
    };
    downloadButton.addEventListener("click", async () => {
      console.log(`[PKU Art] 已启动下载：
文件名：${fileName}
源地址：${downloadUrl}`);
      const renameEnabled = renameSupported && switchInput && switchInput.checked;
      const existingTip = document.getElementById("injectDownloadTip");
      if (existingTip) {
        if (isDownloading) {
          alert("正在下载中，请先取消当前下载");
          return;
        }
        startDownload(renameEnabled);
        return;
      }
      const downloadTip = document.createElement("div");
      downloadTip.id = "injectDownloadTip";
      downloadTip.className = "PKU-Art";
      const downloadTipText = document.createElement("div");
      downloadTipText.id = "injectDownloadTipText";
      downloadTipText.className = "PKU-Art";
      const downloadTipActions = document.createElement("div");
      downloadTipActions.id = "injectDownloadTipActions";
      downloadTipActions.className = "PKU-Art";
      const cancelBtn = document.createElement("button");
      cancelBtn.id = "injectCancelDownload";
      cancelBtn.className = "PKU-Art";
      cancelBtn.innerHTML = `${closeIcon}<span>取消下载</span>`;
      cancelBtn.disabled = true;
      const restartBtn = document.createElement("button");
      restartBtn.id = "injectRestartDownload";
      restartBtn.className = "PKU-Art";
      restartBtn.innerHTML = `${refreshIcon}<span>重新下载</span>`;
      restartBtn.disabled = true;
      cancelBtn.addEventListener("click", () => {
        if (currentDownload && isDownloading) {
          currentDownload.abort();
          currentDownload = null;
          isDownloading = false;
          cancelBtn.disabled = true;
          restartBtn.disabled = false;
          downloadTipText.innerHTML = `下载已取消<br/>下载文件名：${fileName}<br/>下载地址：<a target="_blank" href="${downloadUrl}">文件源地址</a>`;
        }
      });
      restartBtn.addEventListener("click", () => {
        const renameEnabled2 = renameSupported && switchInput && switchInput.checked;
        startDownload(renameEnabled2);
      });
      downloadTipActions.appendChild(cancelBtn);
      downloadTipActions.appendChild(restartBtn);
      downloadTip.appendChild(downloadTipText);
      downloadTip.appendChild(downloadTipActions);
      downloadAreaFooter.insertBefore(downloadTip, downloadAreaFooter.firstElementChild);
      startDownload(renameEnabled);
    });
    copyDownloadUrlButton.addEventListener("click", async () => {
      if (copyDownloadUrlButton.disabled) {
        return;
      }
      console.log(`[PKU Art] 已复制下载链接：
${downloadUrl}`);
      try {
        if (typeof _GM_setClipboard === "function") {
          _GM_setClipboard(downloadUrl);
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(downloadUrl);
        } else {
          throw new Error("clipboard unsupported");
        }
        alert("下载链接已复制到剪贴板，但是因为存在鉴权，仍可能无法直接使用外部工具下载");
      } catch (error) {
        console.warn("[PKU Art] 复制下载链接失败，将提供备用方案", error);
        const manualCopy = prompt("复制下载链接失败，请手动复制下面的链接", downloadUrl);
        if (manualCopy === null) {
          alert("未能复制下载链接，请尝试手动选中复制");
        }
      }
    });
  }
  function redirectGlobalMoreLink() {
    if (!/^https:\/\/course\.pku\.edu\.cn\//.test(window.location.href)) {
      return;
    }
    let intervalId;
    const updateMoreLink = () => {
      const moreLink = document.querySelector("#global-more-link > a");
      if (moreLink) {
        console.log("[PKU Art] replaceMore() has been used at " + ( new Date()).toLocaleString());
        moreLink.href = "/webapps/bb-social-learning-BBLEARN/execute/mybb?cmd=display&toolId=MyGradesOnMyBb_____MyGradesTool";
        if (intervalId) {
          clearInterval(intervalId);
        }
      }
    };
    intervalId = setInterval(updateMoreLink, 50);
    document.addEventListener("DOMContentLoaded", updateMoreLink);
  }
  function enableDirectOpenLinks() {
    if (!/^https:\/\/course\.pku\.edu\.cn\//.test(window.location.href)) {
      return;
    }
    const stripOnclickHandlers = () => {
      const links = document.querySelectorAll("a[onclick][href]");
      links.forEach((link) => {
        if (link.dataset.pkuArtProcessed) return;
        const href = link.getAttribute("href");
        if (href && !href.startsWith("/") && !href.startsWith("#")) {
          link.removeAttribute("onclick");
          console.log("[PKU Art] 直接打开链接:", href);
        }
        link.dataset.pkuArtProcessed = "true";
      });
    };
    stripOnclickHandlers();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          stripOnclickHandlers();
        }
      });
    });
    const observeBody = () => {
      if (document.body) {
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    };
    observeBody();
    if (!document.body) {
      document.addEventListener("DOMContentLoaded", observeBody);
    }
    document.addEventListener("DOMContentLoaded", stripOnclickHandlers);
  }
  function manageElectiveCourseQueryForm() {
    if (!/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/courseQuery\/\S*$/.test(
      window.location.href
    )) {
      return;
    }
    console.log("[PKU Art] manageElectiveCourseQueryForm() has been used at " + ( new Date()).toLocaleString());
    const STORAGE_KEY = "pku_elective_form_values";
    const form = document.getElementById("qyForm");
    function getTargetInputs() {
      if (!form) return [];
      const allInputs = form.querySelectorAll("input");
      return Array.from(allInputs).filter((input) => input.id !== "b_cancel" && input.id !== "b_query");
    }
    function saveFormValues() {
      const inputs = getTargetInputs();
      const formData = {};
      inputs.forEach((input) => {
        const key = input.id || input.name || input.getAttribute("data-key");
        if (key) {
          if (input.type === "checkbox" || input.type === "radio") {
            formData[key] = input.checked;
          } else {
            formData[key] = input.value;
          }
        }
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
    function restoreFormValues() {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (!savedData) {
        return;
      }
      try {
        const formData = JSON.parse(savedData);
        const inputs = getTargetInputs();
        inputs.forEach((input) => {
          const key = input.id || input.name || input.getAttribute("data-key");
          if (key && formData.hasOwnProperty(key)) {
            if (input.type === "checkbox" || input.type === "radio") {
              input.checked = formData[key];
            } else {
              input.value = formData[key];
            }
          }
        });
      } catch (e) {
        console.error("还原表单值失败:", e);
      }
    }
    function clearFormValues() {
      localStorage.removeItem(STORAGE_KEY);
    }
    function setupRadioSwitchPreservation() {
      var _a;
      const courseID = document.querySelector("#courseID");
      const courseName = document.querySelector("#courseName");
      if (!courseID || !courseName) return;
      let savedID = courseID.value;
      let savedName = courseName.value;
      (_a = document.querySelector("#kcfl")) == null ? void 0 : _a.addEventListener(
        "click",
        function(e) {
          if (e.target.matches("input[type=radio]")) {
            savedID = courseID.value;
            savedName = courseName.value;
            requestAnimationFrame(() => {
              if (courseID.value === "") courseID.value = savedID;
              if (courseName.value === "") courseName.value = savedName;
            });
          }
        },
        true
      );
      const observer = new MutationObserver(() => {
        if (courseID.value === "" && savedID) courseID.value = savedID;
        if (courseName.value === "" && savedName) courseName.value = savedName;
      });
      observer.observe(courseID, { attributes: true, attributeFilter: ["value"] });
      observer.observe(courseName, { attributes: true, attributeFilter: ["value"] });
    }
    function setupLocalStoragePersistence() {
      if (!form) {
        console.warn('未找到 id="qyForm" 的表单，localStorage 存储功能不可用');
        return;
      }
      restoreFormValues();
      const inputs = getTargetInputs();
      inputs.forEach((input) => {
        input.addEventListener("input", saveFormValues);
        input.addEventListener("change", saveFormValues);
      });
      const cancelBtn = document.getElementById("b_cancel");
      if (cancelBtn) {
        cancelBtn.addEventListener("click", function() {
          clearFormValues();
          const inputs2 = getTargetInputs();
          inputs2.forEach((input) => {
            if (input.type === "checkbox" || input.type === "radio") {
              input.checked = false;
            } else {
              input.value = "";
            }
          });
        });
      }
    }
    setupRadioSwitchPreservation();
    setupLocalStoragePersistence();
  }
  function refactorElectiveDatagrid() {
    const refactorPagination = () => {
      const tables = document.querySelectorAll("table.datagrid");
      tables.forEach((table) => {
        if (table.dataset.pkuArtPaginationRefactored) {
          return;
        }
        let paginationRow = table.querySelector('tr:has(> td > form[name="pageForm"])');
        if (!paginationRow) {
          const lastRow = table.querySelector("tbody > tr:last-child, tr:last-child");
          if (lastRow) {
            const hasPagination = [...lastRow.querySelectorAll("td")].some(
              (td) => /Page\s+\d+\s+of\s+\d+/.test(td.textContent)
            );
            if (hasPagination) {
              paginationRow = lastRow;
            }
          }
        }
        if (!paginationRow) {
          return;
        }
        const paginationTds = [...paginationRow.querySelectorAll('td:not([align="left"])')];
        if (paginationTds.length === 0) {
          return;
        }
        const isSinglePage = paginationTds.some((td) => td.textContent.trim().startsWith("Page 1 of 1"));
        if (isSinglePage) {
          console.log(
            "[PKU Art] refactorPagination() removing single page navigation at " + ( new Date()).toLocaleString()
          );
          paginationTds.forEach((td) => td.remove());
          table.dataset.pkuArtPaginationRefactored = "true";
          return;
        }
        console.log("[PKU Art] refactorPagination() has been used at " + ( new Date()).toLocaleString());
        const navDiv = document.createElement("div");
        navDiv.classList.add("PKU-Art", "pku-art-navigation-area");
        paginationTds.forEach((td) => {
          navDiv.innerHTML += td.innerHTML;
          td.remove();
        });
        table.insertAdjacentElement("afterend", navDiv);
        table.dataset.pkuArtPaginationRefactored = "true";
      });
    };
    const refactorTableColumns = () => {
      const headerRow = document.querySelector("tr.datagrid-header");
      if (!headerRow) {
        return;
      }
      const headers = headerRow.querySelectorAll("th.datagrid");
      let pnpColumnIndex = -1;
      let limitColumnIndex = -1;
      headers.forEach((th, index) => {
        const text = th.textContent.trim();
        if (text === "自选P/NP") {
          pnpColumnIndex = index;
        } else if (text === "限数/已选") {
          limitColumnIndex = index;
        }
      });
      if (pnpColumnIndex === -1 && limitColumnIndex === -1) {
        return;
      }
      console.log(
        "[PKU Art] refactorTableColumns() found columns: P/NP=" + pnpColumnIndex + ", limit=" + limitColumnIndex
      );
      const dataRows = document.querySelectorAll("table.datagrid tr:not(.datagrid-header):not(.datagrid-footer)");
      dataRows.forEach((row) => {
        if (row.dataset.pkuArtTableRefactored) {
          return;
        }
        const cells = row.querySelectorAll("td.datagrid");
        if (pnpColumnIndex !== -1 && cells[pnpColumnIndex]) {
          const cell = cells[pnpColumnIndex];
          const text = cell.textContent.trim();
          if (text === "可申请") {
            cell.innerHTML = validIcon;
            cell.classList.add("PKU-Art", "pku-art-pnp-valid");
          } else if (text === "不可申请") {
            cell.innerHTML = invalidIcon;
            cell.classList.add("PKU-Art", "pku-art-pnp-invalid");
          }
        }
        if (limitColumnIndex !== -1 && cells[limitColumnIndex]) {
          const cell = cells[limitColumnIndex];
          const text = cell.textContent.trim();
          const match = text.match(/(\d+)\s*\/\s*(\d+)/);
          if (match) {
            const limit = parseInt(match[1], 10);
            const selected = parseInt(match[2], 10);
            if (selected >= limit) {
              cell.style.color = "var(--red-6)";
            } else {
              cell.style.color = "var(--blue-6)";
            }
            cell.classList.add("PKU-Art", "pku-art-limit-cell");
          }
        }
        row.dataset.pkuArtTableRefactored = "true";
      });
    };
    refactorPagination();
    refactorTableColumns();
  }
  function refactorElectiveCourseQueryPage() {
    if (!/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/courseQuery\/(getCurriculmByForm\.do|queryCurriculum\.jsp)/.test(
      window.location.href
    )) {
      return;
    }
    refactorElectiveDatagrid();
    document.addEventListener("DOMContentLoaded", refactorElectiveDatagrid);
  }
  function refactorElectivePlanPage() {
    if (!/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/electivePlan\/ElectivePlanController\.jpf/.test(
      window.location.href
    )) {
      return;
    }
    refactorElectiveDatagrid();
    document.addEventListener("DOMContentLoaded", refactorElectiveDatagrid);
  }
  function refactorElectiveFaqPage() {
    if (!/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/help\/faqForUnderGrad\.jsp\S*$/.test(
      window.location.href
    )) {
      return;
    }
    const removeFunc = () => {
      const rows = document.querySelectorAll("table.datagrid tr");
      rows.forEach(function(tr) {
        if (tr.children.length === 1 && tr.firstElementChild.tagName === "TD") {
          const text = tr.firstElementChild.textContent.replace(/\u00A0/g, "").trim();
          if (text === "") {
            tr.remove();
          }
        }
      });
    };
    removeFunc();
    document.addEventListener("DOMContentLoaded", removeFunc);
  }
  function refactorIaaaPage() {
    if (!/^https:\/\/iaaa\.pku\.edu\.cn\/iaaa\/oauth\.jsp/.test(window.location.href)) {
      return;
    }
    const checkboxSelectors = [
      "#remember",
      "#remember_checkbox",
      "#rememberMe",
      'input[type="checkbox"][name="remember"]',
      'input[type="checkbox"][name="rememberMe"]'
    ];
    const findCheckbox = () => checkboxSelectors.map((selector) => document.querySelector(selector)).find(Boolean);
    const setupRememberToggle = () => {
      const rememberText = document.getElementById("remember_text");
      if (!rememberText) {
        return false;
      }
      const getNativeIcon = () => rememberText.querySelector("i");
      const ensureCustomIcon = () => {
        if (!rememberText.querySelector(".pku-art-remember-icon")) {
          const customIcon = document.createElement("span");
          customIcon.className = "PKU-Art pku-art-remember-icon";
          customIcon.setAttribute("aria-hidden", "true");
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
          return nativeIcon.classList.contains("fa-check-square-o");
        }
        return rememberText.classList.contains("is-checked");
      };
      const updateAppearance = () => {
        const checked = getCheckedState();
        rememberText.classList.toggle("is-checked", checked);
        rememberText.setAttribute("aria-checked", checked ? "true" : "false");
      };
      if (rememberText.dataset.pkuArtRememberBound !== "true") {
        rememberText.dataset.pkuArtRememberBound = "true";
        rememberText.classList.add("PKU-Art", "pku-art-remember-toggle");
        rememberText.setAttribute("role", "checkbox");
        rememberText.setAttribute("tabindex", "0");
        ensureCustomIcon();
        rememberText.addEventListener("click", () => {
          requestAnimationFrame(updateAppearance);
        });
        rememberText.addEventListener("keydown", (event) => {
          const isActivateKey = event.key === " " || event.key === "Spacebar" || event.key === "Enter";
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
        rememberCheckbox.classList.add("PKU-Art", "pku-art-remember-checkbox");
        if (rememberCheckbox.dataset.pkuArtRememberChangeBound !== "true") {
          rememberCheckbox.addEventListener("change", updateAppearance);
          rememberCheckbox.dataset.pkuArtRememberChangeBound = "true";
        }
        if (!rememberCheckbox._pkuArtRememberObserver) {
          const attributeObserver = new MutationObserver(updateAppearance);
          attributeObserver.observe(rememberCheckbox, {
            attributes: true,
            attributeFilter: ["checked"]
          });
          rememberCheckbox._pkuArtRememberObserver = attributeObserver;
        }
      } else {
        const nativeIcon = getNativeIcon();
        if (nativeIcon && !nativeIcon._pkuArtRememberObserver) {
          const iconObserver = new MutationObserver(updateAppearance);
          iconObserver.observe(nativeIcon, {
            attributes: true,
            attributeFilter: ["class"]
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
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
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
  function refactorElectiveWorkPage() {
    if (!/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/electiveWork\/(ElectiveWorkController\.jpf|election\.jsp|electCourse\.do|cancelCourse\.do)\S*$/.test(
      window.location.href
    )) {
      return;
    }
    const refactorNotice = () => {
      const allTargetTds = document.querySelectorAll("td:has(> span.errmsg)");
      allTargetTds.forEach((targetTd) => {
        if (targetTd.dataset.pkuArtRefactored) {
          return;
        }
        const hasDirectTextNode = Array.from(targetTd.childNodes).some(
          (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0
        );
        if (!hasDirectTextNode) {
          return;
        }
        const errmsgSpan = targetTd.querySelector(":scope > span.errmsg");
        if (!errmsgSpan) {
          return;
        }
        console.log("[PKU Art] refactorNotice() processing td at " + ( new Date()).toLocaleString());
        const errmsgText = errmsgSpan.textContent.trim();
        errmsgSpan.remove();
        const rawText = targetTd.textContent.trim();
        const parts = rawText.split(/(?=（\d+）)/).map((p) => p.trim()).filter(Boolean);
        targetTd.innerHTML = "";
        parts.forEach((part) => {
          const trimmedPart = part.trim();
          if (!trimmedPart) {
            return;
          }
          const span = document.createElement("span");
          span.className = "PKU-Art pku-art-elective-notice-item";
          span.textContent = trimmedPart.replace(/[，。]+$/, "");
          targetTd.appendChild(span);
        });
        errmsgSpan.textContent = errmsgText.replace(/[，。]+$/, "");
        targetTd.appendChild(errmsgSpan);
        targetTd.dataset.pkuArtRefactored = "true";
        targetTd.classList.add("PKU-Art", "pku-art-elective-notice");
      });
    };
    const refactor = () => {
      refactorNotice();
      refactorElectiveDatagrid();
    };
    refactor();
    document.addEventListener("DOMContentLoaded", refactor);
  }
  function registerCloseContextMenuOnPage() {
    const closeContextMenu = () => {
      page.ContextMenu.closeAllContextMenus();
      document.removeEventListener("click", closeContextMenu);
    };
    document.addEventListener("click", closeContextMenu);
  }
  function initializeBatchDownload() {
    const url = window.location.href;
    if (!/^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/content\/listContent\.jsp/.test(url)) {
      return;
    }
    console.log("[PKU Art] initializeBatchDownload() initialized at " + ( new Date()).toLocaleString());
    function extractFileLinks(container) {
      const links = [];
      const anchors = container.querySelectorAll("a[href]");
      anchors.forEach((anchor) => {
        const href = anchor.getAttribute("href");
        if (href && href.includes("/bbcswebdav/")) {
          let fileName = decodeURIComponent(href.split("/").pop());
          if (fileName.includes("?")) {
            fileName = fileName.split("?")[0];
          }
          const linkText = anchor.textContent.trim();
          if (linkText && !linkText.includes("http") && linkText.length < 100) {
            const extMatch = fileName.match(/\.[a-zA-Z0-9]+$/);
            if (extMatch && !linkText.match(/\.[a-zA-Z0-9]+$/)) {
              fileName = linkText + extMatch[0];
            } else if (linkText.match(/\.[a-zA-Z0-9]+$/)) {
              fileName = linkText;
            }
          }
          links.push({
            url: href.startsWith("http") ? href : `https://course.pku.edu.cn${href}`,
            name: fileName
          });
        }
      });
      return links;
    }
    function downloadSingleFile(fileUrl, fileName) {
      return new Promise((resolve, reject) => {
        if (typeof _GM_download === "function") {
          _GM_download({
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
              reject(new Error("下载超时"));
            }
          });
        } else {
          const link = document.createElement("a");
          link.href = fileUrl;
          link.download = fileName;
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          resolve();
        }
      });
    }
    async function downloadFiles(files, statusElement) {
      if (files.length === 0) {
        alert("没有找到可下载的文件");
        return;
      }
      const total = files.length;
      let completed = 0;
      let errors = 0;
      const fileNameCount = {};
      statusElement.textContent = `下载中: 0/${total}`;
      for (const file of files) {
        let fileName = file.name;
        if (fileNameCount[fileName]) {
          const ext = fileName.lastIndexOf(".");
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
        if (completed < total) {
          await new Promise((r) => setTimeout(r, 300));
        }
      }
      if (errors > 0) {
        statusElement.textContent = `完成 (${errors}个失败)`;
      } else {
        statusElement.textContent = "下载完成";
      }
      setTimeout(() => {
        statusElement.textContent = "批量下载";
      }, 3e3);
    }
    function createDownloadButton(text, onClick) {
      const button = document.createElement("button");
      button.className = "PKU-Art pku-art-batch-download-btn";
      button.innerHTML = `${downloadIcon}<span class="pku-art-batch-download-text">${text}</span>`;
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const textSpan = button.querySelector(".pku-art-batch-download-text");
        if (textSpan.textContent.includes("下载中") || textSpan.textContent === "下载完成") {
          return;
        }
        onClick(textSpan);
      });
      return button;
    }
    function initButtons() {
      const contentItems = document.querySelectorAll("#content_listContainer > li");
      contentItems.forEach((item) => {
        if (item.querySelector(".pku-art-batch-download-btn")) {
          return;
        }
        const files = extractFileLinks(item);
        if (files.length === 0) {
          return;
        }
        const btn = createDownloadButton("批量下载", (statusEl) => {
          downloadFiles(files, statusEl);
        });
        const itemDiv = item.querySelector(".item");
        if (itemDiv) {
          itemDiv.appendChild(btn);
        }
      });
      const pageTitleDiv = document.querySelector("#pageTitleDiv");
      if (pageTitleDiv && !pageTitleDiv.querySelector(".pku-art-batch-download-btn")) {
        const allFiles = extractFileLinks(document.querySelector("#content_listContainer") || document.body);
        if (allFiles.length > 0) {
          const btn = createDownloadButton("下载全部", (statusEl) => {
            downloadFiles(allFiles, statusEl);
          });
          btn.classList.add("pku-art-download-all-btn");
          pageTitleDiv.appendChild(btn);
        }
      }
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initButtons);
    } else {
      initButtons();
    }
    const observer = new MutationObserver(() => {
      initButtons();
    });
    const startObserver = () => {
      const contentList = document.querySelector("#content_listContainer");
      if (contentList) {
        observer.observe(contentList, { childList: true, subtree: true });
      }
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", startObserver);
    } else {
      startObserver();
    }
  }
  applyStylesForCurrentPage();
  initializeThemeManager();
  initializeThemeToggleButton();
  initializeLogoNavigation();
  ensureSidebarVisible();
  overrideSiteIcons();
  removeCourseSerialNumbers();
  initializeDirectDownload();
  redirectGlobalMoreLink();
  enableDirectOpenLinks();
  manageElectiveCourseQueryForm();
  initializeBatchDownload();
  refactorIaaaPage();
  refactorElectiveFaqPage();
  refactorElectivePlanPage();
  refactorElectiveWorkPage();
  refactorElectiveCourseQueryPage();

})();