const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const path = require('path')
module.exports = {
    productionSourceMap: false,
    // 设置webpack配置，vue-cli会将配置merge进去webpack.config.js中去
    publicPath: './',

    configureWebpack: config => {
        if (process.env.VUE_APP_ENV === 'production') {
            return {
                plugins: [
                    new UglifyJsPlugin({
                        uglifyOptions: {
                            compress: {
                                warning: false,
                                drop_debugger: true,
                                drop_console: true
                            }
                        },
                        sourceMap: false,
                        parallel: true
                    })
                ]
            }
        } else {
        // 为开发环境修改端口
            return {
                devServer: {
                    port: 8080
                }
            }
        }
    }
    // pluginOptions: {
    //     'style-resources-loader': {
    //         preProcessor: 'less',
    //         patterns: [path.resolve(__dirname, './src/assets/main.less')]
    //     }
    // }
}
