var gulp = require('gulp');
var webserver = require('gulp-webserver');


gulp.task('kill-server', function () {
    return gulp.src('.').pipe(webserver()).emit('kill');
});


gulp.task('server', function () {

    gulp.src('.')
        .pipe(webserver({
            livereload: false,
            directoryListing: false,
            open: true
        }));
});

gulp.task('default', function () {
});