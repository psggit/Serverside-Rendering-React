const path = require("path")
const webpack = require("webpack")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const nodeExternals = require("webpack-node-externals")

const config = {
  mode: "production",
  target: "node",
  externals: [nodeExternals()],
  entry: {
    "home": path.resolve(__dirname, "./src/home")
  },
  output: {
    path: path.resolve(__dirname, "./dist-ssr"),
    filename: "[name].js",
    libraryTarget: "commonjs2"
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, "./src/home")
    }
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.(scss|css)$/, loader: "ignore-loader" }
    ]
  },
  // plugins: [
  //   new webpack.DefinePlugin({
  //     "process.env.BROWSER": JSON.stringify(true)
  //   }),
  //   new CleanWebpackPlugin(),
  // ]
}

module.exports = config

