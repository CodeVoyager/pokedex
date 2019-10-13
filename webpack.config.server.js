const merge = require('webpack-merge');
const base = require('./webpack.config.base');
const path = require('path');

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
  }),
  entry: {
    index: './src/server/index',
  },
};
