import Handler from './Handler.mjs'
import types from './types.mjs'
const ERR_MESSAGE_ON_DEFAULT = '\'defaultValue\' must be a boolean'
const TYPE_MESSAGE = 'must be a boolean'

function isValid (theValue) {
  const isType = types(theValue) === types.boolean
  return isType
}

function Parser (value) {
  if (value === 'true') return true
  if (value === 'false') return false

  throw new Error('wrong type')
}

export default Handler(isValid, Parser, ERR_MESSAGE_ON_DEFAULT, TYPE_MESSAGE)
