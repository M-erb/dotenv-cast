/* eslint-env jest */

import env from '../src/main.mjs'

// Alll values should be start as strings due to how `process.env` works in nodejs

// STRINGS
process.env.STRING = 'This is a string'
process.env.STRING_2 = 'huCP1pH+spEZC/RElglVOxSeCt23/leABIasRiUGRxhkWKpcaWgIWHFdRqKCLR/ZMLG19oCPj4qj8e1Der/0cg=='
process.env.STRING_EMPTY = ''

// NUMBERS
process.env.NUM = '33'
process.env.NUM_FLOAT = '56.89'
process.env.NUM_ZERO = '0'
process.env.NUM_EMPTY = ''

// INTEGERS
process.env.INT = '33'
process.env.INT_ZERO = '0'
process.env.INT_EMPTY = ''

// FLOATS
process.env.FLOAT = '22.505000005'
process.env.FLOAT_ZERO = '0.0'
process.env.FLOAT_EMPTY = ''

// BOOLEANS
process.env.BOOL_TRUE = 'true'
process.env.BOOL_FALSE = 'false'
process.env.BOOL_EMPTY = ''

// JSON
const basicJson = `{
  "number": 5,
  "person": {
    "name": "Jimmy",
    "likes": [
      "reading",
      "long walks",
      "beaches"
    ]
  }
}`
process.env.JSON = basicJson
process.env.JSON_EMPTY = ''
process.env.JSON_EMPTY_2 = '{}'

// ARRAYS
process.env.ARRAY = '[value1,value2,value3]'
process.env.ARRAY_2 = '["value1","value2","value3"]'
process.env.ARRAY_3 = 'value1,value2,value3'
process.env.ARRAY_4 = '"value1","value2","value3"'
process.env.ARRAY_EMPTY = ''

// DATES
const aDate = new Date('1900/01/01')
const dateStr = aDate.toString()
process.env.DATE = '2018/01/01'
process.env.DATE_2 = dateStr
process.env.DATE_EMPTY = ''

// -=-=-=-=-=-=-=-

test('Cast Strings', () => {
  // env exists and no default
  expect(env('STRING')).toBe('This is a string')

  // env exists and a default provided
  expect(env('STRING', 'hey look!')).toBe('This is a string')

  // string that is a number no default
  expect(env('NUM')).toBe('33')

  // env exists and wrong default is provided
  expect(() => env('STRING', ['hey look!'])).toThrow('\'defaultValue\' must be a string')

  // does not exist and a default provided
  expect(env('STRING_NO_EXIST', 'default value')).toBe('default value')

  // does not exist and wrong default provided
  expect(() => env('STRING_NO_EXIST', ['default value'])).toThrow('\'defaultValue\' must be a string')

  // exists and default provided
  expect(env('STRING_2', 'default value')).toBe('huCP1pH+spEZC/RElglVOxSeCt23/leABIasRiUGRxhkWKpcaWgIWHFdRqKCLR/ZMLG19oCPj4qj8e1Der/0cg==')

  // does not exist and no default provided
  expect(() => env('STRING_NO_EXIST')).toThrow('on \'process.env\' and a default value was not provided')
})

test('Cast Numbers', () => {
  // regular number
  expect(env.num('NUM')).toBe(33)

  // float number
  expect(env.num('NUM_FLOAT')).toBe(56.89)

  // exists and wrong default provided
  expect(() => env.num('NUM', 'hey look!')).toThrow('\'defaultValue\' must be a number')

  // string provided
  expect(() => env.num('STRING')).toThrow('must be a number')

  // exists and is a zero
  expect(env.num('NUM_ZERO')).toBe(0)

  // no exist and default is zero
  expect(env.num('NUM_NO_EXIST', 0)).toBe(0)

  // no exist and default is an integer
  expect(env.num('NUM_NO_EXIST', 358)).toBe(358)

  // no exist and default is a float
  expect(env.num('NUM_NO_EXIST', 358.56)).toBe(358.56)

  // empty string and default is zero
  expect(env.num('NUM_EMPTY', 0)).toBe(0)

  // empty string and no default
  expect(() => env.num('NUM_EMPTY')).toThrow('\'defaultValue\' must be a number')

  // no exist and wrong default
  expect(() => env.num('NUM_NO_EXIST', [44])).toThrow('\'defaultValue\' must be a number')
})

