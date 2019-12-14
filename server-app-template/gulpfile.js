var gulp = require('gulp');
var ts = require('gulp-typescript');
var del = require('del');
var merge = require('merge2');
var sourcemaps = require("gulp-sourcemaps");
var eslint = require('gulp-eslint');
var path = require('path');
var clearModule = require('clear-module');

function clean() {
  return del([
    './dist/**/*'
  ]);
}

var tsProject = ts.createProject('./tsconfig.json');

function compile() {
  return gulp.src('./src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '../src' }))
    .pipe(gulp.dest('./dist'));
}

function run(done) {
  require('./dist/index');
  done();
}

// function unloadModule(done) {
//   const modulePath = path.resolve(__dirname, './dist');
//   const regex = new RegExp(`${modulePath}`);
//   clearModule.match(regex);
//   done();
// }

const debugTask = gulp.series(
  lint,
  clean,
  compile,
  run
);

// function watch() {
//   gulp.watch('./src/**/*.ts', gulp.series(
//     clean,
//     compile,
//     unloadModule,
//     run
//   ));
// }

function lint() {
  return gulp.src(['./src/**/*.ts'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

exports.default = gulp.series(lint, clean, compile);

exports.debug = gulp.series(debugTask);

exports.lint = lint;

