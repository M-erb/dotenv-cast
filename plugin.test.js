/* eslint-env jest */

import env from './src/index.js'
import testValues from './testValues.js'
testValues()

// -=-=-=-=-=-=-=-

test('Cast Strings', () => {
  expect(env('STRING')).toBe('This is a string')
  expect(env('STRING', 'hey look!')).toBe('This is a string')
  expect(env('STRING_NO_EXIST', 'default value')).toBe('default value')
  expect(env('STRING_2', 'default value')).toBe('huCP1pH+spEZC/RElglVOxSeCt23/leABIasRiUGRxhkWKpcaWgIWHFdRqKCLR/ZMLG19oCPj4qj8e1Der/0cg==')
})

test('Cast Integers', () => {
  expect(env.int('INT')).toBe(33)
  expect(env.int('INT', 'hey look!')).toBe(33)
  expect(env.int('INT_EMPTY', 12)).toBe(NaN)
  expect(env.int('INT_NO_EXIST', 12)).toBe(12)
})

test('Cast Floats', () => {
  expect(env.float('FLOAT')).toBe(22.505000005)
  expect(env.float('FLOAT', 'hey look!')).toBe(22.505000005)
  expect(env.float('FLOAT_EMPTY', 1.0000004334)).toBe(NaN)
  expect(env.float('FLOAT_NO_EXIST', 1.0000004334)).toBe(1.0000004334)
})

test('Cast Booleans', () => {
  expect(env.bool('BOOL_TRUE')).toBe(true)
  expect(env.bool('BOOL_TRUE', false)).toBe(true)
  expect(env.bool('BOOL_FALSE')).toBe(false)
  expect(env.bool('BOOL_FALSE', true)).toBe(false)
  expect(env.bool('BOOL_EMPTY', false)).toBe(false)
  expect(env.bool('BOOL_NO_EXIST', false)).toBe(false)
  expect(env.bool('BOOL_NO_EXIST', true)).toBe(true)
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
