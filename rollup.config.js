import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import rollupCopy from 'rollup-plugin-copy'

const commonConfig = {
  input: 'src/main.mjs',
  output: {
    name: 'dotenvCast',
    sourcemap: true
  },
  plugins: [
    resolve({
      moduleDirectories: ['node_modules']
    })
  ]
}

// ESM config
const esmConfig = Object.assign({}, commonConfig)
esmConfig.output = Object.assign({}, commonConfig.output, {
  file: 'dist/mjs/dotenvCast.mjs',
  format: 'esm'
})
esmConfig.plugins.push(rollupCopy({
  targets: [
    {
      src: 'src/index.d.ts',
      dest: 'dist/typings',
      rename: 'dotenvCast.d.ts'
    }
  ]
}))

// UMD config
const umdConfig = Object.assign({}, commonConfig)
umdConfig.output = Object.assign({}, commonConfig.output, {
  file: 'dist/umd/dotenvCast.cjs',
  format: 'umd'
})
umdConfig.plugins.push(commonjs())

const configurations = [
  esmConfig,
  umdConfig
]

export default configurations
