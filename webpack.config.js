const path = require('path');
const webpackMerge = require('webpack-merge');
const ExtractText = require('extract-text-webpack-plugin');

const babelLoader = require('./webpack/loaders/babel');
const pugLoader = require('./webpack/loaders/pug');
const cssLoader = require('./webpack/loaders/css');
const scssLoader = require('./webpack/loaders/scss');
const imgLoader = require('./webpack/loaders/img');
const svgLoader = require('./webpack/loaders/svg');
const eslintLoader = require('./webpack/loaders/eslint');

const htmlPlugin = require('./webpack/plugins/Html');
const providePlugin = require('./webpack/plugins/Provide');
const definePlugin = require('./webpack/plugins/Define');
const extractTextPlugin = require('./webpack/plugins/ExtractText');
const commonChunkPlugin = require('./webpack/plugins/CommonsChunk');
const noEmitOnErrorsPlugin = require('./webpack/plugins/NoEmitOnErrors');
const spriteLoaderPlugin = require('./webpack/plugins/SpriteLoader');
const uglifyJSPlugin = require('./webpack/plugins/UglifyJs');
const styleLintPlugin = require('./webpack/plugins/Stylelint');
const hotModuleReplacementPlugin = require('./webpack/plugins/HotModuleReplacement');
const moduleConcatenation = require('./webpack/plugins/ModuleConcatenation');

const devServer = require('./webpack/devserver');


const PATHS = {
  source: path.resolve(__dirname, 'test'),
  build: path.resolve(__dirname, 'dist'),
};

const NODE_ENV = process.env.NODE_ENV || 'dev';


const common = webpackMerge([
  {
    context: PATHS.source,
    entry: { index: './index.js' },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
  },

  htmlPlugin(),
  providePlugin(),
  definePlugin(NODE_ENV),
  extractTextPlugin(ExtractText),
  commonChunkPlugin(),
  noEmitOnErrorsPlugin(),
  spriteLoaderPlugin(),
  moduleConcatenation(),

  babelLoader(),
  pugLoader(),
  cssLoader(),
  scssLoader(ExtractText),
  svgLoader(),
  imgLoader('./img'),
]);


module.exports = () => {
  if (NODE_ENV === 'prod') {
    return webpackMerge([
      common,
      uglifyJSPlugin(),
    ]);
  }

  return webpackMerge([
    common,
    { devtool: 'inline-source-map' },
    devServer(PATHS.build),
    eslintLoader(),
    styleLintPlugin(),
    hotModuleReplacementPlugin(),
  ]);
};
