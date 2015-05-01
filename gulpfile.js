var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var size = require('gulp-size');
var nano = require('gulp-cssnano');
var rename = require('gulp-rename');
var scsslint = require('gulp-scss-lint');
var autoprefixer = require('gulp-autoprefixer');

var dir = {
  jsFolder: 'assets/javascript',
  styleFolder: 'assets/stylesheets/'
};

gulp.task('sass', function() {
  return sass(dir.styleFolder)
  .on('error', function(err) {
    console.error('Error!', err.message);
  })
  .pipe(rename('main-unprefixed.css'))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('sass:lint', function () {
  gulp.src('assets/stylesheets/**/*.scss')
  .pipe(scsslint());
});

gulp.task('post:css', function() {
  gulp.src('dist/css/main-unprefixed.css')
  .pipe(autoprefixer({
    browsers: ['last 2 versions', 'ie 8', 'ie 9']
  }))
  .pipe(nano())
  .pipe(rename('main.min.css'))
  .pipe(size({ showFiles: true }))
  .pipe(gulp.dest('dist/css'));
});
