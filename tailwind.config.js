/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/tailwind')],
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
