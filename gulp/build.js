//'use strict';
//
//var gulp = require('gulp');
//var sass = require('gulp-sass');
//var scripts = require('gulp-jshint');
//var inject = require('gulp-inject');
////var watch = require('gulp-watch');
//
//var $ = require('gulp-load-plugins')({
//    pattern: ['gulp-*', 'del']
//});
//
//
//gulp.task('sass', function () {
//    return gulp.src('./sass/**/*.scss')
//            .pipe(sass.sync().on('error', sass.logError))
//            .pipe(gulp.dest('./css'));
//});
//
//gulp.task('sass:watch', function () {
//    gulp.watch('./sass/**/*.scss', ['sass']);
//});
//
//gulp.task('scripts', function () {
//    return gulp.src('src/app/{modules,shared}/**/*.js')
//            .pipe($.jshint())
//            .pipe($.jshint.reporter('jshint-stylish'));
//    return gulp.src('src/app/{modules,shared}/**/*.js');
//});
//
//
//gulp.task('styles', ['wiredep', 'injector:css:preprocessor'], function () {
//    return sass('src/app/')
//            .on('error', function handleError(err) {
//                console.error(err.toString());
//                this.emit('end');
//            })
////    .pipe($.autoprefixer())
//            .pipe(gulp.dest('.tmp/app/'));
//});
//
//gulp.task('injector:css:preprocessor', function () {
//    return gulp.src('src/app/index.scss')
//            .pipe($.inject(gulp.src([
//                'src/{app,components}/**/*.scss',
//                'src/{app,components}/**/*.sass',
//                '!src/app/index.scss',
//                '!src/app/vendor.scss'
//            ], {read: false}), {
//                transform: function (filePath) {
//                    filePath = filePath.replace('src/app/', '');
//                    filePath = filePath.replace('src/components/', '../components/');
//                    return '@import \'' + filePath + '\';';
//                },
//                starttag: '// injector',
//                endtag: '// endinjector',
//                addRootSlash: false
//            }))
//            .pipe(gulp.dest('src/app/'));
//});
//
//gulp.task('injector:css', ['styles'], function () {
//    return gulp.src('src/index.html')
//            .pipe($.inject(gulp.src([
//                '.tmp/{app,components}/**/*.css',
//                '!.tmp/app/vendor.css'
//            ], {read: false}), {
//                ignorePath: '.tmp',
//                addRootSlash: true
//            }))
//            .pipe(gulp.dest('src/'));
//});
//
//
//gulp.task('injector:js', ['scripts', 'injector:css'], function () {
//    return gulp.src(['src/index.html', '.tmp/index.html'])
//            .pipe($.inject(gulp.src([
//                'src/{app,components}/**/*.js',
//                '!src/{app,components}/**/*.spec.js',
//                '!src/{app,components}/**/*.mock.js'
//            ])
////                    .pipe($.angularFilesort()), {
////                ignorePath: 'src',
////                addRootSlash: true}
//            ))
//            .pipe(gulp.dest('src/'));
//});
//
//gulp.task('index', function () {
//    var target = gulp.src('./src/index.html');
//    // It's not necessary to read the files (will speed up things), we're only after their paths: 
//    var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});
//
//    return target.pipe(inject(sources))
//            .pipe(gulp.dest('./src'));
//});
//
//gulp.task('clean', function (done) {
//    $.del(['dist/', '.tmp/'], done);
//});
//
////gulp.task('watch', [/*'consolidate',*/ 'wiredep', 'injector:css', 'injector:js'] , function () {
//////    gulp.watch('src/{app,components}/**/*.scss', ['injector:css']);
//////    gulp.watch('src/{app,components}/**/*.sass', ['injector:css']);
////    gulp.watch('src/{app}/**/*.js', ['injector:js']);
//////    gulp.watch('src/{app,components}/**/*.js', ['injector:js']);
//////    gulp.watch('src/assets/images/**/*', ['images']);
////    gulp.watch('bower.json', ['wiredep']);
////});
//
//gulp.task('build', ['sass', 'styles', 'scripts', 'index']);
