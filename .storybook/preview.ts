import { type Preview, setup } from '@storybook/vue3';
import { extractArgTypes, updateModelValue } from './helpers';
import '@storybook/testing-library';

import '../src/assets/style.css';
import './assets/stories.scss';

const preview: Preview = {
    parameters: {
        options: {
            storySort: {
                method: 'configure',
                includeNames: true,
                order: [
                    'Guide',
                    [
                        'What is Blu Dev Kit',
                        'Getting Started',
                    ],
                    '*',
                ],
            },
        },
        actions: { argTypesRegex: '^on[A-Z].*' },
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
