/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'text': '#F5F5FF',
      'black-light': '#0A0A0A',
      'gray': '#70707C',
      'gray-dark': '#1D1D1F',
      'gray-darker': '#101011',
      'gray-light': '#E3E4E7',
      'primary': '#4844FF',
      'green': '#15ffab',
      'red': '#fd4438',
      'white': '#ffffff'
    },
  },
  plugins: [],
}

