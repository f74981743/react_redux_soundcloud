const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'react', 'react-dom', 'react-redux', 'react-router',
  'react-router-redux', 'redux', 'redux-logger', 'redux-thunk',
  'soundcloud', 'classnames', 'svg-url-loader', 'style-loader', 'lodash', 
  'babel-preset-stage-1'
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].[chunkhash].js',
    publicPath: './public/'
  },
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["react", "es2015", "stage-1"]
          }
        },
        test: /\.js$/,
        exclude: /node_modules/,
      }, {
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
        test: /\.scss$/
      }, {
        use: 'svg-url-loader',
        test: /\.svg/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],

      // filename: "vendor.js"
      // (Give the chunk a different name)

      minChunks: 2,
      // (with more entries, this ensures that no other module
      //  goes into the vendor chunk)
    }),
    new HtmlWebpackPlugin({
      title: 'SoundsGood',
      template: './src/index.html',
      filename: '../index.html'
    })
  ]
};
