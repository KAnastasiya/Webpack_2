const webpack = require('webpack');

module.exports = function() {
  return {
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: 2,
      }),
    ],
  };
};
