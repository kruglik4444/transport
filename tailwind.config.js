/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  mode: 'jit',
  corePlugins: {
    preflight: false
  },
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
        '4xl': '1920px',
        '5xl': '2140px'
      },
    },
  },
  plugins: [],
}

