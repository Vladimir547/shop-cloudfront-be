const slsw = require('serverless-webpack');
const webpack = require('webpack');

module.exports = {
  target: 'node',
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  plugins: [new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })],
  node: false,
  optimization: {
    minimize: false,
  },
  devtool: 'inline-cheap-module-source-map',
};