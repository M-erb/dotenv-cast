const tester = prop => {
  return Object.prototype.toString.call(prop)
}

const library = {
  null: '[object Null]',
  undefined: '[object Undefined]',
  object: '[object Object]',
  function: '[object Function]',
  array: '[object Array]',
  string: '[object String]',
  boolean: '[object Boolean]',
  number: '[object Number]',
  date: '[object Date]'
}

const types = Object.assign(tester, library)

export default types
