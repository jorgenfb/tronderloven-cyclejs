var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
      app: './src/app.js'
  },
  output: {
      publicPath: '',
      path: path.join(__dirname, '/dist'),
      filename: 'app.bundle.js'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
        {
            test: /\.js$/,
            loader: 'babel?presets[]=es2015',
            exclude: /node_modules/
        }
    ]
  }
};
