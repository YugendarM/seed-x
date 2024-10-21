/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        seedxPrimaryGreen: "#15B392",
        seedxTextGreen: "#54C392",
        seedxSecondaryGreen: "#73EC8B",
        seedxBgGreen: "#D2FF72"
      },
      boxShadow: {
        'custom-light': '0 0 10px rgba(0, 0, 0, 0.1)',
        'custom-medium': '0 0 15px rgba(0, 0, 0, 0.2)',
        'custom-heavy': '0 0 20px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}