import gulp from 'gulp'
import rm from 'rimraf'

gulp.task('clean', (done) => {
  rm.sync('static/build')
  rm.sync('static/assets')
  done()
})
