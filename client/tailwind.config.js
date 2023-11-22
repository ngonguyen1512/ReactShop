/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/index.html',
  ],
  theme: {
    extend: {
      width: {
        '1200': '1200px',
      },
      height: {
        '50': '50px',
      },
      backgroundColor: {
        white: "#fff",
        black: "#000",
        lightgray: "#fafafa",
        gray: "#a0a0a0",
        red: '#ff0000',
      },
      cursor: {
        pointer: 'pointer',
      },
      textColor: {
        white: "#fff",
        black: "#000",
        lightgray: "#fafafa",
        gray: "#a0a0a0",
        red: '#ff0000',
      }
    },
  },
  plugins: [],
}

