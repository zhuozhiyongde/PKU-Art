# -*- encoding: utf-8 -*-
#@Author  :   Arthals
#@File    :   custom-builder.py
#@Time    :   2023/02/27 15:13:03
#@Contact :   zhuozhiyongde@126.com
#@Software:   Visual Studio Code

import re


def get_css(text: str):
    css = re.search(r'^\s*import\(\'\.\/(.*)\'\)', text)
    return css.group(1)


def generate_js(regex_list: list, css_list: list):
    inject_css_pattern = '''
    if ({regex}.test(htmlpath)) {{
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink{link}'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("PKU-Art: Injected https://cdn.arthals.ink{link}.");
    }}
'''
    inject_func = '''
function injectPKUArt () {{
    let htmlpath = location.href;
    {inject_css}
}}
'''
    inject_css = ''.join([
        inject_css_pattern.format(regex=regex, link=css)
        for regex, css in zip(regex_list, css_list)
    ])

    file_header = '''// ==UserScript==
// @name         PKU-Art
// @description  给你一个足够好看的教学网
// @version      {version}
// @match        *://*.pku.edu.cn/*
// @author       Arthals
// @license      GPL-3.0 license
// @author-blog  https://arthals.ink
// @icon         https://cdn.arthals.ink/Arthals-mcskin.png
// @namespace    https://github.com/zhuozhiyongde/PKU-Art
// @supportURL   https://github.com/zhuozhiyongde/PKU-Art/issues
// @date         {date}
// ==/UserScript==
(function () {{
    'use strict';
    injectPKUArt();
}})()
'''
    file = file_header.format(
        version=version, date=date) + inject_func.format(inject_css=inject_css)
    f = open('./release/PKU-Art.js', 'w', encoding='utf-8')
    f.write(file)
    f.close()


def generate_css(regex_list: list, css_list: list):
    file_header = '''/* ==UserStyle==
// @name         PKU-Art
// @description  给你一个足够好看的教学网
// @version      {version}
// @match        *://*.pku.edu.cn/*
// @author       Arthals
// @license      GPL-3.0 license
// @author-blog  https://arthals.ink
// @namespace    https://github.com/zhuozhiyongde/PKU-Art
// @supportURL   https://github.com/zhuozhiyongde/PKU-Art/issues
// @date         {date}
==/UserStyle== */
'''

    def get_css_content(css: str):
        f = open('./src/' + css, 'r', encoding='utf-8')
        lines = []
        for line in f.readlines():
            if re.match(r'@import', line):
                continue
            lines.append(line)

        f.close()
        return ''.join(lines)

    def generate_moz_css(regex: str, css: str):
        return '''@-moz-document regexp("{regex}") {{
    {css}
}}
'''.format(regex=regex.replace('\\', '\\\\')[1:-2], css=get_css_content(css))

    output = file_header.format(version=version, date=date) + ''.join([
        generate_moz_css(regex, css)
        for regex, css in zip(regex_list, css_list)
    ])
    f = open('./release/PKU-Art.css', 'w', encoding='utf-8')
    f.write(output)


def get_info():
    f = open('./src/main.js', 'r', encoding='utf-8')
    lines = f.readlines()
    f.close()

    content = ''.join(lines)
    # print(content)

    regex_pattern = re.compile(r"/.*?/(?=\.test)", re.MULTILINE)
    regex_content_list = regex_pattern.findall(content)

    css_pattern = re.compile(r"(?m)(?<=import\('\.).*(?='\))", re.MULTILINE)
    css_content_list = css_pattern.findall(content)
    print(len(css_content_list))
    print(len(regex_content_list))

    return regex_content_list, css_content_list


def main():
    regex_content_list, css_content_list = get_info()
    generate_js(regex_content_list, css_content_list)
    generate_css(regex_content_list, css_content_list)


version = "2.2"
date = "2023/02/27"
if __name__ == "__main__":
    main()