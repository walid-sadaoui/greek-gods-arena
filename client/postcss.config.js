module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    'postcss-preset-env': {
      stage: 1,
      features: {
        'focus-within-pseudo-class': false,
      },
    },
    ...(process.env.NODE_ENV === 'production'
      ? {
          cssnano: {
            preset: 'default',
          },
        }
      : {}),
  },
};
