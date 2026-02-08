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
        'champagne-gold': '#D4AF37',
        'gold-light': '#F3E5AB', // Lighter gold for backgrounds/accents
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
