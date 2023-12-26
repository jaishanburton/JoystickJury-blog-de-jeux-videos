/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Assurez-vous que tous vos chemins sont correctement spécifiés
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Ajoutez d'autres chemins si nécessaire
  ],
  darkMode: 'class', // Activez le mode sombre avec des classes
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-font-inter'), // Plugin tailwindcss-font-inter
    require('@tailwindcss/typography'), // Plugin @tailwindcss/typography
    require('@tailwindcss/forms'), // Plugin @tailwindcss/forms
    // Vous pouvez ajouter d'autres plugins si nécessaire
  ],
}
