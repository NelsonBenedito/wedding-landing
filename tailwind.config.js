/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wedding-white': '#FAFAFA',
        'seal-blue': '#0F4C81',
        'seal-blue-light': '#85AEDB',
        'seal-light': '#E6EEF4', // Lighter gold for backgrounds/accents
        'text-dark': '#333333',
        'text-muted': '#666666',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
