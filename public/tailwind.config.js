/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms"

export default {
    content: [
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./public/**/*.{vue,js,ts,jsx,tsx}",
        './node_modules/@bludevkit/vue-ui/**/*.vue',
    ],
    plugins: [
        forms,
    ],
    theme: {
        extend: {
            colors: {
                blu: {
                    100: '#f0f0ff',
                    200: '#d9d9ff',
                    300: '#bfbfff',
                    400: '#47479f',
                    500: '#00007f',
                    600: '#000070',
                    700: '#000060',
                    800: '#000050',
                    900: '#000040',
                },
            }
        }
    },        
}

