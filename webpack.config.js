var path = require("path");           //node path 模块
var webpack = require('webpack');     //webpack   核心模块

var plug = [];                        //插件数组
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // 提取文件插件

// 压缩js插件
var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({       
        output: {
          comments: false,  // 清楚注释信息
        },
        compress: {
          warnings: false,
        }
      });
plug.push( UglifyJsPlugin );



module.exports = {
  /**
   * entry:入口文件
   * @type {Array | String | Object}
   */
  entry: ['./app/entry.js'],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: '[name].js'
  },
  module: {
    loaders: [
    	  /** 将css文件加载到<style>标签中 **/
        {test: /\.css$/, loader: 'style'},	
      
        /**支持JS中以  requier() 的形式加载 .css文件**/
        {test: /\.css$/, loader: 'css'},		
      
        /**支持JS,CSS中引入图片  limit:属性小于10000字节时采用图片64位编码 **/
        {test: /\.(png|jpg)$/,loader:'url?limit=1000'},
        
        /**解析 react和 es6 **/
        {test: /\.js?$/, loader: 'babel', query: { presets: ['es2015', 'react'] } },
        
        /**这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'**/
        {test: /\.scss$/, loader:'style!css!sass' }
    ]
  },

  /**
   * 配置解析规则
   */
  resolve: {
      extensions: ['', '.js', '.jsx']
  },
  
  /**插件**/
  plugins: plug,
}