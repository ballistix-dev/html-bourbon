var basePaths = {
    src: 'dev/',
    dest: 'dist/',
    proxy: ''
};
var paths = {
    scripts: {
        src: basePaths.src + 'scripts/',
        dest: basePaths.dest + 'js/'
    },
    styles: {
        src: basePaths.src + 'scss/',
        dest: basePaths.dest + 'css/'
    }
};

var appFiles = {
    styles: paths.styles.src + '**/*.scss',
    scripts: paths.scripts.src + '**/*.js',
    files: ['./**/*.php', './**/*.html']
};

var gulp = require('gulp');

var gutil = require('gulp-util');

var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

var browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

// Allows gulp --dev to be run for a more verbose output
var isProduction = true;
var sassStyle = 'compressed';
var sourceMap = false;

var normalize = require('node-normalize-scss').includePaths,
    neat = require('node-neat').includePaths;

if(gutil.env.dev === true) {
    sassStyle = 'expanded';
    sourceMap = true;
    isProduction = false;
}

var reportError = function (error) {
    var lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';

    plugins.notify({
        title: 'Task Failed [' + error.plugin + ']',
        message: lineNumber + 'See console.',
        sound: true // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
    }).write(error);

    gutil.log(
        '\n File:', gutil.colors.red(error.message)
        );

    this.emit('end');
}

gulp.task('css', function(){

    gulp.src( paths.styles.src + 'styles.scss' )
    
        .pipe(plugins.plumber({
            errorHandler: reportError
        }))

        .pipe(plugins.sass({
            outputStyle: 'compressed',
            includePaths: ['./bower_components/bitters/core/'].concat(normalize, neat),
            })
        )
        .pipe(plugins.concat('styles.min.css'))
        .pipe(isProduction ? plugins.cssmin({ keepSpecialComments: 0}) : gutil.noop())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('scripts', function(){
    gulp.src( appFiles.scripts )
        .pipe(plugins.plumber())
        .pipe(plugins.concat('scripts.min.js'))
        .pipe(plugins.jqueryClosure())
        .pipe(isProduction ? plugins.uglify() : gutil.noop())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
});


gulp.task('watch', ['css', 'scripts'], function(){
    gulp.watch(appFiles.styles, ['css']);
    gulp.watch(appFiles.scripts, ['scripts']);
});

gulp.task('serve', ['css', 'scripts', 'watch'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(appFiles.files).on('change', reload);
});

gulp.task('default', ['css', 'scripts']);
