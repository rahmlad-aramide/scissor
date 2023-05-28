/* eslint-disable prettier/prettier */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#005AE2', 
        'dark': '#141414',
        'light': '#E4E3E3',
        neutral: {
          100: '#EDF2F7',
          200: '#E2E9F0',
          300: '#CBD6E0',
          400: '#A0B1C0',
          500: '#5C6F7F',
          600: '#2E4457',
          700: '#1E3448',
          800: '#112232',
          900: '#071827'
        },
      },
      backgroundImage: {
        'hero-texture': "url('./src/assets/images/aurora.png')",
        'hero-pattern': "url('./src/assets/images/hero-pattern.jpg')",
        'trim-texture': "url('./src/assets/images/bg-trim.jpg')",
        'revolutionize-texture': "url('./src/assets/images/bg-revolutionizing.jpg')",
      },
      fontFamily: {
        'kanit': ['Kanit', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
