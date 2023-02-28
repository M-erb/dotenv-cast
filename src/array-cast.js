import types from './types.js'
const envs = process.env
const ERR_MESSAGE_ON_DEFAULT = '\'defaultValue\' must be an array'

function isValid (theValue) {
  const isType = types(theValue) === types.array
  const isArray = Array.isArray(theValue)
  return isType && isArray
}

function Parser (value) {
  if (value.startsWith('[') && value.endsWith(']')) {
    value = value.substring(1, value.length - 1)
  }

  const result = value.split(',').map(item => item.trim())

  if (isValid(result)) return result

  // (key, defaultValue) {
  //   let value = envs[key]
  //   if (value.startsWith('[') && value.endsWith(']')) {
  //     value = value.substring(1, value.length - 1)
  //   }
  //   return value.split(',').map(v => {
  //     return v.trim()
  //   })
  // }

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
    throw new Error(`${key} must be an array`)
  }
}
