/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        alternat: "alternat 3s infinite",
      },
      keyframes: {
        alternat: {
          "0%, 100%": { left: "0" },
          "50%": { left: "80%" },
        },
      },
    },
  },
  plugins: [],
};
