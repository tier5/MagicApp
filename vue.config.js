module.exports = {
    chainWebpack: config => {
      config.optimization.delete('splitChunks')
      config.plugins
        .delete('html')
        .delete('preload')
        .delete('prefetch')
    },
    css: {
      extract: false
    },
    configureWebpack: {
      output: {
        filename: 'mz-v2.min.js'
      }
    },
    filenameHashing: false,
    outputDir: require('path').resolve(__dirname, 'dist'),
    pages: {
      index: {
        entry: 'src/main.js'
      }
    },
    productionSourceMap: false
  }
  