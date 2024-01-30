/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class
  mode: 'jit',
  // purge: ['./src/**/*.{js}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        cpg: '#242424',
        cbg: '#FEFEFE',
        cborder: '#D1D1D1',
        cpg2: '#797979',
        cgray: '#B0B0B0',
        cligthgray: '#F3F3F3',
        cneg: '#FF4040',
        cpos: '#35B661'
      }
    },
    fontFamily: {
      sans: ['"Inter"', 'sans-serif'],
      mono: ['"DM Mono"', 'sans-serif']
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