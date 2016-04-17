'use strict';
// var gulp = require('gulp'),
//     less = require('gulp-less'),
//     pug = require('gulp-pug'),
//     livereload = require('gulp-livereload');
    
 
// gulp.task('build', function build() {
//   return gulp.src('pug/**.pug')
//     .pipe(pug({ pretty: true }))
//     .pipe(gulp.dest('html'));
// });

// gulp.task('sass', function() {
//   gulp.src('sass/*.scss')
//     .pipe(less())
//     .pipe(gulp.dest('css'))
//     .pipe(livereload());
// });
 
// gulp.task('watch', function() {
//   livereload.listen();
//   gulp.watch('less/*.less', ['less']);
// });



// gulp.task('default', ['build', 'sass', 'watch', 'connect']);


var gulp = require('gulp'),
pug = require('gulp-pug'),
sass = require('gulp-sass'),
connect = require('gulp-connect');


var env = process.env.NODE_ENV || 'development';
var outputDir = './';



gulp.task('build', function build() {
  return gulp.src('pug/**.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('html'))
	.pipe(connect.reload());
});

gulp.task('sass', function(){
	var config = {};
	if (env === 'development') {
		config.sourceComments = 'map';
	};
	if (env === 'production') {
		config.outputStyle = "compressed"
	};

	return gulp.src('sass/main.scss')
	.pipe(sass(config))
	.pipe(gulp.dest(outputDir + '/css'))
	.pipe(connect.reload());

});

gulp.task('watch', function(){
	gulp.watch('pug/*.pug', ['build']);
	gulp.watch('js/*.js', ['js']);
	gulp.watch('sass/*.scss', ['sass']);

});

gulp.task('connect', function() {
    return connect.server({
        root: ['./'],
        port: 8888, // optional
        livereload: true
    });
});

// well just testing..

gulp.task('default', ['build', 'sass', 'watch', 'connect']);