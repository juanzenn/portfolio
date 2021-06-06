const gulp = require('gulp')
const {series, watch, parallel} = require('gulp')
const sass = require('gulp-sass')
const uglifycss = require('gulp-uglifycss')
const uglify = require('gulp-uglify')
const pipeline = require('readable-stream').pipeline

sass.compiler = require('node-sass')

const compileSass = cb => {
  gulp.src('./sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./public/styles'))
  cb()
}

const uglifyCss = cb => {
  gulp.src('./public/styles/*.css')
  .pipe(uglifycss({
    "uglyComments": true
  }))
  .pipe(gulp.dest('./public/dist'))
  cb()
}

const compileJs = cb => {
  pipeline(
    gulp.src('./scripts/*.js'),
    uglify(),
    gulp.dest('./public/dist')    
  )
  cb()
}

const watchSass = cb => {
  watch('./sass/*.scss', series(compileSass, uglifyCss))
  cb()
}

const watchJs = cb => {
  watch('./scripts/*.js', compileJs)
  cb()
}

exports.build = series(compileSass, uglifyCss, compileJs)
exports.default = series(compileSass, uglifyCss, compileJs, parallel(watchSass, watchJs))