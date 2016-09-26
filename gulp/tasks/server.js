import gulp from 'gulp'
import watch from 'gulp-watch'
import browserSync from 'browser-sync'
import modRewrite from 'connect-modrewrite'
import defaults from 'defaults'
import { join } from 'path'
import opts from '../options'
import pckg from '../../package.json'
import project from '../../project.json'

const serverConfig = {
    server: {
      baseDir: join(process.cwd(), 'static'),
      index: 'index.html',
      ghostMode: false,
      middleware: [
        modRewrite(['!\\.\\w+ /index.html [L]'])
      ]
    }
}

const config = defaults({
  notify: false,
  minify: false,
  ghostMode: false,
  browser: ['google chrome'],
  port: project.port || 3000
}, serverConfig)

gulp.task('server', ['build'], () => {
  browserSync(config)
  if (opts.watch) {
    watch(['./static/**/*.*', '!./static/**/*.css', '!./static/**/*.svg'], browserSync.reload)
  }
})
