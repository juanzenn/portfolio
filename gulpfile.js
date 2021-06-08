const gulp = require("gulp")
const { series, watch } = require("gulp")
const sass = require("gulp-sass")
const uglifycss = require("gulp-uglifycss")
const uglify = require("gulp-uglify")
const webp = require("gulp-webp")
const pipeline = require("readable-stream").pipeline
const browserSync = require("browser-sync").create()


sass.compiler = require("node-sass")

const compileSass = () => {
  return gulp
    .src("./sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./public/styles"))
}

const uglifyCss = () => {
  return gulp
    .src("./public/styles/*.css")
    .pipe(
      uglifycss({
        uglyComments: true,
      })
    )
    .pipe(gulp.dest("./public/dist"))
    .pipe(browserSync.stream())
}

const compileJs = () => {
  return pipeline(
    gulp.src("./scripts/*.js"),
    uglify(),
    gulp.dest("./public/dist")
  ).pipe(browserSync.stream())
}

const imagetoWebp = () => {
  return gulp.src(['./public/images/*.png', './public/images/*.jpg'])
  .pipe(webp())
  .pipe(gulp.dest('./public/dist'))
}

const watcher = () => {
  browserSync.init({
    proxy: "localhost:3000",
    port: "3030"
  })
  gulp.watch("./sass/*.scss", series(compileSass, uglifyCss))
  gulp.watch("./scripts/*.js", compileJs)
  gulp.watch("./views/**/*.hbs").on("change", browserSync.reload)
}

exports.watch = watcher
exports.build = series(compileSass, uglifyCss, compileJs, imagetoWebp)
