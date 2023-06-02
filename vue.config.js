const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,

    devServer: {
        port: 8080,
        proxy:{
            '/gd': {
                target:'https://restapi.amap.com/v5/',
                changeOrigin: true,
                pathRewrite: {
                    '^/gd': ''
                }
            },
            '/': {
                ws: false,
                // target: 'http://192.168.1.133:9000/',
                // target: 'http://192.168.205.47:9000/',
                target:'http://localhost:9000/',
                changeOrigin: true,
                pathRewrite: {
                    '^/': ''
                }
            }
        }
    }
})