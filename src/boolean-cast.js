import types from './types.js'
const envs = process.env

function isValid (theValue) {
  const isType = types(theValue) === types.boolean
  return isType
}

function parseBool (value) {
  if (value === 'true') return true
  if (value === 'false') return false
  if (value === '') return false

  return 'wrong type'
}

export default (key, defaultValue) => {
  if (defaultValue !== undefined && !isValid(defaultValue)) throw new Error('\'defaultValue\' must be a boolean')

  if (!Object.prototype.hasOwnProperty.call(envs, key)) {
    if (defaultValue === undefined) throw new Error(`Missing ${key} on 'process.env' and a default value was not provided`)
    if (!isValid(defaultValue)) throw new Error('\'defaultValue\' must be a boolean')
    else return defaultValue
  }

  const value = envs[key]
  const parsed = parseBool(value)
  if (parsed === 'wrong type') throw new Error(`${key} must be a boolean`)
  if (value !== undefined && isValid(parsed)) return parsed
  if (value === undefined && isValid(defaultValue)) return defaultValue

  throw new Error(`${key} must be a boolean or default value was ether not provided or is not a boolean`)
}
