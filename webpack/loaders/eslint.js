module.exports = function() {
  return {
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /(node_modules)/,
          include: /src/,
          loader: 'eslint-loader',
          options: {
            fix: true,
          },
        },
      ],
    },
  };
};
