import types from './types.js'
const envs = process.env

function isValid (theValue) {
  const isNumType = types(theValue) === types.number
  const isNotNaN = !isNaN(theValue)
  const isAnInteger = Number.isInteger(theValue)
  return isNumType && isNotNaN && isAnInteger
}

export default (key, defaultValue) => {
  if (defaultValue !== undefined && !isValid(defaultValue)) throw new Error('\'defaultValue\' must be an integer')

  if (!Object.prototype.hasOwnProperty.call(envs, key)) {
    if (defaultValue === undefined) throw new Error(`Missing ${key} on 'process.env' and a default value was not provided`)
    if (!isValid(defaultValue)) throw new Error('\'defaultValue\' must be an integer')
    else return defaultValue
  }

  const value = envs[key]
  const parsed = Number.parseFloat(value)
  if (value !== undefined && isValid(parsed)) return parsed
  if ((value === '' || value === undefined) && isValid(defaultValue)) return defaultValue

  throw new Error(`${key} must be an integer and default value was not provided or is not an integer`)
}
