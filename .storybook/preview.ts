import { type Preview, setup } from "@storybook/vue3";
import { createPinia } from "pinia";
import { App } from "vue";
import { bluDevKitUtils } from "../src/utils/toast";
import { extractArgTypes, updateModelValue } from "./helpers";
import "@storybook/test";

import "../src/assets/style.css";
import "./assets/stories.scss";

const pinia = createPinia();

setup((app: App) => {
    app.use(pinia);
    app.use(bluDevKitUtils, {
        maxToasts: 15,
    });
});

const preview: Preview = {
    parameters: {
        // actions: { argTypesRegex: "^on[A-Z].*" },
        options: {
            storySort: {
                method: "configure",
                includeNames: true,
                order: ["Guide", ["What is Blu Dev Kit", "Getting Started"], "*"],
            },
        },
        controls: {
            matchers: {
                color: / (background | color)$/i,
                date: /Date$/,
            },
            controls: {
                expended: true,
            },
        },
        docs: {
            extractArgTypes,
            source: {
                excludeDecorators: true,
            },
        },
    },
    decorators: [updateModelValue()],
};

export default preview;
