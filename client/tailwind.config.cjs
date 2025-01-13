const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        greek: ['"Caesar Dressing"', ...defaultTheme.fontFamily.sans],
        mono: ['"Share Tech Mono"', ...defaultTheme.fontFamily.mono],
      },
      maxHeight: {
        "3/4": "75%",
      },
      backgroundImage: {
        wall: "url(/src/assets/img/wall.jpg)",
        stripes:
          "linear-gradient(45deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.05) 75%, transparent 75%, transparent)",
      },
      borderRadius: {
        container: "95% 4% 92% 5% / 4% 95% 6%",
      },
      width: {
        100: "25rem",
        120: "30rem",
      },
      boxShadow: {
        play: "0 10px #31ccff",
        "text-outline": "0 0 2px 2px rgba(0, 0, 0, 1)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".text-outline": {
            "-webkit-text-stroke": "1px black", // Black stroke with 1px thickness
            color: "white", // Text color
          },
          ".bg-stripes": {
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 10px, transparent 10px, transparent 20px)",
          },
          ".text-shadow": {
            textShadow:
              "0 2px 0 rgb(255 255 255 / 50%), 0 -2px 0 rgb(0 0 0 / 35%)",
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
