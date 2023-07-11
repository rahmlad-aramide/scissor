/* eslint-disable prettier/prettier */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#005AE2",
        dark: "#141414",
        light: "#E4E3E3",
        neutral: {
          100: "#EDF2F7",
          200: "#E2E9F0",
          300: "#CBD6E0",
          400: "#A0B1C0",
          500: "#5C6F7F",
          600: "#2E4457",
          700: "#1E3448",
          800: "#112232",
          900: "#071827",
        },
      },
      backgroundImage: {
        "hero-texture": "url('/images/aurora.png')",
        "hero-pattern": "url('/images/hero-pattern.jpg')",
        "trim-texture": "url('/images/bg-trim.jpg')",
        "revolutionize-texture": "url('/images/bg-revolutionizing.jpg')",
        get1: "url('/images/get-in-touch.png')",
        get2: "url('/images/get-in-touch2.png')",
      },
      fontFamily: {
        kanit: ["Kanit", "sans-serif"],
      },
      screens: {
        sm: "576px",
        // => @media (min-width: 576px) { ... }

        md: "960px",
        // => @media (min-width: 960px) { ... }

        lg: "1440px",
        // => @media (min-width: 1440px) { ... }
      },
    },
  },
  plugins: [],
};
