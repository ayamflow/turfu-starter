import gulp from 'gulp'
import template from 'gulp-template'
import opts from '../options'
import defaults from 'defaults'
import project from '../../project.json'
import site from '../../assets/data/site.json'

let paths = defaults(project.env[opts.env], site)

gulp.task('html', () => {
    gulp.src(['./index.html'])
        .pipe(template(paths))
        .pipe(gulp.dest('./static'))
})
