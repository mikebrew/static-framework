'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

var src = {
    scss: 'src/scss/**/*.scss',
    // css:  'app/css',
    html: 'src/*.html'
};

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('html', function () {
  return gulp.src('./src/**/*.html')
  .pipe(connect.reload())
  .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function () {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/**/*.html', ['html']);
});

gulp.task('default', ['connect', 'watch']);
