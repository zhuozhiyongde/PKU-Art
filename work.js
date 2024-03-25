// ==UserScript==
// @name       vite-plugin-monkey-bug
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @icon       https://vitejs.dev/logo.svg
// @match      *://*.pku.edu.cn/*
// @run-at     document-start
// ==/UserScript==

(function () {
    'use strict';
    console.log('start');
    let downloadUrl = '';
    const originOpen = XMLHttpRequest.prototype.open;
    const originSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (_, url) {
        if (url.includes('search-live-course-list')) {
            console.log('[PKU Art] XHR 请求截获：\n', url);
            downloadUrl = url;
        }
        originOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function () {
        this.addEventListener('load', function () {
            if (this.responseURL === downloadUrl) {
                console.log('[PKU Art] XHR 响应结果：\n', this.response);
            }
        });
        originSend.apply(this, arguments);
    };
    console.log('end');
    // 循环检测 downloadUrl 是否被修改
    const intervalId = setInterval(() => {
        if (downloadUrl) {
            console.log('downloadUrl:', downloadUrl);
            clearInterval(intervalId);
        }
    }, 1000);
})();
