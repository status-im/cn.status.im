import gulp from 'gulp'
import browserSync from 'browser-sync'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'

import browserify from 'browserify'
import source from 'vinyl-source-stream'
import streamify from 'gulp-streamify'
import babel from 'gulp-babel'
import tap from 'gulp-tap'
import buffer from 'gulp-buffer'
import sourcemaps from 'gulp-sourcemaps'

import del from 'del'
import gutil from 'gulp-util'
import rename from 'gulp-rename'
import uglify from 'gulp-uglify'
import htmlmin from 'gulp-htmlmin'
import template from 'gulp-template'
import imagemin from 'gulp-imagemin'

/* HTML template parameters */
const apk_url = (
  process.env.APK_URL || 
  'http://artifacts.status.im:8081/artifactory/nightlies-local/im.status.ethereum-14a369-rel.apk'
)

gulp.task('js', () => {
  return gulp.src('src/js/**/*.js', {read: false})
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(tap(f => {
      f.contents = browserify(f.path, {debug: true}).bundle()
    }))
    .pipe(streamify(babel({presets: ['env']})))
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
    .pipe(template({apk_url}))
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
  return gulp.src('src/img/**/*')
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
