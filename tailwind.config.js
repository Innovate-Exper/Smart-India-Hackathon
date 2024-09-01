/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensures Tailwind scans all JS/TS/JSX/TSX files in src
  ],
  theme: {
    extend: {}, // You can extend the theme here
  },
  plugins: [], // Add any plugins here if necessary
}
