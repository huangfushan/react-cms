### 兼容
* IE9+, 
* 最好 Firefox, Chrome, Safari, Opera 这些浏览器的 last 2 versions,
* 不建议使用IE，可能会有一些微妙的bug，如样式兼容等。如果要使用IE，需要先关闭“在兼容性视图中显示Intranet站点”。

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
1、***项目可以通过npm i 或者yarn 进行安装依赖，如果编译不过去，可以使用淘宝镜像cnpm***
```bash
    npm i
```
2、 ***项目克隆下来，需要手动更改几个地方***

* 接口映射在 `package.json中proxy`配置
* src/common/config.js: 修改为当前项目的项目名，项目编号等
  * `debug`：在本地运行时，默认会启动本地调试，可以切换 `DEBUG` 字段来切换访问映射。具体的相关映射在`package.json中proxy`配置
  
* .gitlab-ci.yml：修改项目配置，如项目名，编号的等，与`src/common/config.js`一致

3、***本地运行***
```bash
    npm start
```

4、 ***服务器监听8080端口（在/scripts/start.js中 38 行可以修改DEFAULT_PORT），访问 http://localhost:8080***

### 目录结构介绍
```
***├── build                               // npm run build 生成文件夹***  
***├── config                              // webpack配置文件***  
***├── node_modules                        // 各种依赖包***  
***├── public                              // 存放favicon, index.html***  
***├── scripts                             // npm编译对应命令js文件***  
***├── src                                 // 源码目录***  
***│   ├── api                             // 服务器端接口数据映射API***  
***│   ├── common                          // 公共文件，constants项目全局配置等***  
***│   ├── components                      // 页面组件***  
***│   ├── containers                      // 页面（容器）***  
***│   ├── images                          // 图片资源***  
***│   ├── libs                            // 外部静态资源***  
***│   ├── redux                           // redux***  
***│   ├── themes                          // 存放项目的一些资源和LESS样式文件***  
***│   ├── utils                           // 封装的一些常用工具***  
***│   ├── menuConfig.js                   // menu导航配置***  
***│   ├── router.js                       // 页面路由***  
***│   ├── routerConfig.js                 // 页面路由配置***  
***│   ├── index.js                        // 程序入口文件***  
***├── .babelrc                            // babel配置文件***  
***├── .editorconfig                       // webstore代码规范配置文件***  
***├── .gitignore                          // git忽略文件***  
***├── .gitlab-ci                          // 部署正/测试服的ci配置文件***  
***├── .package.json                       // 项目依赖***  
```
###手动打包部署,生成build文件夹

1、***如果做了服务器的区分。可以打包的时候用dev/test/prod来区分开发服/测试服/正式服***

* ***部署开发服***
    ```bash
      npm run dev
    ```
* ***部署测试服***
    ```bash
      npm run test
    ```

* ***部署正式服***
    ```bash
      npm run prod
    ```
2、***如果没有服务区区分，直接执行 npm run prod，手动部署即可***

###自动化脚本部署

3、***利用tag构建脚本编译部署，在`package.json中scripts`进行配置，运维写好运行脚本，打包时，提交tag会自动打包编译到制定环境`***
```
   * 开发服：git tag dev-***
   * 测试服：git tag test-***
   * 正式服：git tag v-***
```
