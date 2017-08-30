const CopyWebpack = require('copy-webpack-plugin');

module.exports = function() {
  return {
    plugins: [
      new CopyWebpack([
        {
          from: 'static',
          to: 'static',
        },
      ]),
    ],
  };
};
