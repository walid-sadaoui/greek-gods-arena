module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        greek: '"Freckle Face"',
        mono: '"Share Tech Mono"',
        sans: 'Acme',
      },
      maxHeight: {
        '3/4': '75%',
      },
      backgroundImage: {
        wall: 'url(/src/assets/img/wall.jpg)',
      },
      borderRadius: {
        container: '95% 4% 92% 5% / 4% 95% 6%',
      },
      width: {
        100: '25rem',
        120: '30rem',
      },
      boxShadow: {
        play: '0 10px #31ccff',
        'text-outline': '0 0 2px 2px rgba(0, 0, 0, 1)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.text-outline': {
            '-webkit-text-stroke': '1px black', // Black stroke with 1px thickness
            color: 'white', // Text color
          },
        },
        ['responsive', 'hover']
      );
    },
  ],
};
