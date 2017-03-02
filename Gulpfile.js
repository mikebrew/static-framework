'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var paths = {
  // scripts: 'src/scripts/**/*'
}
var src = {
    scss: 'src/scss/**/*.scss',
    html: 'src/*.html',
    scripts: 'src/scripts/**/*'
};

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['public']);
});

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(src.scripts)
    .pipe(sourcemaps.init())
      // .pipe(coffee())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'));
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
  // return gulp.src(src.scss)
    .pipe(connect.reload())
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
    gulp.watch('src/scripts/**/*', ['scripts']);
});

gulp.task('default', ['connect', 'watch']);
