import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    define: {
        'process.env': {},
        ...(process.env.NODE_ENV === 'production' ? {
            global: 'global',
        } : {}),
    },
    build: {
        rollupOptions: {
            external: [
                '@storybook/testing-library',
            ],
        },
    },
});
