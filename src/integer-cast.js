import types from './types.js'
const envs = process.env
const ERR_MESSAGE_ON_DEFAULT = '\'defaultValue\' must be an integer'

function isValid (theValue) {
  const isType = types(theValue) === types.number
  const isNotNaN = !isNaN(theValue)
  const isAnInteger = Number.isInteger(theValue)
  return isType && isNotNaN && isAnInteger
}

function Parser (value) {
  const result = Number.parseFloat(value)
  if (isValid(result)) return result

  throw new Error('wrong type')
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
    const parsed = Parser(value)
    return parsed
  } catch (error) {
    throw new Error(`${key} must be an integer`)
  }
}
