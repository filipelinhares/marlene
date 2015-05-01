var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

var dir = {
  jsFolder: 'assets/javascript',
  styleFolder: 'assets/stylesheets/'
};

gulp.task('sass', function() {
  return sass(dir.styleFolder)
  .on('error', function(err) {
    console.error('Error!', err.message);
  })
  .pipe(gulp.dest('dist/css'));
});
