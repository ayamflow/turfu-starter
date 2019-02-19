const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./common.config.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    hot: true,
    contentBase: "static",
    publicPath: "/"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {},
  optimization: {
    usedExports: true
  }
});
