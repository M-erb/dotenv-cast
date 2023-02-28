import types from './types.js'
const envs = process.env

export default (key, defaultValue) => {
  if (defaultValue !== undefined && (types(defaultValue) !== types.string)) throw new Error('\'defaultValue\' must be a string')

  if (!Object.prototype.hasOwnProperty.call(envs, key)) {
    if (defaultValue === undefined) throw new Error(`Missing ${key} on 'process.env' and a default value was not provided`)
    else return defaultValue
  }

  const value = envs[key]
  return value === '' && defaultValue !== undefined ? defaultValue : value
}
