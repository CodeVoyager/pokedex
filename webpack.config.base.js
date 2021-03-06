require('dotenv').config();
const Dotenv = require('dotenv-webpack');
const isDev = (process.env.NODE_ENV || '').trim() !== 'production';
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const webpack = require("webpack");

module.exports = {
  entry: {
    app: './src/client/index',
  },
  output: {
    filename: isDev ? '[name].js' : '[name].[hash].js',
    chunkFilename: isDev ? '[name].js' : '[name].[hash].js',
    path: path.resolve(__dirname, 'dist', 'client'),
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new AssetsPlugin({ filename: 'webpack-assets.json', update: true }),
    new Dotenv({
      path: './.env',
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[hash].css',
      disable: false,
    }),
    // devMode ? new webpack.HotModuleReplacementPlugin() : undefined,
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
