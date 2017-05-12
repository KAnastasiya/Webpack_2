const webpack = require('webpack');
const WebpackHtml = require('html-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const StyleLint = require('stylelint-webpack-plugin');
const SpriteLoader = require('svg-sprite-loader/plugin');
const webpackMerge = require('webpack-merge');

const babel = require('./webpack/babel');
const pug = require('./webpack/pug');
const css = require('./webpack/css');
const scss = require('./webpack/scss');
const url = require('./webpack/url');
const svg = require('./webpack/svg');
const eslint = require('./webpack/eslint');
const devServer = require('./webpack/devserver');

const path = require('path');

const PATHS = {
  source: path.resolve(__dirname, 'test'),
  build: path.resolve(__dirname, 'dist'),
};

const NODE_ENV = process.env.NODE_ENV || 'dev';

const common = webpackMerge([
  {
    context: PATHS.source,
    entry: {
      index: './index.js',
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV),
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: 2,
      }),
      new WebpackHtml({
        filename: 'index.html',
        chunks: ['index', 'common'],
        template: './index.pug',
      }),
      new ExtractText({
        filename: 'style.css',
        allChunks: true,
      }),
      new SpriteLoader(),
    ],
  },
  svg(),
  babel(),
  pug(),
  css(),
  scss(ExtractText),
  url('./img'),
]);

const dev = webpackMerge([
  { devtool: 'inline-source-map' },
  eslint(),
]);

module.exports = () => {
  if (NODE_ENV === 'prod') {
    common.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.optimize.UglifyJsPlugin());
    return common;
  }

  common.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new StyleLint({
      failOnError: false,
      quiet: false,
      syntax: 'scss',
    }));
  return webpackMerge([common, dev, devServer(PATHS.build)]);
};
