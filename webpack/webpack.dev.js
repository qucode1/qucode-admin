const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const srcDir = resolve(__dirname, '../src')
const env = process.env.NODE_ENV

module.exports = {
  // context: resolve(__dirname, '../src'),
  entry: `${srcDir}/index.js`,
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'standard-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]-[local]-[hash:base64:8]',
              camelCase: true
            }
          }
        ]
      }
    ]
  },
  performance: {
    hints: 'warning'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${srcDir}/index.html`
    }),
    new DashboardPlugin()
  ]
}
