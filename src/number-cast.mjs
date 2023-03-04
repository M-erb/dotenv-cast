import Handler from './Handler.mjs'
import types from './types.mjs'
const ERR_MESSAGE_ON_DEFAULT = '\'defaultValue\' must be a number'
const TYPE_MESSAGE = 'must be a number'

function isValid (theValue) {
  const isType = types(theValue) === types.number
  const isNotNaN = !isNaN(theValue)
  return isType && isNotNaN
}

function Parser (value) {
  const result = Number.parseFloat(value)
  if (isValid(result)) return result

  throw new Error('wrong type')
}

export default Handler(isValid, Parser, ERR_MESSAGE_ON_DEFAULT, TYPE_MESSAGE)
