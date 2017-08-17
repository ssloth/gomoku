const webpack = require('webpack');
const path = require('path');
const htmlWebapckPlugin = require('html-webpack-plugin');
const config = require('./config');
module.exports = {
  entry: {
    src: './app/js/index.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name]-[chunkhash].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath :
      config.dev.assetsPublicPath
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
    rules: [{
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: ['app'],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: ['app']
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        include: ['app']
      }, {
        test: /\.png$/,
        loader: 'image-loader',
        include: ['app/images']
      }
    ]
  },
  plugins: [
    new htmlWebapckPlugin({
      filename: 'index.html',
      template: 'app/index.html',
      inject: 'body'
    })
  ]
};
