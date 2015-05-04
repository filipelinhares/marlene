var gulp = require('gulp');
var plugin = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var options = require('./marlene');

// ===== Compile our SASS
gulp.task('sass', function() {
  gulp.src(options.srcFolders.style)
  .pipe(plugin.sass())
  .on('error', function(err) {
    console.error('Error!', err.message);
  })
  .pipe(plugin.autoprefixer({
    browsers: options.sass.prefixVersions
  }))
  .pipe(plugin.cssnano())
  .pipe(plugin.rename(options.sass.distFileName))
  .pipe(plugin.size({ showFiles: true }))
  .pipe(gulp.dest(options.distFolders.style))
  .pipe(reload({stream: true}));
});

// ===== Linting our SCSS
gulp.task('sass:lint', function () {
  gulp.src('assets/stylesheets/**/*.scss')
  .pipe(plugin.scsslint());
});

// ===== Image optmization
gulp.task('images', function () {
  return gulp.src(options.srcFolders.img)
  .pipe(plugin.imagemin({
      progressive: options.images.progressive,
      multipass: options.images.multipass,
      optimizationLevel: options.images.optimizationLevel
  }))
  .pipe(gulp.dest(options.distFolders.img))
  .pipe(reload({stream: true}));
});

// ===== Handle browserify and minify our js
gulp.task('js', function() {
  gulp.src(options.srcFolders.js, {read: false})
  .pipe(plugin.browserify())
  .pipe(plugin.uglify())
  .pipe(plugin.rename(options.js.distFileName))
  .pipe(plugin.size({ showFiles: true }))
  .pipe(gulp.dest(options.distFolders.js))
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

gulp.task('compile', ['sass', 'images', 'js']);

gulp.task('default', ['compile', 'browser-sync', 'bs-reload'],function () {
  gulp.watch(options.srcFolders.js, ['js']);
  gulp.watch(options.srcFolders.style, ['sass','sass:lint']);
  gulp.watch('*.html', ['bs-reload']);
});
