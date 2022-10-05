module.exports = {
  darkMode: "class",
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "josefin-sans": ['"Josefin Sans"', "serif"],
      },
      colors: {
        customBackground: "rgb(251,251,251)",
      },
    },
  },
  plugins: [],
};
