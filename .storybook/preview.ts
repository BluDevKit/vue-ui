import { bluDevKitUtils } from './../src/utils/toast';
import { type Preview, setup } from '@storybook/vue3';
import { extractArgTypes, updateModelValue } from './helpers';
import '@storybook/test';

import '../src/assets/style.css';
import './assets/stories.scss';
import { App } from 'vue';

setup((app: App) => {
    app.use(bluDevKitUtils);
});

const preview: Preview = {
    parameters: {
        options: {
            storySort: {
                method: 'configure',
                includeNames: true,
                order: [
                    'Guide',
                    ['What is Blu Dev Kit', 'Getting Started'],
                    '*',
                ],
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
