// vue.config.js,一个可选的配置文件
let pagesConfig = require('./page.config.js')


module.exports = {
    publicPath: '/',//部署应用包时的基本 URL
    outputDir: undefined,//当运行 vue-cli-service build 时生成的生产环境构建文件的目录,Default: 'dist'
    assetsDir: undefined,//放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    runtimeCompiler: undefined,//是否使用包含运行时编译器的 Vue 构建版本。Default: false
    productionSourceMap: undefined,//如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    parallel: undefined,
    pages: pagesConfig, //入口文件
    css: {
        loaderOptions: {
            // postcss: {
            //     plugins: []
            // }
        }
    },
    //代理
    devServer: {
        // open: process.platform === 'darwin',
        // host: 'localhost',
        // port: 8071,
        // open: true, //配置自动启动浏览器
        proxy: {
          '/env':{
            target:'https://temple.dev.renrenfo.cn',
            changeOrigin: true,//是否跨域
            secure: true, // 接受 运行在 https 上的服务
            pathRewrite: {
              '^/env': ''    //需要rewrite重写
            }
          },
          '/api':{
              target:'https://dev.renrenfo.cn/api',
              changeOrigin: true,//是否跨域
              secure: true, // 接受 运行在 https 上的服务
              pathRewrite: {
                '^/api': ''    //需要rewrite重写
              }
          },
          '/ts/v2':{
            target:'https://temple.dev.renrenfo.cn/ts/v2',
            changeOrigin: true,//是否跨域
            secure: true, // 接受 运行在 https 上的服务
            pathRewrite: {
              '^/ts/v2': ''    //需要rewrite重写
            }
          }
        }
    },
}
