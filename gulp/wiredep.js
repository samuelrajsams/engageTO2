'use strict';

var gulp = require('gulp');

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    return gulp.src('src/index.html')
    .pipe(wiredep({
        directory: 'bower_components',
        exclude: [/bootstrap\.css/, /bootstrap\.css/, /foundation\.css/],
        fileTypes: {
            html: {
                replace: {
                    js: '<script src="{{filePath}}"></script>',
                    css: '<link rel="stylesheet" href="/{{filePath}}" />'
                }
            }
        }
    }))
    .pipe(gulp.dest('src'));
});
