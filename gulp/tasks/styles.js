import gulp from 'gulp'
import util from 'gulp-util'
import stylus from 'gulp-stylus'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import plumber from 'gulp-plumber'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'
import filter from 'gulp-filter'
import browserSync from 'browser-sync'
import opts from '../options'

gulp.task('styles', () => {
  gulp.src('./src/main.styl')
    .pipe(plumber())
    .pipe(opts.debug ? sourcemaps.init() : util.noop())
    .pipe(stylus({'include css': true}))
    .on('error', util.log)
    .pipe(postcss([
        autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        })
    ]))
    .pipe(opts.debug ? sourcemaps.write() : util.noop())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('static/build'))
    .pipe(filter('**/*.css'))
    .pipe(browserSync.reload({stream: true}))
})
