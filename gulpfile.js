// npm install --save-dev browser-sync gulp gulp-concat gulp-cssmin gulp-jquery-closure gulp-load-plugins gulp-notify gulp-plumber gulp-sass gulp-uglify gulp-util bourbon node-normalize-scss

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
    },
    images: {
        src: basePaths.src + 'psd/NAV11526_situation-room-landing-page-assets/',
        dest: basePaths.dest + 'img/'
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
    bourbon = require('bourbon').includePaths;

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
};

gulp.task('styles', function(){

    gulp.src( paths.styles.src + 'styles.scss' )

        .pipe(plugins.plumber({
            errorHandler: reportError
        }))

        .pipe(plugins.sass({
            outputStyle: 'compressed',
            includePaths: [''].concat(normalize, bourbon),
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

gulp.task('imagemin', () =>
    gulp.src(paths.images.src + '*')
        .pipe(plugins.imagemin([
            plugins.imagemin.gifsicle({interlaced: true}),
            plugins.imagemin.jpegtran({progressive: true}),
            plugins.imagemin.optipng({optimizationLevel: 5}),
            plugins.imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(paths.images.dest))
);


gulp.task('watch', ['styles', 'scripts'], function(){
    gulp.watch(appFiles.styles, ['styles']);
    gulp.watch(appFiles.scripts, ['scripts']);
});

gulp.task('serve', ['styles', 'scripts', 'watch'], function () {


    if(basePaths.proxy) {
        browserSync.init({
            proxy: basePaths.proxy,
            host: "192.168.0.107"
        });
    } else {
        browserSync.init({
            host: "192.168.0.107",
            server: {
                baseDir: "./"

            }
        });
    }

    gulp.watch(appFiles.files).on('change', reload);
});

gulp.task('default', ['styles', 'scripts']);
