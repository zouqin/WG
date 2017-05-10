var path = require("path");           //node path 模块
var webpack = require('webpack');     //webpack   核心模块

var plug = [];                        //插件数组
var ExtractTextPlugin  = require('extract-text-webpack-plugin'); // 提取文件插件


var extractSCSS = new ExtractTextPlugin('stylescss.css');
plug.push( extractSCSS );

/**
 * 压缩js
 * @type {Object}
 */
var uglify_option = {
  //清楚注释信息
  output: { comments: false , },
  compress : { warnings : false }
}
var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin( uglify_option );
plug.push( UglifyJsPlugin );

module.exports = {
  /**
   * entry:入口文件
   * @type {Array | String | Object}
   */
  entry: ['./app/entry.js'],
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: '[name].js'
  },
  module: {
    rules: [
        { 
          test:/\.css$/,
          use:[
            {
              loader: 'style-loader',
            },

            {
              loader: 'css-loader',
              options : {
                modules: true
              }
            },

            {
              loader: 'postcss-loader',
            },
          ]
        },	

        {
          test:/\.scss$/,
          use:[
            {
              loader: 'style-loader',
            },

            {
              loader: 'css-loader',
              options : {
                modules: true
              },
            },

            {
              loader: 'sass-loader',
            },

            {
              loader: 'postcss-loader',
            },
          ]
        },
        
        /**解析 react和 es6 **/
        {
          test: /\.js$/,
          loader  : 'babel-loader',
          options : { presets: [ 'es2015', 'react' ] },
          exclude : [/node_modules/],
        },
        
    ]
  },

  /**
   * 配置解析规则
   */
  resolve: {
      extensions: ['.js', '.json', '.jsx','.css']
  },
  
  /**插件**/
  plugins: plug,
}