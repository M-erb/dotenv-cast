export default function () {
  // Alll values should be start as strings due to how dotenv works

  // STRINGS
  process.env.STRING = 'This is a string'
  process.env.STRING_2 = 'huCP1pH+spEZC/RElglVOxSeCt23/leABIasRiUGRxhkWKpcaWgIWHFdRqKCLR/ZMLG19oCPj4qj8e1Der/0cg=='
  process.env.STRING_EMPTY = ''

  // INTEGERS
  process.env.INT = '33'
  process.env.INT_EMPTY = ''

  // FLOATS
  process.env.FLOAT = '22.505000005'
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
  process.env.ARRAY_EMPTY = ''

  // DATES
  const aDate = new Date('1900/01/01')
  const dateStr = aDate.toString()
  process.env.DATE = '2018/01/01'
  process.env.DATE_2 = dateStr
  process.env.DATE_EMPTY = ''
}
