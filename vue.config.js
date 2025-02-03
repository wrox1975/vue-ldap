const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  pluginOptions: {
    vuetify: {
      // Add any Vuetify options here
    }
  }
};

