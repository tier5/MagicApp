const path = require('path');

module.exports = {
  entry: './src/index.js',
  devServer: {
     contentBase: './dist',
     historyApiFallback: true,
     noInfo: true,
     overlay: true
  },
  watch: true,
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devtool: '#eval-source-map',
  performance: {
    hints: false
  },
  output: {
    filename: 'mz-v2.js',
    path: path.resolve(__dirname, 'dist')
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
