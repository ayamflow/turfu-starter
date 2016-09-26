'use strict'

import gulp from 'gulp'
import watch from 'gulp-watch'
import opts from '../options'
import rollup from 'rollup-stream'
import sourcemaps from 'gulp-sourcemaps'
import includePaths from 'rollup-plugin-includepaths'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import rename from 'gulp-rename'
import util from 'gulp-util'
import source from 'vinyl-source-stream'
import uglify from 'rollup-plugin-uglify'
import buffer from 'vinyl-buffer'
import html from 'rollup-plugin-html'

let plugins = [
    babel({
        exclude: 'node_modules/**',
        presets: [
           ['es2015', {'modules': false}]
        ],
        plugins: [
            'import-glob',
            'external-helpers',
            ['module-alias', [
              {'src': './src/lib', 'expose': 'lib'},
              {'src': './src/sections', 'expose': 'sections'},
              {'src': './src/components', 'expose': 'components'}
            ]]
        ]
    }),
    html({
        include: './src/**/*.html'
    }),
    nodeResolve({
        jsnext: true
    }),
    includePaths({
        paths: ['./src', './src/lib']
    }),
    commonjs()
]

if (opts.minify) plugins.push(uglify())

// "incremental" rollup cache for watch
let cache

gulp.task('scripts', (done) => {
    return rollup({
        entry: './src/index.js',
        sourceMap: true,
        format: 'iife',
        plugins: plugins
    })
    .on('bundle', (bundle) => {
        cache = bundle
    })
    .pipe(source('index.js', './src'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .on('error', util.log)
    .pipe(rename('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('static/build'))
})