var path = require("path");
var webpack = require('webpack');

module.exports = {
  entry: ['./app/test'],
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
      {test: /\.(png|jpg)$/,loader:'url?limit=1000'}
    ]
  },
  
  /**插件**/
  plugins:[
		/**
		 * 压缩js插件
		 */
		new webpack.optimize.UglifyJsPlugin({				
	      output: {
	        comments: false,  // remove all comments
	      },
	      compress: {
	        warnings: false
	      },
	      beautify: false, 	//不启用美化功能
	      comments: false,  //不保留注释
	      sourceMap: true,  //生成soucemap文件
	    })
	]
}