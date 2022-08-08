// ==UserScript==
// @name        PKU-Art
// @description 给你一个足够好看的教学网。
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
    let pkuToolJS = document.createElement('script');
    pkuToolJS.src = "https://s-bj-2937-artdoge.oss.dogecdn.com/PKU-Art.js";
    document.head.appendChild(pkuToolJS);
    console.log('injected');
})()