const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./common.config.js");
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [],
  module: {}
});
