const merge = require('webpack-merge');
const base = require('./webpack.config.base');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  ...merge(base, {
    mode: 'production',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist', 'server'),
    },
    target: 'node',
    node: {
      process: true,
      __dirname: false,
    },
    // plugins: [
    //   new webpack.IgnorePlugin({
    //     resourceRegExp: /\.css$/,
    //   }),
    // ],
  }),
  entry: {
    index: './src/server/index',
  },
  plugins: [
    new Dotenv({
      path: './.env',
    }),
    new MiniCssExtractPlugin({
      disable: true,
    }),
    // devMode ? new webpack.HotModuleReplacementPlugin() : undefined,
  ],
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
          { loader: MiniCssExtractPlugin.loader },
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
};
