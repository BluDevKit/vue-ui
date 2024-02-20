import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
    sidebar: {
        showRoots: true,
    },
    theme: create({
        // Brand
        base: 'light',
        brandTitle: 'Blu Dev Kit',
        brandUrl: 'https://www.ymaroblue.nl/',
        brandImage: '/favicon-32x32.png',

        // Colors
        colorPrimary: 'blue',
        colorSecondary: '#c1f516',

        // UI
        appBg: '#f4f4f4',

        // Typography
        textInverseColor: 'black',

        // Toolbar
        barTextColor: '#ffffff',
        barBg: '#121212',

        // Form colors
    }),
});
