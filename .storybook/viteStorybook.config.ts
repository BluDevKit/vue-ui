import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@/components': resolve(__dirname, '../src/components'),
            '@/composables': resolve(__dirname, '../src/composables'),
            '@/utils': resolve(__dirname, '../src/utils'),
        },
        extensions: [
            '.mjs',
            '.js',
            '.mts',
            '.ts',
            '.jsx',
            '.tsx',
            '.json',
            '.vue',
        ],
    },
    define: {
        'process.env': {},
        ...(process.env.NODE_ENV === 'production'
            ? {
                  global: 'global',
              }
            : {}),
    },
    build: {
        rollupOptions: {
            external: ['@storybook/testing-library'],
        },
    },
});
