import Handler from './Handler.mjs'
import types from './types.mjs'
const ERR_MESSAGE_ON_DEFAULT = '\'defaultValue\' must be an array'
const TYPE_MESSAGE = 'must be an array'

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
  throw new Error('wrong type')
}

export default Handler(isValid, Parser, ERR_MESSAGE_ON_DEFAULT, TYPE_MESSAGE)
