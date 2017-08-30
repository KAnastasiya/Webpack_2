module.exports = function(path) {
  return {
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif)$/,
          // test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: `${path}/[name].[ext]?[hash]`,
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  quality: 65,
                  progressive: true,
                },
                pngquant: {
                  quality: '50-65',
                  speed: 4,
                },
                // svgo: {
                //   plugins: [
                //     { removeViewBox: false },
                //     { removeEmptyAttrs: false },
                //   ],
                // },
              },
            },
          ],
        },
      ],
    },
  };
};
