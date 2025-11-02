/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: {
            start: '#5FA5FB',
            end: '#3851F9',
            accent: '#6197FB',
          },
        },
        dark: {
          bg: '#1D1D1D',
          page: '#121419', // rgb(18, 20, 25)
        },
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(to right, #5FA5FB, #3851F9)',
      },
    },
  },
  plugins: [],
}

