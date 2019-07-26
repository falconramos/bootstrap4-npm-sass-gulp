var gulp        = require('gulp');
var browsersync = require('browser-sync').create();
var sass        = require('gulp-sass');

//Compilar o Sass
gulp.task('sass', gulp.series(function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browsersync.stream());

}));

//mover js para src/js
gulp.task('js', gulp.series(function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browsersync.stream());

}));


//servidor para olhar os Html/scss
gulp.task('server', gulp.series('sass', function() {
    browsersync.init({
        server: "./src"

    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.series(['sass']));
    gulp.watch("src/*.html").on('change', browsersync.reload);

}));

gulp.task('default', gulp.series(['js', 'server']));