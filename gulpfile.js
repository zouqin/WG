var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin');
/**
 * css3前缀自动补全
 */
gulp.task('default', function(){
	gulp.src('css/anon/*.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/anon'))
});

/**
 * css压缩
 */
gulp.task('cssmin', function () {
    gulp.src('css/*.css')
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
gulp.task('htmlmin', function () {
	var options = {
		collapseWhitespace:true,			//清除空格
		collapseBooleanAttributes:true,		//省略布尔属性的值
		removeComments:true,				//清除html中注释的部分
		removeEmptyAttributes:true,			//清除所有的空属性
		removeScriptTypeAttributes:true,	//清除所有script标签中的type="text/javascript"属性
		removeStyleLinkTypeAttributes:true,	//清楚所有Link标签上的type属性。
		minifyJS:true,						//压缩html中的javascript代码。
		minifyCSS:true						//压缩html中的css代码。
	};
    gulp.src('html/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/minhtml'));
});