var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('gulp-bower');
var browserify = require('browserify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');



// Copy HTML and CSS
gulp.task('markup', function() {
    return gulp.src('./SideBarApp/index.html').pipe(gulp.dest('./FirefoxAddOn/data/'));
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

gulp.task('buildSideBar', ['markup'], createTask('./SideBarApp/', 'sideBarApp.js', './FirefoxAddOn/data/'));
gulp.task('buildInjectApp',  createTask('./InjectApp/', 'injectApp.js', './FirefoxAddOn/data/'));

gulp.task('build', ['markup', 'buildSideBar', 'buildInjectApp']);

