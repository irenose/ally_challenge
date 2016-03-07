

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    reload = browserSync.reload,
    path = require("path");

var paths = {
  my_server: 'ally.dev',
  sass: 'app/styles',
  compressImage: 'app/images',
  js_files: 'app/scripts'
};

gulp.task('clear', function (done) {
    return cache.clearAll(done);
});

gulp.task('imagemin', function(){
    return gulp.src(path.join(paths.compressImage, '/**/*'))
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('dist/assets/images'))
    .pipe(notify({ message: 'Images Compressed' }))
});

gulp.task('sass', function(){
  return gulp.src(path.join(paths.sass, '/**/*.scss'))
  .pipe(sourcemaps.init())
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(sass({outputStyle: 'expanded',}))
  .pipe(autoprefixer('last 2 version', "> 1%", 'ie 8', 'ie 9'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/assets/styles'))
  .pipe(reload({stream:true}))
  //.pipe(notify({ message: 'Sass files have been compiled!'}))
});



/* updated watch task to include sass */
gulp.task('watch', function() {
  gulp.watch(path.join(paths.sass, '/**/*.scss'), ['sass']);
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init(null,{
      open: 'external',
          host: 'ally.dev',
          proxy: 'ally.dev', // or project.dev/app/
          port: 8080,
          ui: {
              port: 8080
          }
      }
    );

    gulp.watch(path.join(paths.sass, '/**/*.scss'), ['sass']);
    //gulp.watch(path.join(paths.html_pages, '/*.tpl.html'), ['fileinclude']);
});

//  Default Gulp Task
//===========================================
gulp.task('default', ['sass', 'watch'], function() {

});
