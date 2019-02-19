const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const project = require("../project.json");
const destination = path.resolve(__dirname, "../static");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: destination
  },
  plugins: [
    new CleanWebpackPlugin(["static"]),
    new HtmlWebpackPlugin(
      Object.assign(
        {
          hash: true,
          template: path.resolve(__dirname, "../src/index.html"),
          filename: destination + "/index.html"
        },
        project.meta
      )
    )
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(html)$/,
        exclude: /src\/index\.html/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        use: [
          "raw-loader",
          {
            loader: "glslify-loader",
            options: {
              transform: [
                ["glslify-hex"],
                ["glslify-import"],
                ["glslify-fancy-imports"]
              ]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      sections: path.resolve(__dirname, "../src/sections/"),
      components: path.resolve(__dirname, "../src/components/"),
      lib: path.resolve(__dirname, "../src/lib/")
    }
  }
};
