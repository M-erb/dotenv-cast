# dotenv-cast

Dead simple functional dotenv varaible type caster. No dependencies. Designed to be used with [dotenv](https://github.com/motdotla/dotenv) but under the hood it just looks for properties on the `process.env` object. I really liked the way the Strapi headless CMS project casted env types, so this is inspired from that.

## Install

```bash
npm i dotenv-cast
```

## Usage

You would use `dotenv` as you normally would and define your variables in a `.env` file:

```properties
NODE_ENV=production

SOME_API_KEY=hC1pH+spZC/RElVOxSeCt23/leAIascWgqKCLR/Z19Pj4qjeDer/0cg==

ENABLE_FEATURE_A=true
```

Then import this module you want to cast `env` varaibles in and cast away! Supports esm `import` and commonjs `require()` syntax using rollup.

```javascript
import env from 'dotenv-cast'

// results based on above .env example, 2nd argument is a default value
env('NODE_ENV', 'development') // returns <string> 'production'
env.bool('ENABLE_FEATURE_A') // returns <boolean> true
```

## Supported types:
- [String](#string)
- [Number](#number)
- [Integer](#integer)
- [Float](#float)
- [Boolean](#boolean)
- [JSON](#json)
- [Array](#array)
- [Dates](#dates)

Overview:

```javascript
// Returns the env if defined without casting it or
// returns the default if provided and is a string
env.num('ENV_VAR', 'development')
env.num('ENV_VAR', 's3cre7_k3y')

// Cast to number (using parseInt)
// Can be an integer or floating point number
env.num('ENV_VAR', 0)
env.num('ENV_VAR', 23.55)

// Cast to integer (using parseInt)
env.int('ENV_VAR', 22)

// Cast to float (using parseFloat)
env.float('ENV_VAR', 3.14)

// Cast to boolean (check if the value is equal to 'true')
env.bool('ENV_VAR', true)

// Cast to JS object (using JSON.parse)
env.json('ENV_VAR', { key: 'value' })

// Cast to array (syntax: ENV_VAR=[value1, value2, value3] || ENV_VAR=["value1", "value2", "value3"])
env.array('ENV_VAR', [1, 2, 3])

// Cast to date (using new Date(value))
env.date('ENV_VAR', new Date())
```

### String
Returns the env if defined without casting it or returns the default if provided and is a string.

Throws if:
- 'ENV_VAR' is not found AND a default is not provided
- default is not a string if provided

```javascript
env('ENV_VAR', 'default')
env.string('ENV_VAR', 'default') // same as env()
```

### Number
Returns a general number, can be an integer or a floating point. Casts using `Number.parseFloat()`. Can be left blank in `.env` file, but a default value is required then.

Throws if:
- 'ENV_VAR' is not found AND a default is not provided
- 'ENV_VAR' is not a number (Integer or Float)
- default is not a number (Integer or Float) if provided

```javascript
env.num('ENV_VAR', 0)
env.num('ENV_VAR', 25.78)
env.num('PORT', 3030)
```

### Integer
Returns an integer. Casts using `Number.parseInt()`. Can be left blank in `.env` file, but a default value is required then.

Throws if:
- 'ENV_VAR' is not found AND a default is not provided
- 'ENV_VAR' is not an integer
- default is not an integer if provided

```javascript
env.int('ENV_VAR', 22)
```

### Float
Returns a floating point number. Casts using `Number.parseFloat()`. Can be left blank in `.env` file, but a default value is required then.

Throws if:
- 'ENV_VAR' is not found AND a default is not provided
- 'ENV_VAR' is not a floating point number
- default is not a floating point number if provided

```javascript
env.float('ENV_VAR', 3.14)
```

### Boolean
Returns a boolean value of `true` or `false`. Can be left blank in `.env` file, but a default value is required then.

Throws if:
- 'ENV_VAR' is not found AND a default is not provided
- 'ENV_VAR' is not an accepted boolean
- default is not an accepted boolean

An 'accepted boolean' is 'true', 'false', or empty. Examples below:

```properties
BOOL_VALUE=true
BOOL_VALUE=false

# will case to 'false'
BOOL_VALUE=
```

Usage:
```javascript
env.bool('ENV_VAR', true)
env.bool('ENV_VAR', false)
```

### JSON
Returns a JS object using `JSON.parse`. Can be left blank in `.env` file, but a default value is required then.

Throws if:
- 'ENV_VAR' is not found AND a default is not provided
- 'ENV_VAR' is not valid JSON
- default is not valid JSON

```javascript
env.json('ENV_VAR', { key: 'value' })
```

### Array
Returns an Array. Can be left blank in `.env` file, but a default value is required then.

Throws if:
- 'ENV_VAR' is not found AND a default is not provided
- 'ENV_VAR' is not an array
- default is not an array

`.env` accepted array examples:
```properties
ENV_VAR=[value1, value2, value3]
ENV_VAR=value1,value2,value3
ENV_VAR="value1","value2","value3" # node, this will leave all values with '"' around them. ex: ['"value1"'','"value2"'','"value3"']
```

usage:
```javascript
env.array('ENV_VAR', [1, 2, 3])
```

### Dates
Returns a js Date using `new Date()`. Can be left blank in `.env` file, but a default value is required then.

Throws if:
- 'ENV_VAR' is not found AND a default is not provided
- 'ENV_VAR' is not a js Date
- default is not a js Date

```javascript
env.date('ENV_VAR', new Date())
```

## NOTES:

- When a default is provided, all methods will throw if the default is not the corresponding type to their method. This is regardless of if the default is used or not. Again, only happens if a default is provided.

- Due to how `process.env` works in node.js all properties are strings or are converted into strings. From node.js docs: "Assigning a property on process.env will implicitly convert the value to a string..." [see node.js process docs for more](https://nodejs.org/api/process.html#processenv). Therefore it is impossible to reliably try and `throw` if `env.string('ENV_VAR')` is `'34'` or '{}' as those are valid strings. I do not want to go down the road of trying to define for the community what is or isn't a proper 'string'. When using the `env.string('ENV_VAR')` or `env('ENV_VAR')` it is up to the developer to check if it is actually supposed to be a string or not.
