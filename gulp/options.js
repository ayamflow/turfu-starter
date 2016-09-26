import minimist from 'minimist'
import defaults from 'defaults'

let options = defaults(process.argv.slice(2), {
  env: 'dev',
  debug: true,
  watch: true,
  minify: false
})

if (options.env != 'dev') {
  options.watch = false
  options.debug = false
  options.minify = true
}

export default options