/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        'proj': 'linear-gradient(to right, #2b6cb0, #3182ce)',
        'proj-hover': 'linear-gradient(to right, #1e4e8c, #2563eb)',
      },
      colors: {
        'proj': '#2b6cb0', // Using the starting color of your gradient for consistency
      }
    },
  },
  variants: {
    extend: {
      backgroundImage: ['hover'],
    },
  },
  plugins: [],
};