const envs = process.env

export default (isValid, Parser, ERR_MESSAGE_ON_DEFAULT, TYPE_MESSAGE) => {
  return (key, defaultValue) => {
    if (defaultValue !== undefined && !isValid(defaultValue)) throw new Error(ERR_MESSAGE_ON_DEFAULT)

    if (!Object.prototype.hasOwnProperty.call(envs, key)) {
      if (defaultValue === undefined) throw new Error(`Missing ${key} on 'process.env' and a default value was not provided`)
      if (!isValid(defaultValue)) throw new Error(ERR_MESSAGE_ON_DEFAULT)
      else return defaultValue
    }

    const value = envs[key]
    if (value === '') {
      if (!isValid(defaultValue)) throw new Error(ERR_MESSAGE_ON_DEFAULT)
      return defaultValue
    }

    try {
      const parsed = Parser(value)
      return parsed
    } catch (error) {
      throw new Error(`${key} ${TYPE_MESSAGE}`)
    }
  }
}
