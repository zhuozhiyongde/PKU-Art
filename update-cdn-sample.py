# -*- encoding: utf-8 -*-
#@Author  :   Arthals
#@File    :   update-cdn.py
#@Time    :   2023/03/02 12:48:58
#@Contact :   zhuozhiyongde@126.com
#@Software:   Visual Studio Code

from dotenv import load_dotenv, set_key
import datetime
import sys
import re
import os


def generate_release():

    def get_info():
        f = open('./src/main.js', 'r', encoding='utf-8')
        lines = f.readlines()
        f.close()

        content = ''.join(lines)
        # print(content)

        regex_pattern = re.compile(r"/.*?/(?=\.test)", re.MULTILINE)
        regex_content_list = regex_pattern.findall(content)

        css_pattern = re.compile(r"(?m)(?<=import\('\.).*(?='\))",
                                 re.MULTILINE)
        css_content_list = css_pattern.findall(content)

        iife_pattern = re.compile(r'\((function.*?\(.*?\).*?\))\(\);',
                                  flags=re.DOTALL)
        iife_content_list = [
            iife.group() for iife in iife_pattern.finditer(content)
        ]

        return regex_content_list, css_content_list, iife_content_list

    def generate_js(regex_list: list, css_list: list, iife_list: list):
        cdn_inject_css_pattern = '''
    if ({regex}.test(htmlpath)) {{
        let pkuartcss = document.createElement("link");
        pkuartcss.href = 'https://cdn.arthals.ink{link}'
        pkuartcss.rel = "stylesheet";
        pkuartcss.className = "PKU-Art {link}";
        pkuartcss.type = "text/css";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected https://cdn.arthals.ink{link}.");
    }}
'''
        local_inject_css_pattern = '''
    if ({regex}.test(htmlpath)) {{
        let pkuartcss = document.createElement("style");
        pkuartcss.innerHTML = `{css}`;
        pkuartcss.className = "PKU-Art";
        document.documentElement.appendChild(pkuartcss);
        console.log("[PKU-Art] Injected local css.");
    }}
'''
        inject_css = ''.join([
            local_inject_css_pattern.format(\
                regex=regex, \
                css=open('src/'+css, 'r', encoding='utf-8').read()
            )
            for regex, css in zip(regex_list, css_list)
        ])

        inject_func = '''
function injectPKUArt () {{
    let htmlpath = location.href;
    {inject_css}
}}
'''

        file_header = '''// ==UserScript==
// @name         PKU-Art
// @description  给你一个足够好看的教学网
// @version      {version}
// @match        *://*.pku.edu.cn/*
// @run-at       document-start
// @author       Arthals
// @license      GPL-3.0 license
// @author-blog  https://arthals.ink
// @icon         https://cdn.arthals.ink/Arthals-mcskin.png
// @namespace    https://github.com/zhuozhiyongde/PKU-Art
// @supportURL   https://github.com/zhuozhiyongde/PKU-Art/issues
// @updateURL    https://cdn.arthals.ink/release/PKU-Art.user.js
// @date         {date}
// ==/UserScript==
(function () {{
    'use strict';
    injectPKUArt();
}})()
'''
        file = file_header.format(version=version, date=date)\
                + inject_func.format(inject_css=inject_css)\
                + '// Other IIFE\n' + '\n'.join(iife_list)
        f = open('./release/PKU-Art.user.js', 'w', encoding='utf-8')
        f.write(file)
        f.close()

    def generate_css(regex_list: list, css_list: list):
        file_header = '''/* ==UserStyle==
// @name         PKU-Art
// @description  给你一个足够好看的教学网
// @version      {version}
// @match        *://*.pku.edu.cn/*
// @run-at       document-start
// @author       Arthals
// @license      GPL-3.0 license
// @author-blog  https://arthals.ink
// @namespace    https://github.com/zhuozhiyongde/PKU-Art
// @supportURL   https://github.com/zhuozhiyongde/PKU-Art/issues
// @updateURL    https://cdn.arthals.ink/release/PKU-Art.user.js
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
        f = open('./release/PKU-Art.user.css', 'w', encoding='utf-8')
        f.write(output)

    regex_content_list, css_content_list, iife_content_list = get_info()
    # check length
    if len(regex_content_list) != len(css_content_list):
        # save length as css
        length = len(css_content_list)
        regex_content_list = regex_content_list[:length]

    print('检测到 css 引入共计 %s 次' % len(css_content_list))
    print('检测到 style regex 分支共计 %s 次' % len(regex_content_list))
    print('检测到 IIFE 包裹共计 %s 次' % len(iife_content_list))

    generate_js(regex_content_list, css_content_list, iife_content_list)
    generate_css(regex_content_list, css_content_list)


def build():
    print('[生成 Release 文件]')
    generate_release()


load_dotenv('version.env')
version = os.getenv('VERSION')
built = os.getenv('BUILT')
date = datetime.datetime.now().strftime("%Y/%m/%d")

if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == 'build':
            print('[🦄构建中]')
            print('[Version: %s]' % version)
            build()
            print('[💮构建完成]')
            set_key('version.env', 'BUILT', 'true')
    else:
        print('[💡请指定参数 build 或 update]')
