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
        'seal-light': '#E6EEF4',
        'text-dark': '#333333',
        'text-muted': '#666666',
        'background': 'var(--background)',
        'card-bg': 'var(--card-bg)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
