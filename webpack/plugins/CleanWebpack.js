const CleanWebpack = require('clean-webpack-plugin');

module.exports = function (path) {
  return {
    plugins: [
      new CleanWebpack([
        'dist',
        'build',
      ], {
        root: path,
        verbose: true,
        dry: false,
      }),
    ],
  };
};
