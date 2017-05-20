var path = require("path");           //node path 模块
var webpack = require('webpack');     //webpack   核心模块

var cssExtractText  = require('extract-text-webpack-plugin'); // 提取css文件插件

var scssExtractText = require('extract-text-webpack-plugin'); // 提取scss文件插件

// 服务端渲染时生成 静态文件对应关系 json 文件插件
// var ManifestPlugin = require('webpack-manifest-plugin'); 

// 前端渲染生成 html 插件
var HtmlWebpackPlugin = require('html-webpack-plugin');

// loader 加载数组
var rules = [];

// css-loader 解析加载配置
var cssLoader = {
    test:/\.css$/,
    use: cssExtractText.extract({
        fallback: 'style-loader',
        use:[
          {loader:'css-loader',options:{modules: true}},
          {loader:'postcss-loader'}
        ],
    })
}
rules.push( cssLoader );


// scss-loader 解析加载配置
var scssLoader = {
    test:/\.scss$/,
    use: scssExtractText.extract({
        fallback: 'style-loader',
        use:[
          {loader:'css-loader',options:{modules: true}},
          {loader:'postcss-loader'},
          {loader: 'sass-loader',},
        ],
    })
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
    main:['./index.js'],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].[hash]js',
    publicPath: './',
  },

  module: {
    rules: rules,
  },

  devtool: 'inline-source-map',
  /**
   * 配置解析规则
   */
  resolve: {
      extensions: ['.js', '.json', '.jsx','.css','.scss']
  },
  
  /**插件**/
  plugins: [

    // new webpack.optimize.UglifyJsPlugin( {
    //   //清楚注释信息
    //   output: { comments: false , },
    //   compress : { warnings : false }
    // } ),
    
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