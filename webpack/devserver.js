module.exports = function(path) {
  return {
    devServer: {
      contentBase: path,
      host: 'localhost',
      port: 8080,
      historyApiFallback: true,
      compress: true,
      inline: true,
      hot: true,
    },
  };
};
