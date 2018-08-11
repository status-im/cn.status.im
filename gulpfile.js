var gulp         = require('gulp')
var browserSync  = require('browser-sync').create()
var sass         = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')

var browserify   = require('browserify')
var source       = require('vinyl-source-stream')
var streamify    = require('gulp-streamify')
var babel        = require('gulp-babel')
var tap          = require('gulp-tap')
var buffer       = require('gulp-buffer')
var sourcemaps   = require('gulp-sourcemaps')

var del          = require('del')
var gutil        = require('gulp-util')
var rename       = require('gulp-rename')
var uglify       = require('gulp-uglify')
var htmlmin      = require('gulp-htmlmin')

var imagemin     = require('gulp-imagemin')

gulp.task('js', () => {
  return gulp.src('src/js/**/*.js', {read: false})
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(tap((f) => {
      f.contents = browserify(f.path, {debug: true}).bundle()
    }))
    .pipe(streamify(babel({presets: ['es2015', 'es2017']})))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream())
})

gulp.task('fonts', () => {
  return gulp.src(['src/fonts**/*'])
    .pipe(gulp.dest('dist'))
})

gulp.task('html', () => {
  return gulp.src(['src/**/*.html'])
    .pipe(htmlmin({collapseWhitespace: true, minifyJS: true}))
    .pipe(rename(p => p.dirname = p.dirname.slice(5)))
    .pipe(gulp.dest('dist'))
})

gulp.task('css', () => {
  return gulp.src("src/scss/main.scss")
    .pipe(sass())
    .on('error', gutil.log)
    .pipe(autoprefixer({ browsers: ['last 3 versions'], cascade: false }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream())
})

gulp.task('images', () => {
  gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
})

gulp.task('clean', () => {
  del.sync('dist/*')
})

gulp.task('develop', ['build'], () => {
    browserSync.init({server: "./dist"})

    gulp.watch("src/scss/*.scss", ['css'])
    gulp.watch("src/js/*.js", ['js'])
    gulp.watch("src/img/**/*", ['images'])
    gulp.watch("./*.html", ['html']).on('change', browserSync.reload)
})

gulp.task('build',   ['clean', 'css', 'images', 'fonts', 'js', 'html'])
gulp.task('default', ['develop'])
