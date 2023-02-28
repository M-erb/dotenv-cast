import string from './string-cast.js'
import num from './number-cast.js'
import int from './integer-cast.js'
import float from './float-cast.js'
import bool from './boolean-cast.js'
import json from './json-cast.js'
import array from './array-cast.js'

const envs = process.env

const utils = {
  string,
  num,
  int,
  float,
  bool,
  json,
  array,

  date (key, defaultValue) {
    if (!Object.prototype.hasOwnProperty.call(envs, key)) return defaultValue
    if (envs[key] === '') throw new Error('Invalid date string, cannot be empty string.')

    const value = envs[key]
    return new Date(value)
  }
}

const env = Object.assign(string, utils)

export default env
