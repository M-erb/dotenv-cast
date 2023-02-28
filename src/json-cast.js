import Handler from './Handler.js'
import types from './types.js'
const ERR_MESSAGE_ON_DEFAULT = '\'defaultValue\' must be an object'
const TYPE_MESSAGE = 'is invalid JSON or did not parse to an Object'

function isValid (theValue) {
  const isType = types(theValue) === types.object
  return isType
}

function Parser (value) {
  const result = JSON.parse(value)

  if (!isValid(result)) throw new Error('wrong type')

  return result
}

export default Handler(isValid, Parser, ERR_MESSAGE_ON_DEFAULT, TYPE_MESSAGE)
