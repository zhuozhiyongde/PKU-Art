import { defineConfig } from 'vite';
import monkey, { util } from 'vite-plugin-monkey';
import mkcert from 'vite-plugin-mkcert';
import fs from 'fs';
import dotenv from 'dotenv';
import AutoImport from 'unplugin-auto-import/vite';

const date = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
});

const packageConfig = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const envConfig = fs.existsSync('.env') ? dotenv.parse(fs.readFileSync('.env')) : {};
const upstreamRelease = 'https://cdn.arthals.ink/release/PKU-Art.user.js';
const forkRelease = 'https://raw.githubusercontent.com/qingshungLI/PKU-Art/main/release/PKU-Art.user.js';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const localBuild = mode === 'local-build' || process.env.PKU_ART_LOCAL === '1';
    const forkBuild = mode === 'fork' || process.env.PKU_ART_FORK === '1';
    const buildVersion = process.env.PKU_ART_VERSION || envConfig.VERSION || packageConfig.version;
    const localVersion = process.env.PKU_ART_VERSION || `${buildVersion}.9999`;
    return {
        build: forkBuild ? { outDir: 'release', emptyOutDir: false } : undefined,
        plugins: [
            AutoImport({
                imports: [util.unimportPreset],
            }),
            mkcert(),
            monkey({
                entry: 'src/main.js',
                userscript: {
                    icon: 'http://cdn.arthals.ink/Arthals-mcskin.png',
                    namespace: 'arthals/pku-art',
                    name: 'PKU-Art',
                    description: '给你一个足够好看的北大网站。',
                    match: ['*://*.pku.edu.cn/*'],
                    // local development
                    // match: ['*://*.pku.edu.cn/*', 'http://localhost:8000/*'],
                    'run-at': 'document-start',
                    'inject-into': 'page',
                    version: localBuild ? localVersion : buildVersion,
                    updateURL: localBuild ? 'none' : (forkBuild ? forkRelease : upstreamRelease),
                    downloadURL: localBuild ? 'http://127.0.0.1:8877/pku-art.user.js' : (forkBuild ? forkRelease : upstreamRelease),
                    supportURL: forkBuild ? 'https://github.com/qingshungLI/PKU-Art/issues' : 'https://github.com/zhuozhiyongde/PKU-Art/issues',
                    connect: ['pku.edu.cn', '127.0.0.1'],
                    license: 'GPL-3.0 license',
                    author: 'Arthals',
                    $extra: {
                        'author-blog': 'https://arthals.ink',
                        ...(forkBuild ? {} : { date }),
                    },
                },
                server: { mountGmApi: true },
            }),
        ],
    };
});
