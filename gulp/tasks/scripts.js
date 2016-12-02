import gulp from 'gulp'
import watch from 'gulp-watch'
import vinyl from 'vinyl-source-stream'
import browserify from 'browserify'
import watchify from 'watchify'
import aliasify from 'aliasify'
import envify from 'envify/custom'
import pckg from '../../package.json'
import project from '../../project.json'
import opts from '../options'

gulp.task('scripts', () => {
  let bundler = browserify({
    entries: 'src/index.js',
    cache: {},
    packageCache: {},
    fullPaths: opts.debug,
    debug: opts.debug,
    insertglobals: true // for globals like FB, YT...
  })

  if (opts.watch) {
    bundler = watchify(bundler)
    bundler.on('update', bundle)
    watch(['package.json'], bundle) // Rebuild if changing stuff in package.json (like environments)
    // watch(['src/svg/**/*.svg'], bundle)
  }

  applyTransform(bundler)

  return bundle()

  function bundle() {
    return bundler.bundle()
      .on('error', onError)
      .pipe(vinyl('main.js'))
      .pipe(gulp.dest('static/build'))
  }
})

function applyTransform(bundler) {
/*
    Pass some flags to the build

    if (App.ENV === 'dev') { ... do something in dev mode ... }
    if (App.ENV === 'live') { ... do something in live mode ... }

    Any variable in project.json will be added here
*/

  const paths = project.env[opts.env]

  bundler.transform('babelify', {
    presets: ['es2015'],
    plugins: ['transform-decorators-legacy']
  })
  bundler.transform(aliasify, pckg.aliasify)
  bundler.transform(envify({
    ENV: opts.env,
    paths: paths
  }))
}

function onError() {
    console.warn('[Error]', arguments);
}