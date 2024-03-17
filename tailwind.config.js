/** @type {import('tailwindcss').Config} */

import tailwindConfig from './public/tailwind.config.js';
export default {
    content: [...tailwindConfig.content],
    theme: {
        extend: {
            ...tailwindConfig.theme.extend,
        },
    },
    plugins: [...tailwindConfig.plugins],
};
