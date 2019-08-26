const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin")
const minfyConfigHTML = {
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: false,
  minifyURLs: true,
  removeComments: false
}

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: ['react', 'react-dom']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: "Home",
      filename: "home.html",
      template: path.resolve(__dirname, "./html/home.html"),
      minify: minfyConfigHTML
    }),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './index.html'
    }),
    new CompressionPlugin({
      test: /\.js$|\.css$|\.html$/,
      filename: "[path].gz[query]",
      exclude: /node_modules/,
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/"
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      // cacheGroups: {
      //   vendors: {
      //     //test: /[\\/]node_modules[\\/]/,
      //     //priority: -10
      //   },
      //   default: {
      //     minChunks: 2,
      //     priority: -20,
      //     reuseExistingChunk: true
      //   }
      // }
    },
    runtimeChunk: true
  }
};