var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var size = require('gulp-size');
var nano = require('gulp-cssnano');
var rename = require('gulp-rename');
var scsslint = require('gulp-scss-lint');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var dir = {
  jsFolder: 'assets/javascript/main.js',
  styleFolder: 'assets/stylesheets/main-unprefixed.scss',
  imgFolder: 'assets/images/*'
};

// ===== Compile our SASS
gulp.task('sass', function() {
  return sass(dir.styleFolder)
  .on('error', function(err) {
    console.error('Error!', err.message);
  })
  .pipe(rename('main-unprefixed.css'))
  .pipe(gulp.dest('dist/css'))
  .pipe(reload({stream: true}));
});

// ===== Linting our SCSS
gulp.task('sass:lint', function () {
  gulp.src('assets/stylesheets/**/*.scss')
  .pipe(scsslint());
});

// ===== Prefix and minify the CSS
gulp.task('post:css', function() {
  gulp.src('dist/css/main-unprefixed.css')
  .pipe(autoprefixer({
    browsers: ['last 2 versions', 'ie 8', 'ie 9']
  }))
  .pipe(nano())
  .pipe(rename('main.min.css'))
  .pipe(size({ showFiles: true }))
  .pipe(gulp.dest('dist/css'))
  .pipe(reload({stream: true}));
});

// ===== Image optmization
gulp.task('imagemin', function () {
  return gulp.src(dir.imgFolder)
  .pipe(imagemin({
      progressive: true,
      multipass: true,
      optimizationLevel: 4
  }))
  .pipe(gulp.dest('dist/images'))
  .pipe(reload({stream: true}));
});

// ===== Handle browserify and minify our js
gulp.task('scripts', function() {
  gulp.src(dir.jsFolder)
  .pipe(browserify({
    insertGlobals : true
  }))
  .on('error', swallowError)
  .pipe(uglify())
  .pipe(rename('main.min.js'))
  .pipe(size({ showFiles: true }))
  .pipe(gulp.dest('dist/js'))
  .pipe(reload({stream: true}));
});

// ===== Sync
gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}

// ===== Watchs
gulp.task('default', ['bs-reload', 'browser-sync'],function () {
  gulp.watch(dir.jsFolder, ['scripts']);
  gulp.watch(dir.styleFolder, ['sass']);
  gulp.watch('dist/css/main-unprefixed.css', ['post:css']);
  gulp.watch('*.html', ['bs-reload']);
});
