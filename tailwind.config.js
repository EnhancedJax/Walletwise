/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class
  mode: 'jit',
  theme: {
    extend: {
      // colors: {
      // }
    },
    fontFamily: {
      inter: ["Inter"]
    },
    fontSize: {
      'xs': '10px',
      'sm': '13px',
      'base': ['15px', '22.5px'],
      'lg': '20px',
      'xl': '24px'
    }
  },
  plugins: [],
}