test('Cast Integers', () => {
  // regular integer
  expect(env.int('INT')).toBe(33)

  // float number
  expect(() => env.int('NUM_FLOAT')).toThrow('must be an integer')

  // string provided
  expect(() => env.int('STRING')).toThrow('must be an integer')

  // no exist float default
  expect(() => env.int('NUM_FLOAT', 34.89)).toThrow('\'defaultValue\' must be an integer')

  // exists and wrong default provided
  expect(() => env.int('INT', 'hey look!')).toThrow('\'defaultValue\' must be an integer')

  // exists and is a zero
  expect(env.int('INT_ZERO')).toBe(0)

  // no exist and default is zero
  expect(env.int('INT_NO_EXIST', 0)).toBe(0)

  // no exist and no default
  expect(() => env.int('INT_NO_EXIST')).toThrow('on \'process.env\' and a default value was not provided')

  // empty string and default is zero
  expect(env.int('INT_EMPTY', 0)).toBe(0)

  // empty string and default is an integer
  expect(env.int('INT_EMPTY', 3994)).toBe(3994)

  // empty string and no default
  expect(() => env.int('INT_EMPTY')).toThrow('\'defaultValue\' must be an integer')

  // no exist and wrong default
  expect(() => env.int('INT_NO_EXIST', [44])).toThrow('\'defaultValue\' must be an integer')
})

test('Cast Floats', () => {
  // regular float
  expect(env.float('FLOAT')).toBe(22.505000005)

  // integer number
  expect(() => env.float('INT')).toThrow('must be a float')

  // string provided
  expect(() => env.float('STRING')).toThrow('must be a float')

  // no exist integer default
  expect(() => env.float('FLOAT_NO_EXIST', 34)).toThrow('\'defaultValue\' must be a float')

  // exists and wrong default provided
  expect(() => env.float('FLOAT', 'hey look!')).toThrow('\'defaultValue\' must be a float')

  // exists and is a zero
  expect(() => env.float('INT_ZERO')).toThrow('must be a float')

  // no exist and default is zero
  expect(() => env.float('FLOAT_NO_EXIST', 0)).toThrow('\'defaultValue\' must be a float')

  // no exist and no default
  expect(() => env.float('FLOAT_NO_EXIST')).toThrow('on \'process.env\' and a default value was not provided')

  // empty string and default is zero
  expect(() => env.float('FLOAT_EMPTY', 0)).toThrow('\'defaultValue\' must be a float')

  // empty string and default is a float
  expect(env.float('FLOAT_EMPTY', 11.49)).toBe(11.49)

  // empty string and no default
  expect(() => env.float('FLOAT_EMPTY')).toThrow('\'defaultValue\' must be a float')

  // no exist and wrong default
  expect(() => env.float('FLOAT_NO_EXIST', [44.34])).toThrow('\'defaultValue\' must be a float')
})

