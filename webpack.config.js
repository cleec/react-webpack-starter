var webpack = require('webpack');
var bower_dir = __dirname + '/bower_components';
var path = require('path');

var config = {

  addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(new RegExp('^' + name + '$'));
  },

  entry: {
    app: ['webpack/hot/dev-server', './src/main.js'],
    vendors: ['react']
  },

  resolve: { alias: {} },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ],

  output: {
    path: './build',
    filename: 'bundle.js'
  },

  module : {
    noParse: [],
    loaders:  [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
        path.resolve(__dirname, "src")
        ],
        query: {
          presets: ['es2015','react']
        }
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
       }
    ]
  }
};

config.addVendor('react', bower_dir + '/react/react.min.js');

module.exports = config;
