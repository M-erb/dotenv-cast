import string from './string-cast.mjs'
import num from './number-cast.mjs'
import int from './integer-cast.mjs'
import float from './float-cast.mjs'
import bool from './boolean-cast.mjs'
import json from './json-cast.mjs'
import array from './array-cast.mjs'
import date from './date-cast.mjs'

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
