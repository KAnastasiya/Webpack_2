const path = require('path');
const webpackMerge = require('webpack-merge');

const LOADERS = {
  babel: require('./webpack/loaders/babel'),
  pug: require('./webpack/loaders/pug'),
  css: require('./webpack/loaders/css'),
  scss: require('./webpack/loaders/scss'),
  img: require('./webpack/loaders/img'),
  svg: require('./webpack/loaders/svg'),
  eslint: require('./webpack/loaders/eslint'),
};

const PLUGINS = {
  html: require('./webpack/plugins/Html'),
  provide: require('./webpack/plugins/Provide'),
  define: require('./webpack/plugins/Define'),
  extractText: require('./webpack/plugins/ExtractText'),
  commonChunk: require('./webpack/plugins/CommonsChunk'),
  noEmitOnErrors: require('./webpack/plugins/NoEmitOnErrors'),
  spriteLoader: require('./webpack/plugins/SpriteLoader'),
  uglifyJS: require('./webpack/plugins/UglifyJs'),
  styleLint: require('./webpack/plugins/Stylelint'),
  hotModuleReplacement: require('./webpack/plugins/HotModuleReplacement'),
  moduleConcatenation: require('./webpack/plugins/ModuleConcatenation'),
  copyWebpack: require('./webpack/plugins/CopyWebpack'),
  cleanWebpack: require('./webpack/plugins/CleanWebpack'),
};

const devServer = require('./webpack/devserver');
const ExtractText = require('extract-text-webpack-plugin');

const PATHS = {
  source: path.resolve(__dirname, 'src'),
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
  },

  PLUGINS.html(),
  PLUGINS.provide(),
  PLUGINS.define(NODE_ENV),
  PLUGINS.extractText(ExtractText),
  PLUGINS.commonChunk(),
  PLUGINS.noEmitOnErrors(),
  PLUGINS.spriteLoader(),
  PLUGINS.moduleConcatenation(),
  PLUGINS.copyWebpack(),
  PLUGINS.cleanWebpack(__dirname),

  LOADERS.babel(),
  LOADERS.pug(),
  LOADERS.css(),
  LOADERS.scss(ExtractText),
  LOADERS.svg(),
  LOADERS.img('./img'),
]);

module.exports = () => {
  if (NODE_ENV === 'prod') {
    return webpackMerge([common, PLUGINS.uglifyJS()]);
  }

  return webpackMerge([
    common,
    { devtool: 'inline-source-map' },
    devServer(PATHS.build),
    LOADERS.eslint(),
    PLUGINS.styleLint(),
    PLUGINS.hotModuleReplacement(),
  ]);
};
