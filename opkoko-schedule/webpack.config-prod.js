var webpack = require('webpack');
var path = require('path');

var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var outputDir  = path.resolve(__dirname, 'dist');


var config = {
  devtool: 'source-map',
  entry: './index',
  output: {
    path: outputDir,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: [nodeModulesPath]
    }]
  }
};

module.exports = config;
