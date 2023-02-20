/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xsm': '300px',
      },
      colors: {
        'cream': 'rgb(240 231 219)',
        'lightcream': 'rgb(250 243 234)'
      },
    },
  },
  plugins: [],
}
