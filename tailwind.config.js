/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3dc681",
        primary_light: "#99d299",
        secondary: "#03785b",
        dark: "#1a202c",
        dark2: "#1e1e1e",
        light: "#F8F7F4",
        muted: "#c1c1c1c1",
      },
      fontFamily: {
        sans: ['"Press Start 2P"', "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
