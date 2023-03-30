import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        monkey({
            entry: 'src/main.js',
            userscript: {
                icon: 'http://cdn.arthals.ink/Arthals-mcskin.png',
                namespace: 'arthals/pku-art',
                name: 'PKU-Art',
                description: '给你一个足够好看的教学网。',
                match: ['*://*.pku.edu.cn/*'],
                'run-at': 'document-end',
            },
        }),
    ],
});
