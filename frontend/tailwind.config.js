/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        leather: {
          500: "#D4A373", // A rich leather brown
          400: "#E5B788",
          300: "#F0CDA5",
        },
      },
    },
  },
  plugins: [],
}