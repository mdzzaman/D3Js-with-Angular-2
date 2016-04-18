var gulp = require('gulp');
var rimraf = require('rimraf');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var del = require('gulp-delete-file');
//libs, css, html, tscopy, deleteFile
var paths = {
    npm: './node_modules/',
    lib: './dist/lib/',
    app: './dist/app/',
    root: './dist/',
    tsscript: './dist/scripts/',
    script: './src/'
};

var libs = [
    paths.npm + 'angular2/bundles/angular2.dev.js',
    paths.npm + 'es6-shim/es6-shim.min.js',
    paths.npm + 'es6-shim/es6-shim.min.map',
    paths.npm + 'systemjs/dist/system-polyfills.js',
    paths.npm + 'angular2/es6/dev/src/testing/shims_for_IE.js',
    paths.npm + 'angular2/bundles/angular2-polyfills.js',
    paths.npm + 'angular2/bundles/router.dev.js',
    paths.npm + 'systemjs/dist/system.src.js',
    paths.npm + 'rxjs/bundles/Rx.js'
];

gulp.task('html', function () {
    return gulp.src(paths.script + '**/*.html')
        .pipe(gulp.dest(paths.app));
});

gulp.task('indexCopy', function () {
    return gulp.src(paths.script + 'index.html')
        .pipe(gulp.dest(paths.root));
});

gulp.task('indexDelete', function () {
   return gulp.src([paths.app + 'index.html']).pipe(del({
        deleteMatch: true
    }))
});

gulp.task('css', function () {
    return gulp.src(paths.script + '**/*.css')
        .pipe(gulp.dest(paths.app));
});

gulp.task('libs', function () {
    return gulp.src(libs)
        .pipe(gulp.dest(paths.lib));
});

gulp.task('tscopy', function () {
    return gulp.src(paths.script + '**/*[a-z].ts')
        .pipe(gulp.dest(paths.tsscript));
});


gulp.task('default', ['html','indexCopy','indexDelete', 'css','libs','tscopy']);