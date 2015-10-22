'use strict'

var gulp = require('gulp');
var del = require('del'); //Cleans directories
var sass = require('gulp-sass'); //Adds Sass compilation tools
var autoprefixer = require('gulp-autoprefixer'); //Auto-prefixes css styles for improved browser compatibility
var argv = require('yargs').argv; //Allows for command line params to be passed here
var gulpif = require('gulp-if'); //Adds conditional calls
var uglify = require('gulp-uglify'); //Minifies Javascript
var concat = require('gulp-concat'); //Concatenates Javascript
var gutil = require('gulp-util'); //Allows for log messages when running tasks

var source = {
    style: 'styles/main.scss', //includes references to all additional styles
    styles: 'styles/**/*.scss', //all styles (not just references)
    scripts : [
            //libs

            'scripts/app.js',
            'scripts/appSettings.js',
            //services
            'scripts/services/services.js',
            'scripts/services/**/*.js',
            //controllers
            'scripts/controllers/controllers.js',
            'scripts/controllers/appController.js',
            'scripts/controllers/**/*.js',
            //directives
            'scripts/directives/directives.js',
            'scripts/directives/**/*.js',
            //filters
            'scripts/filters/filters.js',
            'scripts/filters/**/*.js',
    ],
    
};

var destination = {
    all: './wwwroot/dist/**/*',
    scripts: './wwwroot/dist/',
    styles: './wwwroot/dist/'
}


gulp.task('clean', function () {
    del(destination.all); // Delete everything in 'wwwroot/dist'
});

gulp.task('sass', function () {
    gulp.src(source.style)
        .pipe(gulpif(argv.release, sass({ outputStyle: 'compressed' }))) //uglify .scss files if release
        .pipe(gulpif(!argv.release, sass())) //simply compile .scss files if debug
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest(destination.styles))
});

gulp.task('js', function () {
    gulp.src(source.scripts)
        //.pipe(gulpif(argv.release, concat('app.js'))) //concat .js files if release
        .pipe(concat('app.js'))
        .pipe(gulpif(argv.release, uglify())) //uglify .js files if release
        .pipe(gulp.dest(destination.scripts));
});

gulp.task('build', ['clean', 'sass', 'js']);

gulp.task('watch', function () {
    gulp.watch(source.styles, ['sass']);
    gulp.watch(source.scripts, ['js']);
});