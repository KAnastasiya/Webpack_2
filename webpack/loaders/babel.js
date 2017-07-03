const transformObjectRestSpread = require('babel-plugin-transform-object-rest-spread');
const test = require('babel-plugin-transform-runtime');

module.exports = function () {
  return {
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              ['es2015', { modules: false }],
            ],
            plugins: [
              transformObjectRestSpread,
              test,
            ],
          },
        }],
      }],
    },
  };
};
