/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0D0B14',
        'bg-surface': '#171320',
        'bg-cream': '#FAF6ED',
        'bg-cream-alt': '#F1E9D8',
        'gold': '#C9A24B',
        'gold-light': '#E4C77E',
        'gold-dark': '#8C6D1F',
        'maroon': '#6B1E23',
        'text-primary': '#F5F0E6',
        'text-dark': '#231F2C',
        'text-muted': '#A79C87',
        'success': '#3F7D4F',
        'warning': '#C9822A',
        'danger': '#B23A32',
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(201, 162, 75, 0.25)',
        'gold-sm': '0 0 10px rgba(201, 162, 75, 0.15)',
        'dark-card': '0 10px 30px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
