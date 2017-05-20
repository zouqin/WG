/**
 * NodeJS path模块
 * 以下代码中使用了 path.resolve() 方法用户获取绝对路径
 * @type {Object}
 */
var path = require("path");


/**
 * Webpack 核心模块
 * @type {Object}
 */
var webpack = require('webpack');



/**
 * ExtractText 文件提取插件
 * 此处单独创建一个css 提取插件
 * @type {Object}
 */
var cssExtractText  = require('extract-text-webpack-plugin');



/**
 * ExtractText 文件提取插件
 * 此处单独创建一个scss 提取插件
 * @type {Object}
 */
var scssExtractText = require('extract-text-webpack-plugin');


/**
 * html-webpack-plugin hash化文件添加到模板html 中
 * 前端渲染时可以使用这种方式简化操作
 * @type {Object}
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');



/**
 * 定义 webpack module数组
 * 原文中定义代码不好看，放在这可以加点注释
 * @type {Array}
 */
var rules = [];

// css-loader 解析加载配置
var cssLoader = {
    test:/\.css$/,
    use:[
      {loader:'style-loader'},
      {loader:'css-loader',options:{modules: true}},
      {loader:'postcss-loader'}
    ],
}
rules.push( cssLoader );

// scss-loader 解析加载配置
var scssLoader = {
    test:/\.scss$/,
    use:[
      {loader:'style-loader'},
      {loader:'css-loader',options:{modules: true}},
      {loader:'postcss-loader'},
      {loader: 'sass-loader',},
    ],
}
rules.push( scssLoader );

// js (es6+jsx) 解析加载配置
var jsLoader = {
    test: /\.js$/,
    loader  : 'babel-loader',
    options : { presets: [ 'es2015', 'react' ] },
    exclude : [/node_modules/],
}
rules.push( jsLoader );



/**
 * webpack 配置对象
 * @type {Object}
 */
module.exports = {
  context: path.resolve( __dirname, 'src' ),
  // 基础目录，绝对路径，用于从配置中解析入口起点 和 loader
  
  
  entry: {
  // 配置应用程序的起点入口，
  // 单页应用 SPA : 一个入口起点
  // 多页应用 MPA : 多个入口起点

    vendor: ['moment'],
    // Librarues 第三方库打包入口点

    main:[
    // 应用程序入口打包点

        'react-hot-loader/patch',
        // 开启 React 代码的模块热替换(HMR)

        'webpack-dev-server/client?http://localhost:9000',
        // 为 webpack-dev-server 的环境打包代码
        // 然后连接到指定服务器域名与端口

        'webpack/hot/only-dev-server',
        // 为热替换(HMR)打包好代码
        // only- 意味着只有成功更新运行代码才会执行热替换(HMR)
        './index.js'
    ],
  },

  output: {
  // 输出 
    
    path: path.resolve(__dirname, "dev"),
    // 输出到的目录 （绝对路径）
    
    filename: '[name].js',
    // 编译后输出的文件名
    // 单个入口时，可是设成静态文件名
    // 多个文件时使用 [name] 动态设置文件名
    // 开发环境中不需要配置 [hash] 清楚缓存
    
    publicPath: '/',
    // publicPath 是静态资源头部内容配置
    // 如果指定错误的值会导致404错误
    // 在 webpack-server-dev 下此选项默认配置为 ‘/’
    // 当资源需要引用 cdn 资源时， 可以配置为 cdn 资源路径
  },

  module: {
    rules: rules,
  },

  devtool: 'inline-source-map',
  // 控制是否以及如何生成 source map
  // 有关 source map 如何使用请访问 "http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html"

  devServer: {
  // webpack-dev-server 配置
  // 用于开发环境下，能提供一个简易的服务用户调试代码
  
    port: 9000,
    // 设置服务器端口号
    
    hot: true,
    // 开启服务器的模块热替换(HMR)

    contentBase: path.resolve(__dirname, 'dev'),
    // 告诉服务器从哪里提供内容

    publicPath: '/',
    // 和上文 output 的“publicPath”值保持一致
    
    inline:true,
    // true  是内联模式
    // false 是iframe 模式
    
    watchContentBase: true,
    // devServer.contentBase 文件改动将触发整个页面重新加载

    // watchOptions:{
    //   poll:true,
    //   ignored: /node_modules/,
    // }
  },

  resolve: {
  // 设置模块如何被解析

      extensions: ['.js', '.json', '.jsx','.css','.scss']
      // 自动解析确定的扩展，能够使用户在引入模块时不带扩展名
  },
  
  plugins: [
  // 插件

    new webpack.HotModuleReplacementPlugin(),
    // 开启全局的模块热替换(HMR) 注意：命令行中以配置 -hot命令时，配置此插件会报错

    new webpack.NamedModulesPlugin(),
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息 
    
    // css文提取插件
    new cssExtractText('./css/stylescss.css'),
    
    // scss文件提取插件
    new scssExtractText('./scss/style.css'),

    // 创建公共模块
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor' // 指定公共 bundle 的名字。
    }), 
    new HtmlWebpackPlugin({
        title: 'My App',
        template:'index.html',
    }),
  ],
}