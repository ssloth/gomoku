const webpack = require('webpack');
const path = require('path');
const config = require('./config');
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry:{
    src:'./app/js/index.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  devServer: {
    contentBase: "./app",
    historyApiFallback: true,
    inline: true
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
    ]
  }
};
