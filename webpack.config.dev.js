const merge = require('webpack-merge');
const base = require('./webpack.config');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(base, {
  mode: 'development',
  output: {
    publicPath: `http://localhost:${process.env.DEV_PORT}/`,
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: process.env.DEV_PORT,
    hot: true,
    publicPath: `http://localhost:${process.env.DEV_PORT}/`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
