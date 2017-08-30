const webpack = require('webpack');

module.exports = function(env) {
  return {
    plugins: [
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(env),
      }),
    ],
  };
};
