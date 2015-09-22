var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:8080');
    sources.push('webpack/hot/only-dev-server');
  }
  return sources;
}

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'jsx', 'babel'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?name=/assets/images/[name].[ext]?[hash]',
          'image-webpack?bypassOnDebug&optimizationLevel=7'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({title: 'Reactive Wikipedia Reader'}),
    new ExtractTextPlugin('assets/style.css', {allChunks: true})
  ],
  entry: {
    bundle: getEntrySources([
      './app/index'
    ])
  },
  output: {
    path: 'public',
    filename: 'assets/[name].js'
  }
}