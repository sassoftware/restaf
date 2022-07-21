import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'

import pkg from './package.json'
let name = 'restafedit';
export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named'
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named'
    },
    {
      file: pkg.browser,
      format: 'umd',
      exports: 'named',
      name: name
    }
  ],
  external: [
    'restaf',
    'restaflib'
  ],
  plugins: [
    postcss({
      modules: true
    }),
    babel({
      exclude: 'node_modules/**'
    
    }),
    resolve(),
    commonjs()
  ]
}