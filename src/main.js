import string from './string-cast.js'
import num from './number-cast.js'
import int from './integer-cast.js'
import float from './float-cast.js'

const envs = process.env

const utils = {
  string,
  num,
  int,
  float,

  bool (key, defaultValue) {
    if (!Object.prototype.hasOwnProperty.call(envs, key)) return defaultValue

    const value = envs[key]
    return value === 'true'
  },

  json (key, defaultValue) {
    if (!Object.prototype.hasOwnProperty.call(envs, key)) return defaultValue

    const value = envs[key]
    try {
      return JSON.parse(value)
    } catch (error) {
      throw new Error(`Invalid json environment variable ${key}: ${error.message}`)
    }
  },

  array (key, defaultValue) {
    if (!Object.prototype.hasOwnProperty.call(envs, key)) return defaultValue

    let value = envs[key]

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.substring(1, value.length - 1)
    }

    return value.split(',').map(v => {
      return v.trim()
    })
  },

  date (key, defaultValue) {
    if (!Object.prototype.hasOwnProperty.call(envs, key)) return defaultValue
    if (envs[key] === '') throw new Error('Invalid date string, cannot be empty string.')

    const value = envs[key]
    return new Date(value)
  }
}

const env = Object.assign(string, utils)

export default env
