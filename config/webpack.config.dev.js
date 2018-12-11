'use strict';
// https://gitbook.cn/books/599270d5625e0436309466c7/index.html
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');
const utils = require('./utils');
const config = require('../src/common/config');

const publicPath = '/';
const publicUrl = '';
const env = getClientEnvironment(publicUrl);

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('./polyfills'), //用以在浏览器中支持promise/fetch/object-assign。
    require.resolve('react-dev-utils/webpackHotDevClient'), //载入热更新，可以被看做具有更好体验的WebpackDevServer。
    // require.resolve('react-error-overlay'), //在开发环境中使用，强制显示错误页面。
    paths.appIndexJs,  //入口文件
  ],
  output: {
    // path: '/build/', //打包后文件存放的位置为/build/。
    pathinfo: true, //为true，在打包文件后，在其中所包含引用模块的信息，这在开发环境中有利于调试。
    filename: 'static/js/bundle.js', //指定了打包的名字和基本的引用路径static/js/bundle.js。
    chunkFilename: 'static/js/[name].chunk.js', //指定了非入口文件的名称static/js/[name].chunk.js。
    publicPath: publicPath, //指定服务器读取时的路径
    devtoolModuleFilenameTemplate: info =>  //这里是一个函数，指定了map位于磁盘的位置。
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(  //指定了模块的搜索的位置，这里设置为node_modules。
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'], //指明在引用模块时哪些后缀名可以忽略，
    alias: {
      // 配置 @ 相当于 src 目录
      '@': utils.resolve('src'),
      'react-native': 'react-native-web',
    },
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]), //此处使用了ModuleScopePlugin的实例，用以限制自己编写的模块只能从src目录中引入。
    ],
  },
  module: {
    strictExportPresence: true,  //这里设置为true,表明文件中如果缺少exports时会直接报错而不是警告。
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),

            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
            },
          },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/, /\.(css|less)$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(css|less)$/,
            loaders: [
              'style-loader',
              'css-loader',
              'less-loader'
            ]
          },
        ],
      },
    ],
  },
  plugins: [
    new InterpolateHtmlPlugin(env.raw), //和HtmlWebpackPlugin串行使用，允许在index.html中添加变量。
    new HtmlWebpackPlugin({ //自动生成带有入口文件引用的index.html。
      inject: true,
      template: paths.appHtml,
      title: config.PROJECT_NAME,
    }),
    new webpack.NamedModulesPlugin(), //当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.DefinePlugin(env.stringified), //这里我们设置了process.env.NODE_ENV的值为development。
    new webpack.HotModuleReplacementPlugin(), //:启用模块热替换。
    new CaseSensitivePathsPlugin(), //:如果路径有误则直接报错。
    new WatchMissingNodeModulesPlugin(paths.appNodeModules), //:此插件允许你安装库后自动重新构建打包文件。
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), //忽略所匹配的moment.js。
  ],
  node: { //设置node的dgram/fs/let/tls模块的的值，如果在其它环境中使用时值为empty。
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: {
    hints: false, //不提示测试环境的打包结果。
  },

};
