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
// js
env('ENV_VAR', 'default')
env.string('ENV_VAR', 'default') // same as env()
```

### Number
Returns a general number, can be an integer or a floating point. Casts using `Number.parseFloat()`. Can be left blank in `.env` file, but a default value is required then.

Throws if:
- 'ENV_VAR' is not found AND a default is not provided
- 'ENV_VAR' is not a number (Integer or Float)
- default is not a number (Integer or Float) if provided

```properties
ENV_VAR=193
# or
ENV_VAR=23.678
```

```javascript
// js
env.num('ENV_VAR', 0)
env.num('ENV_VAR', 25.78)
env.num('PORT', 3030)
```

### Integer
Returns an integer. Casts using `Number.parseInt()`. Can be left blank in `.env` file, but a default value is required then.

Throws if:
- 'ENV_VAR' is not found AND a default is not provided
- 'ENV_VAR' is not an integer
- default is not an integer

```properties
# .env file
ENV_VAR=193
```

```javascript
// js
env.int('ENV_VAR', 22)
```

### Float
Returns a floating point number. Casts using `Number.parseFloat()`. Can be left blank in `.env` file, but a default value is required then.

Throws if:
- 'ENV_VAR' is not found AND a default is not provided
- 'ENV_VAR' is not a floating point number
- default is not a floating point number

```properties
# .env file
ENV_VAR=55.555
```

```javascript
// js
env.float('ENV_VAR', 3.14)
```

### Boolean
Returns a boolean value of `true` or `false`. Can be left blank in `.env` file, but a default value is required then.

Throws if:
- 'ENV_VAR' is not found AND a default is not provided
- 'ENV_VAR' is not an accepted boolean (true or false only)
- default is not a boolean

An 'accepted boolean' is 'true', 'false', or empty. Examples below:

```properties
# .env file
ENV_VAR=true
ENV_VAR=false

# this will throw if no default is provided
ENV_VAR=
```

Usage:
```javascript
// js
env.bool('ENV_VAR', true)
env.bool('ENV_VAR', false)
```

### JSON
Returns a JS object using `JSON.parse`. Can be left blank in `.env` file, but a default value is required then.

Throws if:
- 'ENV_VAR' is not found AND a default is not provided
- 'ENV_VAR' is not valid JSON
- 'ENV_VAR' parses to something other than a JS object
- default is not valid JSON

```properties
# .env file
ENV_VAR={"name": "some property value"}
ENV_VAR={"config": {"host": "localhost"}}

# this will throw as it will not parse to a js object
ENV_VAR=33
```

```javascript
// js
env.json('ENV_VAR', { key: 'value' })
```

### Array
Returns an Array of strings. If an array of other types is needed use the JSON cast, but note that it needs to be put into an object "`{}`". Can be left blank in `.env` file, but a default value is required then.

Throws if:
- 'ENV_VAR' is not found AND a default is not provided
- 'ENV_VAR' is not an array
- default is not an array

`.env` accepted array examples:

```properties
# .env file
ENV_VAR=[value1, value2, value3]
ENV_VAR=value1,value2,value3

# NOTE: below will leave all values with '"' around them. ex: ['"value1"'','"value2"'','"value3"']
ENV_VAR="value1","value2","value3"
# So unless those quotes are needed in the strings, dont add them.
```

usage:
```javascript
// js
env.array('ENV_VAR', [1, 2, 3])
```

### Dates
Returns a js Date using `new Date()`. This only parses a string to a js date. If more date support is needed I suggest using [date-fns](https://github.com/date-fns/date-fns) - [date-fns doscs](https://date-fns.org/). Can be left blank in `.env` file, but a default value is required then.

Throws if:
- 'ENV_VAR' is not found AND a default is not provided
- 'ENV_VAR' cannot parse to a valid js Date
- default is not a js Date

```properties
# .env file
ENV_VAR=December 17, 1995 03:24:00
ENV_VAR=1995-12-17T03:24:00
ENV_VAR=02/04/2022

# this will throw as it will not parse to a valid Js Date
ENV_VAR=02-04-2022
```

```javascript
// js
env.date('ENV_VAR', new Date())
```

## NOTES:

- When a default is provided, all methods will throw if the default is not the corresponding type to their method. This is regardless of if the default is used or not. Again, only happens if a default is provided.

- Due to how `process.env` works in node.js all properties are strings or are converted into strings. From node.js docs: "Assigning a property on process.env will implicitly convert the value to a string..." [see node.js process docs for more](https://nodejs.org/api/process.html#processenv). Therefore it is impossible to reliably try and `throw` if `env.string('ENV_VAR')` is `'34'` or '{}' as those are valid strings. I do not want to go down the road of trying to define for the community what is or isn't a proper 'string'. When using the `env.string('ENV_VAR')` or `env('ENV_VAR')` it is up to the developer to check if it is actually supposed to be a string or not.
