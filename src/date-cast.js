import Handler from './Handler.js'
import types from './types.js'
const ERR_MESSAGE_ON_DEFAULT = '\'defaultValue\' must be a date'
const TYPE_MESSAGE = 'must be a date'

function isValid (theValue) {
  const isType = types(theValue) === types.date
  const isNotNaN = !isNaN(theValue)
  return isType && isNotNaN
}

function Parser (value) {
  const result = new Date(value)

  return result
}

export default Handler(isValid, Parser, ERR_MESSAGE_ON_DEFAULT, TYPE_MESSAGE)
