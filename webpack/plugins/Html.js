const WebpackHtml = require('html-webpack-plugin');

module.exports = function() {
  return {
    plugins: [
      new WebpackHtml({
        filename: 'index.html',
        chunks: ['index', 'common'],
        template: './index.pug',
      }),
    ],
  };
};
