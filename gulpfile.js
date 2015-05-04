var gulp = require('gulp');
var plugin = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var src = {
  jsFolder: 'assets/javascript/main.js',
  styleFolder: 'assets/stylesheets/main.scss',
  imgFolder: 'assets/images/*'
};

var dist = {
  jsFolder: 'dist/js',
  styleFolder: 'dist/css',
  imgFolder: 'dist/images'
};

// ===== Compile our SASS
gulp.task('sass', function() {
  gulp.src(src.styleFolder)
  .pipe(plugin.sass())
  .on('error', function(err) {
    console.error('Error!', err.message);
  })
  .pipe(plugin.autoprefixer({
    browsers: ['last 2 versions', 'ie 8', 'ie 9']
  }))
  .pipe(plugin.cssnano())
  .pipe(plugin.rename('main.min.css'))
  .pipe(plugin.size({ showFiles: true }))
  .pipe(gulp.dest(dist.styleFolder))
  .pipe(reload({stream: true}));
});

// ===== Linting our SCSS
gulp.task('sass:lint', function () {
  gulp.src('assets/stylesheets/**/*.scss')
  .pipe(plugin.scsslint());
});

// ===== Image optmization
gulp.task('images', function () {
  return gulp.src(src.imgFolder)
  .pipe(plugin.imagemin({
      progressive: true,
      multipass: true,
      optimizationLevel: 4
  }))
  .pipe(gulp.dest(dist.imgFolder))
  .pipe(reload({stream: true}));
});

// ===== Handle browserify and minify our js
gulp.task('js', function() {
  gulp.src(src.jsFolder, {read: false})
  .pipe(plugin.browserify())
  .pipe(plugin.uglify())
  .pipe(plugin.rename('main.min.js'))
  .pipe(plugin.size({ showFiles: true }))
  .pipe(gulp.dest(dist.jsFolder))
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
  gulp.watch(src.jsFolder, ['js']);
  gulp.watch(src.styleFolder, ['sass','sass:lint']);
  gulp.watch('*.html', ['bs-reload']);
});
