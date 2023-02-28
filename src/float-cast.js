import types from './types.js'
const envs = process.env

function isValid (theValue) {
  const isType = types(theValue) === types.number
  const isNotNaN = !isNaN(theValue)
  const isAFloat = !Number.isInteger(theValue)
  return isType && isNotNaN && isAFloat
}

export default (key, defaultValue) => {
  if (defaultValue !== undefined && !isValid(defaultValue)) throw new Error('\'defaultValue\' must be a float')

  if (!Object.prototype.hasOwnProperty.call(envs, key)) {
    if (defaultValue === undefined) throw new Error(`Missing ${key} on 'process.env' and a default value was not provided`)
    if (!isValid(defaultValue)) throw new Error('\'defaultValue\' must be a float')
    else return defaultValue
  }

  const value = envs[key]
  const parsed = Number.parseFloat(value)
  if (value !== undefined && isValid(parsed)) return parsed
  if ((value === '' || value === undefined) && isValid(defaultValue)) return defaultValue

  throw new Error(`${key} must be a float and default value was not provided or is not a float`)
}
