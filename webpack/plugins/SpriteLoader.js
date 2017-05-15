const SpriteLoader = require('svg-sprite-loader/plugin');

module.exports = function () {
  return {
    plugins: [
      new SpriteLoader(),
    ],
  };
};
