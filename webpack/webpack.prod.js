const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const srcDir = resolve(__dirname, '../src')
const env = process.env.NODE_ENV

module.exports = {
  context: resolve(__dirname, '../src'), //make default dir
  entry: {
    app: `./index.js`,
    vendor: ['react', 'react-dom', 'react-router-dom'] //split with commonchunks
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:6].js',
    chunkFilename : '[name]-[id].[chunkhash:6].bundle.js',
    publicPath: '/'
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
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     use: [
      //       {
      //         loader: 'css-loader',
      //         options: {
      //           modules: true,
      //           localIdentName: '[name]-[local]-[hash:base64:8]',
      //           camelCase: true
      //         }
      //       }
      //     ]
      //   })
      // }
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
  devtool: 'source-map',
  performance: {
    hints: 'warning'
  },
  'resolve': {
    'alias': {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  plugins: [
    // new CompressionPlugin({
    //     asset: "[path].gz[query]",
    //     algorithm: "gzip",
    //     test: /\.(js|html)$/,
    //     threshold: 10240,
    //     minRatio: 0.8,
    //     deleteOriginalAssets: true
    // }),
    new CleanWebpackPlugin(['dist'], {
      root: resolve(__dirname, '..')
    }),
    new HtmlWebpackPlugin({
      template: `./index.html`
    }),
    new DashboardPlugin(),
    // new ExtractTextPlugin({
    //   filename: 'styles.[name].[chunkhash:6].css',
    //   allChunks: true
    // }),
    new CopyWebpackPlugin([{
      from: resolve(__dirname, '../src/icons/'),
      to: resolve(__dirname, '../dist/')
    }]),
    new OfflinePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      ServiceWorker: {
        events: true
      }
    })
  ]
}
