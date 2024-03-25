import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import mkcert from 'vite-plugin-mkcert';
import fs from 'fs';
import dotenv from 'dotenv';

const date = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
});

// 读取并解析 version.env 文件
const envConfig = dotenv.parse(fs.readFileSync('./version.env'));

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        mkcert(),
        monkey({
            entry: 'src/main.js',
            userscript: {
                icon: 'http://cdn.arthals.ink/Arthals-mcskin.png',
                namespace: 'arthals/pku-art',
                name: 'PKU-Art',
                description: '给你一个足够好看的教学网。',
                match: ['*://*.pku.edu.cn/*'],
                'run-at': 'document-start',
                'inject-into': 'page',
                version: envConfig.VERSION,
                updateURL: 'https://cdn.arthals.ink/release/PKU-Art.user.js',
                supportURL: 'https://github.com/zhuozhiyongde/PKU-Art/issues',
                license: 'GPL-3.0 license',
                $extra: {
                    'author-blog': 'https://arthals.ink',
                    date,
                },
            },
            server: { mountGmApi: true },
        }),
    ],
});
