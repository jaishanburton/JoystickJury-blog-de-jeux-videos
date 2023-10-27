/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-font-inter'), // Plugin tailwindcss-font-inter
    require('@tailwindcss/typography'), // Plugin @tailwindcss/typography
    require('@tailwindcss/forms'), // Plugin @tailwindcss/forms
  ],
}
