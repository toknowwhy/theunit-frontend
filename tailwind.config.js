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
    extend: {
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
        'green': '#FF8243',
        'red': '#6495ED',
        'white': 'var(--white)',
        'transparent': 'transparent',
        'gray-border': 'var(--gray-border)',
        'gray-medium': 'var(--gray-medium)',
        'box': 'var(--box)',
        'input': 'var(--input)',
        'shadow': 'var(--shadow)',
        'unit-orange': '#FF8243',
        'unit-blue': '#6495ED',
        'gray-border-light': 'var(--gray-border-light)'
      },
      backgroundImage: {
        'vault': 'url(/bgds/vault-bgd.png)',
      },
      minHeight: {
        'body': 'calc(100vh - theme(top.16))',
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
  darkMode: ['class', '[data-theme="dark"]'],
}

