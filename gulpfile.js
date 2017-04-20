var gulp = require('gulp');
/**
 * css3前缀自动补全
 */
var autoprefixer = require('gulp-autoprefixer');
gulp.task('css3', function(){
	return gulp.src('css/*.css')
                .pipe(autoprefixer())
                .pipe(gulp.dest('dist/css'))
});

/**
 * css压缩
 */
var cssmin = require('gulp-minify-css');
gulp.task('cssmin',['css3'], function () {
    gulp.src('dist/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/mincss'));
});

/**
 * js压缩
 */
 gulp.task('js-min',function(){
   gulp.src('js/*.js')
       .pipe(uglify())       
//     .pipe(rename({suffix:'.min'}))
       .pipe(gulp.dest('dist/js'));
 });

/**
 * html压缩
 */
var htmlmin = require('gulp-htmlmin');
gulp.task('htmlmin', function () {
	var options = {
		collapseWhitespace:true,			       //清除空格
		collapseBooleanAttributes:true,		   //省略布尔属性的值
		removeComments:true,				         //清除html中注释的部分
		removeEmptyAttributes:true,			     //清除所有的空属性
		removeScriptTypeAttributes:true,	   //清除所有script标签中的type="text/javascript"属性
		removeStyleLinkTypeAttributes:true,	 //清楚所有Link标签上的type属性。
		minifyJS:true,						           //压缩html中的javascript代码。
		minifyCSS:true						           //压缩html中的css代码。
	};
    gulp.src('html/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/minhtml'));
});

/**
 * gulp整合webpack插件
 */
var webpack = require( 'gulp-webpack');
var webpack_config = require( './webpack.config');
gulp.task( 'webpack', ['cssmin'], function(){
    return gulp.src ( 'app/entry.js' )
        .pipe( webpack( webpack_config ) )
        .pipe( gulp.dest( 'dist/js') );
});


gulp.task ( 'watch', function(){
    gulp.watch ( './**.*', ['cssmin'] );
});



