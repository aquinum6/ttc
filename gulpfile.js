
var gulp = require('gulp');
var sass = require('gulp-sass');
var foreach = require('gulp-foreach');
var autoprefixer = require('gulp-autoprefixer');
var clean_css = require('gulp-clean-css');
var clean = require('gulp-clean');
var exec = require('child_process').exec;
var path = require('path');

//Build
gulp.task('build:css', function() {
    return gulp.src([
        'demo/**/*.scss',
        'src/**/*.scss'])
        .pipe(foreach(function(stream, file) {
            var dir = path.dirname(file.path);
            return stream
                .pipe(sass().on('error', sass.logError))
                .pipe(autoprefixer({
                    browsers: ['last 2 versions'],
                    cascade: false
                }))
                .pipe(clean_css())
                .pipe(gulp.dest(dir));
        }));
});

gulp.task('build:ngc', function (cb) {
    exec('node_modules/.bin/ngc -p "tsconfig-aot.json"', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('build:rollup', function (cb) {
    exec('node_modules/.bin/rollup -c "rollup.js"', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('build:copy-style', function() {
    return gulp.src('demo/styles.css')
        .pipe(gulp.dest('docs'));
});

gulp.task('build:clean', function(){
    return gulp.src('aot')
        .pipe(clean({
            force: true
        }));
});

gulp.task('build:pre-build', function() {
    return gulp.src([
        "!demo/system.config.js",
        "demo/**/*.js",
        "demo/**/*.js.map",
        "demo/**/*.css",
        "!docs/build.js",
        "docs/**/*.js",
        "docs/**/*.js.map",
        "src/**/*.js",
        "src/**/*.js.map",
        "src/**/*.css"
    ])
        .pipe(clean({
            force: true
        }));
});