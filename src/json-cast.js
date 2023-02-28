import types from './types.js'
const envs = process.env
const ERR_MESSAGE_ON_DEFAULT = '\'defaultValue\' must be an object'

function isValid (theValue) {
  const isType = types(theValue) === types.object
  return isType
}

export default (key, defaultValue) => {
  if (defaultValue !== undefined && !isValid(defaultValue)) throw new Error(ERR_MESSAGE_ON_DEFAULT)

  if (!Object.prototype.hasOwnProperty.call(envs, key)) {
    if (defaultValue === undefined) throw new Error(`Missing ${key} on 'process.env' and a default value was not provided`)
    if (!isValid(defaultValue)) throw new Error(ERR_MESSAGE_ON_DEFAULT)
    else return defaultValue
  }

  const value = envs[key]

  if (value === '') {
    if (!isValid(defaultValue)) throw new Error(ERR_MESSAGE_ON_DEFAULT)
    return defaultValue
  }

  try {
    const parsed = JSON.parse(value)
    if (!isValid(parsed)) throw new Error(`${key} must be an object`)
    return parsed
  } catch (error) {
    throw new Error(`${key} is invalid JSON`)
  }
}
