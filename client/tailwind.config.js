/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-green': '#295b3f',
                'bg-green-start': '#1c3d2a',
                'bg-green-end': '#0f2418',
            },
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
