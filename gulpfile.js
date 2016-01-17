var watchify = require('watchify'),
    browserify = require('browserify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    assign = require('lodash.assign'),
    rename = require('gulp-rename'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify'),
    exit = require('gulp-exit'),
    gwatch = require('gulp-watch');
    
// add custom browserify options here
var customOps = {
    entries: ['./src/app.js'],
    debug: true,
    transform: [babelify]
};
var opts = assign({}, watchify.args, customOps);
var b = watchify(browserify(opts));


gulp.task('js', bundle); // so you can run 'gulp js' to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // Output build logs to terminal


function bundle() {
    return b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('./src/app.js'))
        // optional - remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional - remove if you don't want sourcemaps
        .pipe(sourcemaps.init({loadMaps: true})) // load map from browserify file
        // Add transformation tasks to pipeline here
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(rename({
            dirname: ''
        }))
        .pipe(sourcemaps.write('./')) // writes the .map file
        .pipe(gulp.dest('./dist'))
        .pipe(gutil.env.type === 'production' ? exit() : gutil.noop());
}

gulp.task('watch-html', function() {
    gulp.watch(['./src/html/*.html'], ['html']);
});

gulp.task('html', function() {
    return gulp.src('./src/html/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(gutil.env.type === 'production' ? exit() : gutil.noop());
});

gulp.task('default', [ 'js', 'html', 'watch-html' ]);
