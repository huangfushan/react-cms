## web端通用框架
React后台项目：react + react-router4 + apisauce + less + redux + prop-types + babel + webpack + antd

### 技术栈
1. react 16.4.0
2. react-router-dom 4.2.2 (react-router 4)
3. redux （react-redux, redux-thunk中间件, redux-logger日志， 用redux-action封装了action事件）
4. apisauce
5. less
6. es6 + babel ( 配了babel-plugin-transform-decorator-legacy 装饰器)
7. webpack 3.8.1
7. antd 3.15.1
8. react-dnd 7.0.2

### 环境
* 搭建时间 2018年11月23日
* 项目使用了create-react-app搭建项目，版本1.1.5
* 搭建时使用mac os系统

### 项目编译
1. ***项目可以通过npm i 或者yarn 进行安装依赖，如果编译不过去，可以使用淘宝镜像cnpm ***
```bash
    yarn
```

2. ***运行***
```bash
    npm start
```

3. ***服务器监听8080端口（在/scripts/start.js中38行可以修改DEFAULT_PORT），访问 http://localhost:8080 ***

### 目录结构介绍
```js
### 目录结构介绍
***├── build                               // npm run build 生成文件夹 ***
***├── config                              // webpack配置文件 ***
***├── node_modules                        // 各种依赖包 ***
***├── public                              // 存放favicon, index.html ***
***├── scripts                             // npm编译对应命令js文件 ***
***├── src                                 // 源码目录 ***
***│   ├── api                             // 服务器端接口数据映射API ***
***│   ├── common                          // 公共文件，constants项目全局配置等 ***
***│   ├── components                      // 页面组件***
***│   ├── containers                      // 页面（容器） ***
***│   ├── images                          // 图片资源***
***│   ├── libs                            // 外部静态资源 ***
***│   ├── redux                           // redux ***
***│   ├── themes                          // 存放项目的一些资源和LESS样式文件 ***
***│   ├── utils                           // 封装的一些常用工具 ***
***│   ├── router.js                       // 页面路由 ***
***│   ├── index.js                        // 程序入口文件 ***
***├── .babelrc                            // babel配置文件 ***
***├── .editorconfig                       // webstore代码规范配置文件 ***
***├── .gitignore                          // git忽略文件 ***
***├── .gitlab-ci                          // 部署正/测试服的ci配置文件 ***
***├── .package.json                       // 项目依赖 ***
```

###打包部署,生成build文件夹

1. ***因为测试服与正式服到路径请求路径不一致，而者都是在生成环境下。所以打包的时候用prod/dev来区分开发服/测试服/正式服 ***

2. ***部署开发服***
```bash
    npm run dev
```
3. ***部署测试服***
```bash
    npm run test
```

4. ***部署正式服***
```bash
    npm run prod
```
