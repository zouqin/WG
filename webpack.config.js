var path = require("path");           //node path 模块
var webpack = require('webpack');     //webpack   核心模块

var plug = [];                        //插件数组
var ExtractTextPlugin  = require('extract-text-webpack-plugin'); // 提取文件插件


var extractSCSS = new ExtractTextPlugin('stylescss.css');
plug.push( extractSCSS );

module.exports = {
  context: path.resolve( __dirname, 'src' ),

  entry: [
     'react-hot-loader/patch',
    // 开启 React 代码的模块热替换(HMR)

    'webpack-dev-server/client?http://localhost:9000',
    // 为 webpack-dev-server 的环境打包代码
    // 然后连接到指定服务器域名与端口

    'webpack/hot/only-dev-server',
    // 为热替换(HMR)打包好代码
    // only- 意味着只有成功更新运行代码才会执行热替换(HMR)
    
    './index.js',
  ],

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js',
    publicPath: '/',
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
      extensions: ['.js', '.json', '.jsx','.css']
  },
  
  /**插件**/
  plugins: [

    new webpack.optimize.UglifyJsPlugin( {
      //清楚注释信息
      output: { comments: false , },
      compress : { warnings : false }
    } ),

    new webpack.HotModuleReplacementPlugin(),
    // 开启全局的模块热替换(HMR)

    new webpack.NamedModulesPlugin(),
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息 
  ],
}