import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

const commonConfig = {
  input: 'src/index.js',
  output: {
    name: 'dotenvCast',
    sourcemap: true
  },
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime'
    }),
    commonjs()
  ]
}

// ESM config
const esmConfig = Object.assign({}, commonConfig)
esmConfig.output = Object.assign({}, commonConfig.output, {
  file: 'dist/mjs/dotenvCast.js',
  format: 'esm'
})

// ESM prod config
const esmProdConfig = Object.assign({}, esmConfig)
esmProdConfig.output = Object.assign({}, esmConfig.output, {
  file: 'dist/mjs/dotenvCast.min.js',
  sourcemap: false
})
esmProdConfig.plugins = [
  ...esmConfig.plugins,
  terser()
]

// UMD config
const umdConfig = Object.assign({}, commonConfig)
umdConfig.output = Object.assign({}, commonConfig.output, {
  file: 'dist/umd/dotenvCast.js',
  format: 'umd'
})
umdConfig.plugins = [
  ...commonConfig.plugins
]

// Production config
const umdProdConfig = Object.assign({}, umdConfig)
umdProdConfig.output = Object.assign({}, umdConfig.output, {
  file: 'dist/umd/dotenvCast.min.js',
  sourcemap: false
})
umdProdConfig.plugins = [
  ...umdConfig.plugins,
  terser()
]

const configurations = [
  esmConfig,
  esmProdConfig,
  umdConfig,
  umdProdConfig
]

export default configurations
