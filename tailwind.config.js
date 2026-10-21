/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F5B82E",
        secondary: "#2563EB",
        tertiary: "#F97316",
        background: "#FAF8F5",
        surface: "#FFFFFF",
        "surface-db": "#FEF6D8",
        "badge-info": "#CFE8FC"
      },
      boxShadow: {
        'hard': '4px 4px 0px #000000',
        'hard-sm': '2px 2px 0px #000000',
        'hard-md': '3px 3px 0px #000000'
      }
    },
  },
  plugins: [],
}
