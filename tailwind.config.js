/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle2: {
          "0%": { opacity: 0, transform: "translateX(-100%)" },
          "100%": { opacity: 1, transform: "translateX(0%)" },
        },
      },
      animation: {
        wiggle: "wiggle2 .5s ease-in-out 1",
      },
      fontFamily: {
        yekan: ["yekan", "sans-setif"],
      },
    },
  },
  plugins: [],
});