test('Cast Booleans', () => {
  // bool true no default
  expect(env.bool('BOOL_TRUE')).toBe(true)

  // bool true default false
  expect(env.bool('BOOL_TRUE', false)).toBe(true)

  // bool false no default
  expect(env.bool('BOOL_FALSE')).toBe(false)

  // bool false default true
  expect(env.bool('BOOL_FALSE', true)).toBe(false)

  // empty with default true
  expect(env.bool('BOOL_EMPTY', true)).toBe(true)

  // no exist no default
  expect(() => env.bool('BOOL_NO_EXIST')).toThrow('on \'process.env\' and a default value was not provided')

  // no exist with default false
  expect(env.bool('BOOL_NO_EXIST', false)).toBe(false)

  // no exist with default true
  expect(env.bool('BOOL_NO_EXIST', true)).toBe(true)

  // no exist with default not boolean
  expect(() => env.bool('BOOL_NO_EXIST', 'Not a boolean')).toThrow('\'defaultValue\' must be a boolean')

  // number
  expect(() => env.bool('NUM')).toThrow('must be a boolean')

  // string
  expect(() => env.bool('STRING')).toThrow('must be a boolean')

  // no exist default wrong type
  expect(() => env.bool('BOOL_NO_EXIST', 45)).toThrow('\'defaultValue\' must be a boolean')
})

test('Cast JSON to JS Objects', () => {
  // normal JSON
  expect(env.json('JSON')).toEqual({
    number: 5,
    person: {
      name: 'Jimmy',
      likes: [
        'reading',
        'long walks',
        'beaches'
      ]
    }
  })

  // JSON with string default
  expect(() => env.json('JSON', 'hey look!')).toThrow('\'defaultValue\' must be an object')

  // empty JSON with obj default
  expect(env.json('JSON_EMPTY', { obj: 'hey look!' })).toEqual({ obj: 'hey look!' })

  // JSON with no props and default
  expect(env.json('JSON_EMPTY_2', { obj: 'hey look!' })).toEqual({})

  // no exist with obj default
  expect(env.json('JSON_NO_EXIST', { obj: 'hey look! default' })).toEqual({ obj: 'hey look! default' })

  // not JSON with default
  expect(() => env.json('NUM', { obj: 'hey look! default' })).toThrow('is invalid JSON or did not parse to an Object')

  // not JSON with no default
  expect(() => env.json('NUM')).toThrow('is invalid JSON or did not parse to an Object')
})

test('Cast Arrays', () => {
  // an array value
  expect(env.array('ARRAY')).toEqual(['value1', 'value2', 'value3'])

  // array with default array
  expect(env.array('ARRAY', ['default_0', 'default_1'])).toEqual(['value1', 'value2', 'value3'])

  // array2 with quotes and default array
  expect(env.array('ARRAY_2', ['value1', 'value2', 'value3'])).toEqual(['"value1"', '"value2"', '"value3"'])

  // empty string with default
  expect(env.array('ARRAY_EMPTY', ['default_0', 'default_1'])).toEqual(['default_0', 'default_1'])

  // empty string no default
  expect(() => env.array('ARRAY_EMPTY')).toThrow('\'defaultValue\' must be an array')

  // no exist with default
  expect(env.array('ARRAY_NO_EXIST', ['default_0', 'default_1'])).toEqual(['default_0', 'default_1'])

  // no exist no default
  expect(() => env.array('ARRAY_NO_EXIST')).toThrow('on \'process.env\' and a default value was not provided')
})

test('Cast Dates', () => {
  const dateStr = process.env.DATE_2

  // date no default
  expect(env.date('DATE')).toEqual(new Date('2018/01/01'))

  // date with default
  expect(env.date('DATE', new Date('1900/01/01'))).toEqual(new Date('2018/01/01'))

  // date 2 with default
  expect(env.date('DATE_2', new Date('1900/01/01'))).toEqual(new Date(dateStr))

  // empty with default
  expect(env.date('DATE_EMPTY', new Date('1900/01/01'))).toEqual(new Date('1900/01/01'))

  // empty with no default
  expect(() => env.date('DATE_EMPTY')).toThrow('\'defaultValue\' must be a date')

  // no exist with default
  expect(env.date('DATE_NO_EXIST', new Date('2000/01/01'))).toEqual(new Date('2000/01/01'))

  // no exist with no default
  expect(() => env.date('DATE_NO_EXIST')).toThrow('on \'process.env\' and a default value was not provided')
})
