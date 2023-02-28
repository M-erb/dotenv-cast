import string from './string-cast.js'
import num from './number-cast.js'
import int from './integer-cast.js'
import float from './float-cast.js'
import bool from './boolean-cast.js'
import json from './json-cast.js'
import array from './array-cast.js'
import date from './date-cast.js'

const utils = {
  string,
  num,
  int,
  float,
  bool,
  json,
  array,
  date
}

const env = Object.assign(string, utils)

export default env
