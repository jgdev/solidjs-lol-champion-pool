/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          100: "#b3b4d0",
        },
        purple: {
          900: "#342b5b",
          800: "#382f66",
        },
        gold: "#ccad70",
      },
    },
  },
  plugins: [],
};
