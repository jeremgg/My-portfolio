var gulp = require('gulp');
var sass = require('gulp-sass');
var csscomb = require ('gulp-csscomb');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var del = require('del');
var pkg = require('./package.json');




//COPY FILES FROM NODE_MODULES
gulp.task('copy', function() {
    gulp.src([
        'node_modules/bootstrap/dist/js/**/*.js'
    ])
    .pipe(gulp.dest('dev/js/vendor/bootstrap'))

    gulp.src([
        'node_modules/bootstrap/scss/**/*.scss'
    ])
    .pipe(gulp.dest('dev/scss/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('dev/js/vendor/jquery'))

    gulp.src(['node_modules/jquery.easing/jquery.easing.js', 'node_modules/jquery.easing/jquery.easing.min.js'])
    .pipe(gulp.dest('dev/js/vendor/jquery.easing'))

    gulp.src([
        'node_modules/font-awesome/**',
        '!node_modules/font-awesome/**/*.map',
        '!node_modules/font-awesome/.npmignore',
        '!node_modules/font-awesome/*.txt',
        '!node_modules/font-awesome/*.md',
        '!node_modules/font-awesome/*.json'
    ])
    .pipe(gulp.dest('dev/fonts/font-awesome'))
})




//CSSCOMB FOR SCSS
gulp.task('csscomb', function(){
    return gulp.src('dev/scss/*.scss')
        .pipe(csscomb())
        .pipe(gulp.dest('dev/scss'));
});




//HEADER CONTENT FILES
var banner = ['/*!\n',
    ' * Site web personnel of jérémy Grégoire - \n',
    ' */\n',
    ''
].join('');




//COMPILE LIBRARY FILES FROM SCSS INTO CSS
gulp.task('lib', function() {
    return gulp.src('dev/scss/bootstrap/bootstrap.scss')
    .on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(sass())
    .pipe(gulp.dest('dev/css'))
});




//COMPILE FILES FROM SCSS INTO CSS
gulp.task('sass', function() {
    return gulp.src('dev/scss/styles.scss')
    .on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(sass())
    .pipe(header(banner, {
        pkg: pkg
    }))
    .pipe(gulp.dest('dev/css'))
});




//MINIFY CSS
gulp.task('minify-css', ['sass'], function() {
    return gulp.src([
        'dev/css/styles.css',
        'dev/css/bootstrap/bootstrap.css'
    ])
    .pipe(cleanCSS({
        compatibility: 'ie8'
    }))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('dev/css'))
});




//MINIFY JS
gulp.task('minify-js', function() {
    return gulp.src('dev/js/*.js')
    .pipe(uglify())
    .pipe(header(banner, {
        pkg: pkg
    }))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('dev/js'))
});




//DELETE UNNECESSARY FILES
gulp.task('clean', function(){
    return del('dist');
});





//DEFAULT TASK
gulp.task('default', ['csscomb', 'lib', 'sass', 'minify-css', /*'minify-js', */'copy', 'clean'], function(){
    gulp.src('dev/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))

    gulp.src('dev/css/*.css')
    .pipe(gulp.dest('dist/css'))

    gulp.src('dev/fonts/**')
    .pipe(gulp.dest('dist/fonts'))

    gulp.src('dev/js/**/*.js')
    .pipe(gulp.dest('dist/js'))

    return gulp.src('dev/*.html')
    .pipe(gulp.dest('dist'));
});




//WATCH TASK
gulp.task('watch', function() {
    gulp.watch('dev/scss/*.scss', ['csscomb']);
    gulp.watch('dev/scss/*.scss', ['sass']);
    gulp.watch('dev/css/*.css', ['minify-css']);
    // gulp.watch('dev/js/*.js', ['minify-js']);
});
