import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
    build: {
        lib: {
            entry: [
                resolve(__dirname, './src/blu-dev-kit.ts'),
                resolve(__dirname, './src/utils.ts'),
            ],
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
                exports: 'named',
            },
        },
        emptyOutDir: true,
    },
    plugins: [
        vue(),
        libInjectCss(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@interfaces': resolve(__dirname, './interfaces'),
            '@public': resolve(__dirname, './public'),
        },
        extensions: ['.ts', '.vue', '.json', '.js'],
    },
});
