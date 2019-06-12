'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const utils = require('./utils');
const publicPath = paths.servedPath;
const shouldUseRelativeAssetPaths = publicPath === './';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);
const config = require('../src/common/config');

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

const cssFilename = 'static/css/[name].[contenthash:8].css';

const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
  { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};

module.exports = {
  bail: true,
  // devtool: shouldUseSourceMap ? 'source-map' : false,
  devtool: false,
  entry: {
    main: [
      require.resolve('./polyfills'),
      paths.appIndexJs
    ],
    'vendor1': ['react', 'react-dom', 'react-router-dom', 'apisauce', 'md5', 'react-redux', 'redux', 'redux-thunk', 'redux-actions'], //提取react模块作为公共的js文件
    'vendor2': ['quill', 'react-cropper'],
    'vendor3': ['ali-oss'],
  },
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path
        .relative(paths.appSrc, info.absoluteResourcePath)
        .replace(/\\/g, '/'),
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      '@': utils.resolve('src'),
      'react-native': 'react-native-web',
      actions: path.resolve(__dirname, '..') + '/src/actions',
      api: path.resolve(__dirname, '..') + '/src/api',
      components: path.resolve(__dirname, '..') + '/src/components',
      constants: path.resolve(__dirname, '..') + '/src/constants',
      containers: path.resolve(__dirname, '..') + '/src/containers',
      images: path.resolve(__dirname, '..') + '/src/images',
      reducers: path.resolve(__dirname, '..') + '/src/reducers',
      themes: path.resolve(__dirname, '..') + '/src/themes',
      utils: path.resolve(__dirname, '..') + '/src/utils',
    },
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  module: {
    strictExportPresence: true,
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
              compact: true,
            },
          },
          {
            test: /(\.css)$/,
            use: ExtractTextPlugin.extract(
              Object.assign(
                {
                  fallback: [{
                    loader: 'style-loader',
                  }],
                  use: [
                    {
                      loader: 'css-loader',
                      options: {
                        minimize: true,
                      },
                    },
                  ],
                },
                extractTextPluginOptions
              )
            ),
          },
          {
            test: /(\.less)$/,
            use: ExtractTextPlugin.extract(
              Object.assign({
                fallback: [{
                  loader: 'style-loader',
                }],
                use: [
                  'css-loader',
                  'less-loader',
                ],
              }, extractTextPluginOptions)
            ),
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.js$/, /\.html$/, /\.json$/, /\.(css|less)$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      title: config.PROJECT_NAME,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.DefinePlugin(env.stringified),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      compress: {
        warnings: false,
        comparisons: false,
        drop_console: true,        // 删除所有的 `console` 语句， 还可以兼容ie浏览器
        collapse_vars: true,// 内嵌定义了但是只用到一次的变量
        reduce_vars: true,// 提取出出现多次但是没有定义成变量去引用的静态值
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
      sourceMap: shouldUseSourceMap,
    }),
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          return;
        }
        console.log(message);
      },
      minify: true,
      navigateFallback: publicUrl + '/index.html',
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new BundleAnalyzerPlugin(),
    // 提供公共代码
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor3', 'vendor2', 'vendor1'],
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   async: "common-in-lazy",
    //   children: true,
    //   minChunks: ({ resource } = {}) => (
    //     resource &&
    //     resource.includes('node_modules') &&
    //     /apisauce/.test(resource)
    //   )
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'used-twice',
      minChunks: (module, count) => (
        count >= 2
      ),
    }),
  ],

  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
