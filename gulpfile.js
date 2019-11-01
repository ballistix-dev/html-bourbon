// npm install --save-dev browser-sync gulp gulp-concat gulp-cssmin gulp-jquery-closure gulp-load-plugins gulp-notify gulp-plumber gulp-sass gulp-uglify gulp-util bourbon node-normalize-scss

"use strict";
const { series, parallel, src, dest, watch } = require("gulp");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();
const bourbon = require("bourbon").includePaths;
const cssnano = require("cssnano");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const concat = require('gulp-concat-util');
const uglify = require("gulp-uglify");
const c = require('ansi-colors');
const log = require('fancy-log');
const beeper = require('beeper');
var basePaths = {
  src: "dev/",
  dest: "dist/"
};
var paths = {
  scripts: {
    src: basePaths.src + "scripts/",
    dest: basePaths.dest + "js/"
  },
  styles: {
    src: basePaths.src + "styles/",
    dest: basePaths.dest + "css/"
  }
};
var reportError = function (error) {
    beeper();
    log(c.yellow(
      `\n File: ${c.red.bold( error.relativePath + " " + error.line + ":" + error.column )}
      \n Error: ${c.cyan(error.messageOriginal)}`));
    this.emit('end');
};
function styles(done) {
  return src(paths.styles.src + "styles.scss")
    .pipe(plumber({errorHandler: reportError}))
    .pipe(sass({ outputStyle: "expanded", includePaths: [bourbon] }))
    .pipe(dest(paths.styles.dest))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream({match: "**/*.css"}));
    done();
}
function scripts(done) {
  return src(paths.scripts.src + "**/*")
    .pipe(plumber())
    .pipe(concat("scripts.js"))
    .pipe(concat.header('(function($) {\n'))
    .pipe(concat.footer('\n})(jQuery);'))
    .pipe(dest(paths.scripts.dest))
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(dest(paths.scripts.dest))
    done();
}
function reload(done) {
  browserSync.reload();
  done();
}
function serve() {

  browserSync.init({
    server: {
        baseDir: "./"
    }
  });
  watch( paths.styles.src + "**/*.scss", styles);
  watch( paths.scripts.src + "**/*.js", series(scripts, reload));
  watch( "./**/*.html",reload);
}

exports.serve = series(scripts, styles, serve);
exports.default = parallel(scripts, styles);
