/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          russo: ['var(--font-russo)', 'sans-serif'],
          lexend: ['var(--font-lexend)', 'sans-serif'],
        },
        colors: {
          black: '#000000',
          white: '#FFFFFF',
        },
      },
    },
    plugins: [],
  };