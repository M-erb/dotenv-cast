/* eslint-env jest */

import types from '../src/types.js'
const string = 'A String'
const stringEmpty = ''
const number = 12
const numberTwo = 0
const float = 12.24
const array = ['wow', { name: 'bob' }]
const arratEmpty = []
const obj = { name: 'bob' }
const objEmpty = {}
const NULL = null
const UNDEFINED = undefined
const FUNCTION = example
const arrowFunction = () => {}

function example () {}

// -=-=-=-=-=-=-=-

test('Detect data types', () => {
  expect(types(string)).toBe('[object String]')
  expect(types(stringEmpty)).toBe('[object String]')
  expect(types(number)).toBe('[object Number]')
  expect(types(numberTwo)).toBe('[object Number]')
  expect(types(float)).toBe('[object Number]')
  expect(types(array)).toBe('[object Array]')
  expect(types(arratEmpty)).toBe('[object Array]')
  expect(types(obj)).toBe('[object Object]')
  expect(types(objEmpty)).toBe('[object Object]')
  expect(types(NULL)).toBe('[object Null]')
  expect(types(UNDEFINED)).toBe('[object Undefined]')
  expect(types(FUNCTION)).toBe('[object Function]')
  expect(types(arrowFunction)).toBe('[object Function]')
})

test('Match Data Types', () => {
  expect(types(string) === types.string).toBe(true)
  expect(types(stringEmpty) === types.string).toBe(true)
  expect(types(number) === types.number).toBe(true)
  expect(types(numberTwo) === types.number).toBe(true)
  expect(types(float) === types.number).toBe(true)
  expect(types(array) === types.array).toBe(true)
  expect(types(arratEmpty) === types.array).toBe(true)
  expect(types(obj) === types.object).toBe(true)
  expect(types(objEmpty) === types.object).toBe(true)
  expect(types(NULL) === types.null).toBe(true)
  expect(types(UNDEFINED) === types.undefined).toBe(true)
  expect(types(FUNCTION) === types.function).toBe(true)
  expect(types(arrowFunction) === types.function).toBe(true)
})
