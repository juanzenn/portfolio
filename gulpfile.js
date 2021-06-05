const gulp = require('gulp')
const sass = require('gulp-sass')
const uglifycss = require('gulp-uglifycss')

sass.compiler = require('node-sass')

gulp.task('sass', () => {
  return gulp.src('./sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./public/styles'))
})

gulp.task('css', () => {
  return gulp.src('./public/styles/*.css')
  .pipe(uglifycss({
    "uglyComments": true
  }))
  .pipe(gulp.dest('./public/dist'))
})
