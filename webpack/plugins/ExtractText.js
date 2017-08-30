module.exports = function(ExtractText) {
  return {
    plugins: [
      new ExtractText({
        publicPath: './',
        filename: 'style.css',
        allChunks: true,
      }),
    ],
  };
};
