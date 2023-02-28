import Handler from './Handler.js'
import types from './types.js'
const ERR_MESSAGE_ON_DEFAULT = '\'defaultValue\' must be an integer'
const TYPE_MESSAGE = 'must be an integer'

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

export default Handler(isValid, Parser, ERR_MESSAGE_ON_DEFAULT, TYPE_MESSAGE)
