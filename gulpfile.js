const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const minifyCss = require("gulp-minify-css");
const browserSync = require("browser-sync").create();

//complie scss into css

function style() {
  // where is my scss file
  return (
    gulp
      .src("./scss/**/*.scss")
      .pipe(sass({ outputStyle: "compressed" }))
      .pipe(rename({ suffix: ".min" }))
      // pass that file through sass compiler
      .pipe(sass().on("error", sass.logError))
      .pipe(minifyCss())
      .pipe(gulp.dest("./css"))
      // stream changes to all browser
      .pipe(browserSync.stream())
  );
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./scss/**/*.scss", style);
  gulp.watch("./*.html").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
