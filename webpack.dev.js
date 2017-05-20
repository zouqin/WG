var path = require("path");           //node path 模块
var webpack = require('webpack');     //webpack   核心模块

var cssExtractText  = require('extract-text-webpack-plugin'); // 提取css文件插件

var scssExtractText = require('extract-text-webpack-plugin'); // 提取scss文件插件

// 前端渲染生成 html 插件
var HtmlWebpackPlugin = require('html-webpack-plugin');

// loader 加载数组
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

module.exports = {
  context: path.resolve( __dirname, 'src' ),

  entry: {  
    vendor: ['moment'],
    main:[
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
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js',
    publicPath: '/',
  },

  module: {
    rules: rules,
  },

  devtool: 'inline-source-map',

  devServer: {
    // 设置端口
    port: 9000,
    
    hot: true,
    // 开启服务器的模块热替换(HMR)

    contentBase: path.resolve(__dirname, 'dist'),
    // 输出文件的路径

    publicPath: '/',
    // 和上文 output 的“publicPath”值保持一致
    
    inline:true,

    watchContentBase: true,

    watchOptions:{
      poll:true,
      ignored: /node_modules/,
    }
  },

  /**
   * 配置解析规则
   */
  resolve: {
      extensions: ['.js', '.json', '.jsx','.css','.scss']
  },
  
  /**插件**/
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 开启全局的模块热替换(HMR)

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