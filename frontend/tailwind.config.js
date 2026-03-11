/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0B5ED7",
                secondary: "#FFFFFF",
                accent: "#E6F0FF",
                dark: "#1a1a1a",
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
                opensans: ["Open Sans", "sans-serif"],
            },
            animation: {
                'ken-burns': 'ken-burns 20s ease-in-out infinite alternate',
            },
            keyframes: {
                'ken-burns': {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.1)' },
                }
            }
        },
    },
    plugins: [],
}
