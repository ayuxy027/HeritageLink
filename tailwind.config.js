/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        'proj': 'linear-gradient(to right, #2b6cb0, #3182ce)',
        'proj-hover': 'linear-gradient(to right, #1e4e8c, #2563eb)', // Slightly darker gradient for hover
      },
    },
  },
  variants: {
    extend: {
      backgroundImage: ['hover'],
    },
  },
  plugins: [],
};