const envs = process.env

function env (key, defaultValue = undefined) {
  if (!Object.prototype.hasOwnProperty.call(envs, key)) return defaultValue
  const value = envs[key]
  return value !== '' ? value : defaultValue
}

const utils = {
  int (key, defaultValue) {
    if (!Object.prototype.hasOwnProperty.call(envs, key)) return defaultValue

    const value = envs[key]
    return parseInt(value, 10)
  },

  float (key, defaultValue) {
    if (!Object.prototype.hasOwnProperty.call(envs, key)) return defaultValue

    const value = envs[key]
    return parseFloat(value)
  },

  bool (key, defaultValue) {
    if (!Object.prototype.hasOwnProperty.call(envs, key)) return defaultValue

    const value = envs[key]
    return value === 'true'
  },

  json (key, defaultValue) {
    if (!Object.prototype.hasOwnProperty.call(envs, key)) return defaultValue

    const value = envs[key]
    try {
      return JSON.parse(value)
    } catch (error) {
      throw new Error(`Invalid json environment variable ${key}: ${error.message}`)
    }
  },

  array (key, defaultValue) {
    if (!Object.prototype.hasOwnProperty.call(envs, key)) return defaultValue

    let value = envs[key]

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.substring(1, value.length - 1)
    }

    return value.split(',').map(v => {
      return v.trim()
    })
  },

  date (key, defaultValue) {
    if (!Object.prototype.hasOwnProperty.call(envs, key)) return defaultValue
    if (envs[key] === '') throw new Error('Invalid date string, cannot be empty string.')

    const value = envs[key]
    return new Date(value)
  }
}

Object.assign(env, utils)

export default env
