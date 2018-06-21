'use strict';

var gulp = require('gulp');

var util = require('util');

var browserSync = require('browser-sync');

var modRewrite = require('connect-modrewrite');
var middleware = require('./proxy');

var inject = require('gulp-inject');
var sass = require('gulp-sass');
var scripts = require('gulp-jshint');

var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*']
});

function browserSyncInit(baseDir, files, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if (baseDir === 'src' || (util.isArray(baseDir) && baseDir.indexOf('src') !== -1)) {
        routes = {
            '/bower_components': 'bower_components'
        };
    }

    browserSync.instance = browserSync.init(files, {
        startPath: '/',
        server: {
            baseDir: baseDir,
            middleware: [
                modRewrite(['!\\.\\w+$ /index.html [L]'])
            ],
            routes: routes
        },
        browser: browser
    });

}

gulp.task('scripts', function () {
    return gulp.src('src/{app,modules,shared}/**/*.js')
            .pipe($.jshint())
            .pipe($.jshint.reporter('jshint-stylish'));
    return gulp.src('src/{app,modules,shared}/**/*.js');
});

gulp.task('injector:js', ['scripts'], function () {
    return gulp.src(['src/index.html', '.tmp/index.html'])
            .pipe($.inject(gulp.src([
                'src/app/**/*.js'
            ])
                    .pipe($.angularFilesort()), {
                ignorePath: 'src',
                addRootSlash: true}
            ))
            .pipe(gulp.dest('./'));
});

gulp.task('file-inject', function () {
    var target = gulp.src('/src/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources = gulp.src([
        'app/assets/css/*.min.css',
        'app/app.config.js',
        'app/common.js',
        '/app/application.js',
        '/app/application.config.js',
        '/app/application.run.js',
        '/app/modules/**/*.module.js',
        '/app/modules/**/*.routes.js',
        '/app/shared/services/application.services.js',
        '/app/modules/**/*.service.js',
        '/app/modules/**/*.controller.js'        
    ], {read: false});

    return target.pipe(inject(sources))
            .pipe(gulp.dest('/src'));
});


gulp.task('sass', function () {
    return gulp.src('src/app/assets/sass/custom/custom.scss')
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(concat('style.css'))
            .pipe(gulp.dest('./src/app/assets/css'))
            .pipe(minifyCSS())
            .pipe(concat('style.min.css'))
            .pipe(gulp.dest('./src/app/assets/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('src/app/assets/sass/**/*.scss', ['sass']);
});

gulp.task('serve', ['watch'], function () {
    browserSyncInit([
        '.tmp',
        'src'
    ], [
        'src/app/assets/sass/**/*.scss',
        'src/app/**/*.js',
        'src/app/assets/images/**/*',
        'src/*.html',
        'src/app/modules/**/views/*.html'
    ]);
});
gulp.task('serve:dist', ['build'], function () {
    browserSyncInit('dist');
});



//gulp.task('serve:e2e', ['wiredep', 'injector:js', 'injector:css'], function () {
//    browserSyncInit(['.tmp', 'src'], null, []);
//});
//
//gulp.task('serve:e2e-dist', ['build'], function () {
//    browserSyncInit('dist', null, []);
//});
