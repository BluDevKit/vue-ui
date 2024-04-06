import { fileURLToPath, URL } from "url";
import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
    framework: {
        name: "@storybook/vue3-vite",
        options: {
            builder: {
                viteConfigPath: fileURLToPath(new URL("./viteStorybook.config.ts", import.meta.url)),
            },
        },
    },
    docs: {
        autodocs: "tag",
        docsMode: false,
    },
    stories: [
        {
            titlePrefix: "Vue UI Components/",
            directory: "../src/components",
            files: "**/*.stories.@(js|jsx|ts|tsx)",
        },
        {
            titlePrefix: "Vue UI Modules/",
            directory: "../src/modules",
            files: "**/*.stories.@(js|jsx|ts|tsx)",
        },
        {
            titlePrefix: "Guide/",
            directory: "./guide",
            files: "**/*.mdx",
        },
    ],
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-themes",
    ],
};
export default config;
