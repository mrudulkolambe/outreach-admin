/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main": "#e9eff7",
        "accent": "#3F70ED"
      },
    },
  },
  plugins: [],
}