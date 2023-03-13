import gulp from 'gulp';
import uglify from 'gulp-uglify';
import sass from 'sass';
import gulpSass from 'gulp-sass';

const scss = gulpSass(sass);

const SRC_DIR = './src/**/*.js'
const SRC_SCSS = './src/**/*.scss'
const DIST_DIR = './dist/'

async function func (){
    gulp.src(SRC_DIR)
        .pipe(uglify())
        .pipe(gulp.dest(DIST_DIR))
}

async function sassCompilation (){
    gulp.src(SRC_SCSS)
        .pipe(scss())
        .pipe(gulp.dest(DIST_DIR))
}

gulp.task('sass-compilation', sassCompilation);
gulp.task('default', func);