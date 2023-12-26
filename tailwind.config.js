/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navyblue: {
          dark: "#22282F",
          light: "#5497B0",
        },
        gray: {
          dark: "#22282F",
        },
        red: {
          dark: "#CE2424",
        },
      },
    },
  },
  plugins: [],
}
