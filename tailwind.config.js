/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms"

export default {
    content: [
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./public/**/*.{vue,js,ts,jsx,tsx}",
        './node_modules/@blu/dev-kit/**/*.vue',
    ],
    plugins: [
        forms,
    ],
}

