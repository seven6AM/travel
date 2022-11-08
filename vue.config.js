const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy: {
      "/qyer": {
        target:"https://open.qyer.com/",
        changeOrigin: true,
      },
       "/app": {
        target:"https://open.qyer.com/",
        changeOrigin: true,
      }
    },

  },
})
