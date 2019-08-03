# Vue Multiple Pages
基于vue-cli3.0 + webpack@4.28.4的多页脚手架
> 编译速度与热跟新速度要优于webpack2.0、3.0，但相应的消耗内存变大，在node中出现内存溢出现象，如页面过多，使用
```
npm run fix-memory-limit
```
再进行
```
npm run dev
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build:dev  //打包开发环境
npm run build:devtest //打包开发测试环境
npm run build:test //打包测试环境
npm run build // 打包正式环境
```
在config里配置不同的打包环境使用不同的api地址等。

> 一个基于vue-cli3脚手架的多页面vue移动端模板

*添加了移动端相关工具如 mint-ui、300s点击延迟、rem、公共头部和底部、less、store、pages/public_app.js，以及微信签名和请求的封装等*


## 目录结构介绍 ##

	|-- dist                             // 打包目录
	|-- src                              // 源码目录
	|   |-- components                   // 全局组件
	|   |-- utils                        // 工具函数。
    |       |-- arrMethods.js            // 数组函数
	|       |-- back.js                  // 返回事件
    |       |-- request.js               // 请求封装
	|       |-- changeUrl.js       	     // 页面跳转
    |       |-- eleMethods.js            // dom方法
	|       |-- time_slot_change.js      // 时间方法
	|   |-- pages                        // 页面视图
	|       |-- home                     // 首页模块文件夹
	|           |-- index                // 首页文件夹
	|               |-- index.vue        // 首页模板文件
	|               |-- index.js         // 首页js文件
	|           |-- home1                // 首页内页文件夹
	|               |-- home1.vue        // 首页内页模板文件
	|               |-- home1.js         // 首页内页js文件
	|       |-- discover                 // 发现模块文件夹
	|           |-- discover             // 发现文件夹
	|               |-- discover.vue     // 发现模板文件
	|               |-- discover.js      // 发现js文件
	|       |-- public_app.js            // 公共的js，可以引公共的css,vue ui库等
	|-- .gitignore                       // 忽略的文件
	|-- page.config.js                   // 使用node读取pages文件夹下的文件夹配置到vue cli3
	|-- vue.config.js                    // vue cli 配置
	|-- README.md                        // 说明
	|-- package.json					 // 资源包



## 说明
* 在css/common.less里重置样式。
* 添加了axios请求库，并做了简单的拦截。
* 添加了fastclick解决移动端300ms点击延迟。
* 已添加mint-ui库，想要添加自己 UI库,在pages/public_app.js引用即可。
* 添加rem适配移动端，设置的设计稿宽度为750，1rem=30px，可在statics/js/public.js自行修改。
* 添加了vue-lazyload图片懒加载，在pages/public_app.js中查看
* 添加页面请在pages文件夹下新建目录，在里面放置js和.vue（建议复制已有的文件夹修改名字进行开发）。
