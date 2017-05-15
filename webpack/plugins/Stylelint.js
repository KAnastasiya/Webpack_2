const StyleLint = require('stylelint-webpack-plugin');

module.exports = function () {
  return {
    plugins: [
      new StyleLint({
        failOnError: false,
        quiet: false,
        syntax: 'scss',
      }),
    ],
  };
};
