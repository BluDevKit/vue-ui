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
                    '50': '#eef7ff',
                    '100': '#daecff',
                    '200': '#bcdeff',
                    '300': '#8ecaff',
                    '400': '#59abff',
                    '500': '#3388fe',
                    '600': '#1463f3',
                    '700': '#1552e0',
                    '800': '#1843b5',
                    '900': '#193d8f',
                    '950': '#142757',
                },
            }
        }
    },        
}

