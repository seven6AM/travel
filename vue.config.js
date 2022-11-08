const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '': {
        target: 'https://open.qyer.com/',
        changeOrigin: true,
      }
    }
  }
})
