import gulp from 'gulp'

gulp.task('assets', () => {
    return gulp.src(['./assets/**/*'])
        .pipe(gulp.dest('./static/assets'))
})
