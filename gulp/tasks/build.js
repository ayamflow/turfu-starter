import gulp from 'gulp'
import opts from '../options'
import watch from 'gulp-watch'

gulp.task('build', ['clean', 'assets', 'html', 'scripts', 'styles'], (done) => {
    if (opts.watch) {
        watch([
            './src/**/*.js',
            './package.json'
        ], () => {
            gulp.start('scripts')
        })

        watch('./src/**/*.styl', () => {
            gulp.start('styles')
        })
    }

    done()
})