'use strict';

var gulp = require('gulp');
//var watch = require('gulp-watch');

gulp.task('watch', ['sass'], function () {
     gulp.watch('src/app/assets/sass/**/*.scss', ['sass']);
//    gulp.watch('src/app/assets/sass/**/*.scss', ['file-inject']);
    gulp.watch('bower.json', ['wiredep']);
});
