import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        monkey({
            entry: 'src/main.js',
            userscript: {
                icon: 'https://vitejs.dev/logo.svg',
                namespace: 'arthals/pku-art',
                match: ['*://*.pku.edu.cn/*'],
            },
        }),
    ],
});
