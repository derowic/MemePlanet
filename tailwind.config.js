import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },

            colors:{
                'black1':'#111',
                'black3':'#666',
            },

            backgroundColor: {
                'black1':'#111',
                'black3':'#555',
                'black3-h':'#666',

            },

            textColor: {
                'my-text': 'white',
            },

            borderColor: {
                'my-border': '#555',
                'my-focus-border': '#666',
            },
        },

    },

    plugins: [
        forms,
        require('tailwind-scrollbar')({ nocompatible: true }),
    ],
};
