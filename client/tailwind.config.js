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
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
          50: 'var(--color-primary-50)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          dark: 'var(--color-secondary-dark)',
          light: 'var(--color-secondary-light)',
          50: 'var(--color-secondary-50)',
        },
        background: 'var(--color-bg)',
        text: 'var(--color-text)',
        'card-bg': 'var(--color-card-bg)',
        'card-border': 'var(--color-card-border)'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}

