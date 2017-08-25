module.exports = function (ExtractText) {
  return {
    module: {
      rules: [{
        test: /\.scss$/,
        use: ExtractText.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              minimize: true,
              sourceMap: true,
            },
          }, {
            loader: 'resolve-url-loader',
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                  browsers: ['> 1%', 'last 2 version'],
                  cascade: false,
                }),
              ],
            },
          }],
        }),
      }],
    },
  };
};
