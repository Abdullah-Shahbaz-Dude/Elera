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
          DEFAULT: '#7C3AED',
          blue: {
            start: '#5FA5FB',
            end: '#3851F9',
            accent: '#6197FB',
          },
        },
        'background-light': '#F8FAFC',
        'background-dark': '#0B0B13',
        'card-dark': '#161625',
        'accent-blue': '#3B82F6',
        'accent-purple': '#8b5cf6',
        'surface-dark': '#161625',
        dark: {
          bg: '#1D1D1D',
          page: '#121419',
        },
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '12px',
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(to right, #5FA5FB, #3851F9)',
      },
    },
  },
  plugins: [],
}

