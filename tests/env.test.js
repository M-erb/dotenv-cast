/* eslint-env jest */

import env from '../src/main.js'
import testEnvs from './testEnvs.js'
testEnvs()

// -=-=-=-=-=-=-=-

test('Cast Strings', () => {
  // env exists and no default
  expect(env('STRING')).toBe('This is a string')

  // env exists and a default provided
  expect(env('STRING', 'hey look!')).toBe('This is a string')

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

  // exists and is a zero
  expect(env.num('NUM_ZERO')).toBe(0)

  // no exist and default is zero
  expect(env.num('NUM_NO_EXIST', 0)).toBe(0)

  // empty string and default is zero
  expect(env.num('NUM_EMPTY', 0)).toBe(0)

  // empty string and no default
  expect(() => env.num('NUM_EMPTY')).toThrow('must be a number and default value')

  // no exist and wrong default
  expect(() => env.num('NUM_NO_EXIST', [44])).toThrow('\'defaultValue\' must be a number')
})

test('Cast Integers', () => {
  // regular integer
  expect(env.int('INT')).toBe(33)

  // float number
  expect(() => env.int('NUM_FLOAT')).toThrow('must be an integer and')

  // no exist float default
  expect(() => env.int('NUM_FLOAT', 34.89)).toThrow('\'defaultValue\' must be an integer')

  // exists and wrong default provided
  expect(() => env.int('INT', 'hey look!')).toThrow('\'defaultValue\' must be an integer')

  // exists and is a zero
  expect(env.int('INT_ZERO')).toBe(0)

  // no exist and default is zero
  expect(env.int('INT_NO_EXIST', 0)).toBe(0)

  // empty string and default is zero
  expect(env.int('INT_EMPTY', 0)).toBe(0)

  // empty string and default is an integer
  expect(env.int('INT_EMPTY', 3994)).toBe(3994)

  // empty string and no default
  expect(() => env.int('INT_EMPTY')).toThrow('must be an integer and default value')

  // no exist and wrong default
  expect(() => env.int('INT_NO_EXIST', [44])).toThrow('\'defaultValue\' must be an integer')
})

test('Cast Floats', () => {
  // regular float
  expect(env.float('FLOAT')).toBe(22.505000005)

  // integer number
  expect(() => env.float('INT')).toThrow('must be a float and default')

  // no exist integer default
  expect(() => env.float('FLOAT_NO_EXIST', 34)).toThrow('\'defaultValue\' must be a float')

  // exists and wrong default provided
  expect(() => env.float('FLOAT', 'hey look!')).toThrow('\'defaultValue\' must be a float')

  // exists and is a zero
  expect(() => env.float('INT_ZERO')).toThrow('must be a float and default')

  // no exist and default is zero
  expect(() => env.float('FLOAT_NO_EXIST', 0)).toThrow('\'defaultValue\' must be a float')

  // empty string and default is zero
  expect(() => env.float('FLOAT_EMPTY', 0)).toThrow('\'defaultValue\' must be a float')

  // empty string and default is a float
  expect(env.float('FLOAT_EMPTY', 11.49)).toBe(11.49)

  // empty string and no default
  expect(() => env.float('FLOAT_EMPTY')).toThrow('must be a float and default')

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
  expect(env.bool('BOOL_EMPTY', true)).toBe(false)

  // no exist no default
  expect(() => env.bool('BOOL_NO_EXIST')).toThrow('on \'process.env\' and a default value was not provided')

  // no exist with default false
  expect(env.bool('BOOL_NO_EXIST', false)).toBe(false)

  // no exist with default true
  expect(env.bool('BOOL_NO_EXIST', true)).toBe(true)

  // no exist with default not boolean
  expect(() => env.bool('BOOL_NO_EXIST', 'Not a boolean')).toThrow('must be a boolean and default value')

  // number
  expect(() => env.bool('NUM')).toThrow('must be a boolean')

  // no exist default wrong type
  expect(() => env.bool('BOOL_NO_EXIST', 45)).toThrow('\'defaultValue\' must be a boolean')
})

test('Cast JSON to JS Objects', () => {
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
  expect(env.json('JSON', 'hey look!')).toEqual({
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
  expect(() => env.json('JSON_EMPTY', { obj: 'hey look!' })).toThrow()
  expect(env.json('JSON_EMPTY_2', { obj: 'hey look!' })).toEqual({})
  expect(env.json('JSON_NO_EXIST', { obj: 'hey look! default' })).toEqual({ obj: 'hey look! default' })
})

test('Cast Arrays', () => {
  expect(env.array('ARRAY')).toEqual(['value1', 'value2', 'value3'])
  expect(env.array('ARRAY', ['default_0', 'default_1'])).toEqual(['value1', 'value2', 'value3'])
  expect(env.array('ARRAY_2', ['value1', 'value2', 'value3'])).toEqual(['"value1"', '"value2"', '"value3"'])
  expect(env.array('ARRAY_EMPTY', ['default_0', 'default_1'])).toEqual([''])
  expect(env.array('ARRAY_NO_EXIST', ['default_0', 'default_1'])).toEqual(['default_0', 'default_1'])
})

test('Cast Dates', () => {
  const dateStr = process.env.DATE_2

  expect(env.date('DATE')).toEqual(new Date('2018/01/01'))
  expect(env.date('DATE', new Date('1900/01/01'))).toEqual(new Date('2018/01/01'))
  expect(env.date('DATE_2', new Date('1900/01/01'))).toEqual(new Date(dateStr))
  expect(() => env.date('DATE_EMPTY', new Date('1900/01/01'))).toThrow()
  expect(env.date('DATE_NO_EXIST', new Date('2000/01/01'))).toEqual(new Date('2000/01/01'))
})
