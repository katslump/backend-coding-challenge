var webpack = require('webpack');

module.exports = {
  entry: './app.js',
  output: {
    path: __dirname + '/build',
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      }
    ]
  },
  node: {
        fs: 'empty',
        net: 'empty'
    },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
