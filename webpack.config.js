const path = require('path');

module.exports = {
  entry: './src/index.js',
  devServer: {
     contentBase: './dist'
  },
  watch: true,
  output: {
    filename: 'mz-v2.js',
    path: path.resolve(__dirname, 'dist')
  }
};
