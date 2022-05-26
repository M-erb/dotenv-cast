# dotenv-cast

Dead simple functional dotenv varaible type caster. No dependencies. Designed to be used with [dotenv](https://github.com/motdotla/dotenv) but under the hood it just looks for properties on the `process.env` object. I really liked the way the Strapi headless CMS project casted env types, so this is taken from that.

## Install

```bash
npm i dotenv-cast
```

## Usage

You would use `dotenv` as you normally would and define your variables in a `.env` file:

```dotenv
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

Types

```javascript
// Returns the env if defined without casting it
env('ENV_VAR', 'default')

// Cast to integer (using parseInt)
env.int('ENV_VAR', 0)

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

### Supported types:

* String
* Integer
* Floating point
* Boolean
* JSON --> JS Object
* Array
* JS Dates
