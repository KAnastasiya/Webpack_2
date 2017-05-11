module.exports = function () {
  return {
    module: {
      rules: [{
        test: /\.svg$/,
        use: [{
          loader: 'svg-sprite-loader',
          options: {
            extract: true,
          },
        }, {
          loader: 'svgo-loader',
        }],
      }],
    },
  };
};
