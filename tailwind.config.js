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
      'text': 'var(--text-color)',
      'text-light': 'var(--text-light)',
      'black-light': 'var(--background-color)',
      'gray': 'var(--gray)',
      'gray-dark': 'var(--gray-dark)',
      'gray-darker': 'var(--gray-darker)',
      'gray-light': 'var(--gray-light)',
      'gray-lighter': 'var(--gray-lighter)',
      'primary': '#4844FF',
      'green': '#15ffab',
      'red': '#fd4438',
      'white': 'var(--white)',
      'transparent': 'transparent',
      'gray-border': 'var(--gray-border)',
      'header-bg': 'var(--header-background-color)'
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
  darkMode: ['class', '[data-theme="dark"]'],
}

