'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const shell = require('gulp-shell');

gulp.task('sass', function() {
  console.log('watching sass files');
  return watch(['./app/angular/scss/**/*.scss'], function() {
    console.log('gulp');
    gulp.src('./app/angular/scss/base.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./app/public/stylesheets'));
  });
});

gulp.task('html', function() {
  console.log('watching html files')
  return watch(['./app/angular/**/*.html'], function() {
    console.log('gulp');
    gulp.src('./app/angular/**/*.html')
      .pipe(shell([
        'echo webpack',
      ]));
  });
});
