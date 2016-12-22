'use strict'

var gulp = require('gulp')
var uglify = require('gulp-uglify')
var babel = require('gulp-babel')

gulp.task('lib', function () {
  return gulp.src('./src/**/*')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('lib'))
})
