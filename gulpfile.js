var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('gulp-bower');
var browserify = require('browserify');
var sass = require('gulp-sass');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');



// Copy HTML and CSS
gulp.task('markup', function() {
    return gulp.src('./SideBarApp/index.html').pipe(gulp.dest('./FirefoxAddOn/data/'));
});

gulp.task('sass', function () {
  gulp.src('./SideBarApp/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./FirefoxAddOn/data/css'));
});


function createTask(srcPath, entryPoint, destPath){
    return function() {
        var b = browserify({
        entries: [srcPath + entryPoint],
    });
    b.transform('debowerify');
    b.on('log', gutil.log);
    b.bundle()
    .pipe(source(entryPoint))
    .pipe(buffer())
    .pipe(gulp.dest(destPath));
    }
}

gulp.task('buildSideBar', ['markup', 'sass'], createTask('./SideBarApp/js/', 'sideBarApp.js', './FirefoxAddOn/data/'));
gulp.task('buildInjectApp',  createTask('./InjectApp/', 'injectApp.js', './FirefoxAddOn/data/'));

gulp.task('build', ['buildSideBar', 'buildInjectApp']);

gulp.task('watch', ['buildSideBar', 'buildInjectApp'], function () {
  gulp.watch('./SideBarApp/css/**/*.scss',['buildSideBar']); 
  gulp.watch('./SideBarApp/**/*.html', ['buildSideBar']);
  gulp.watch('./SideBarApp/**/*.js', ['buildSideBar']);
  gulp.watch('./InjectApp/**/*.js', ['buildInjectApp']);
});

