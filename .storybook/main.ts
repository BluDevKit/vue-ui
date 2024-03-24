import type { StorybookConfig } from '@storybook/vue3-vite';
import { fileURLToPath, URL } from 'url';

const config: StorybookConfig = {
    framework: {
        name: '@storybook/vue3-vite',
        options: {
            builder: {
                viteConfigPath: fileURLToPath(
                    new URL('./viteStorybook.config.ts', import.meta.url)
                ),
            },
        },
    },
    docs: {
        autodocs: 'tag',
        docsMode: false,
    },
    stories: [
        {
            titlePrefix: 'Vue UI/',
            directory: '../src/components',
            files: '**/*.stories.@(js|jsx|ts|tsx)',
        },
        {
            titlePrefix: 'Guide/',
            directory: './guide',
            files: '**/*.mdx',
        },
    ],
    addons: [
        '@storybook/addon-essentials',
        // 'storybook-addon-pseudo-states',
        '@storybook/addon-interactions',
        '@storybook/addon-themes',
    ],
};
export default config;
