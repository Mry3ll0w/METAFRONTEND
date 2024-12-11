const { text } = require('stream/consumers')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addBase, config }) {
      addBase({
        'a': { textDecoration: 'none' },
        
      })
    },
  ],
}