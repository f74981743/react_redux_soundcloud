const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    bundle: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
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
    })
  ]
};
