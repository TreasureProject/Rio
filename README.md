# Rio
Automatic Express API argument checker and README generator

[![Actions Status](https://github.com/RyuGames/Rio/workflows/Tests/badge.svg)](https://github.com/RyuGames/Rio/actions)
[![Actions Status](https://github.com/RyuGames/Rio/workflows/Linter/badge.svg)](https://github.com/RyuGames/Rio/actions)
[![codecov](https://codecov.io/gh/RyuGames/Rio/branch/main/graph/badge.svg?token=V2HH92MN1A)](https://codecov.io/gh/RyuGames/Rio)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

### Summary
Rio has two main purposes:
1. It allows you to specify arguments for an endpoint and automatically checks for them calling the endpoint.
2. Automatically generates an API README of those endpoints.

## Usage

### Converting Express endpoint to Rio endpoint:
Here is an example Express API endpoint that takes no arguments and returns the string `"Hello, world"`:

```javascript
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello, world');
});
```

The corresponding Rio endpoint looks like this:
```javascript
const rio = require('rio-express');

const app = express();
rio.init(app);

rio.get('/', (req, res) => {
  res.status(200).send('Hello, world');
}, [], 'Hello, world endpoint. No functionality');
```

The key differences are:
- Initializing rio with the express application
- Changing `app` to `rio`
- Adding an empty array for the expected arguments, after the callback
- Adding an optional description string, after the arguments array

### More complicated usage
Here is an implementation of an API used to sum two integer values:

```javascript
const rio = require('rio-express');

const app = express();
rio.init(app);

const { RequiredInteger } = rio;

const A = RequiredInteger('a', 'A number to be added');
const B = RequiredInteger('b', 'Another number to be added');

rio.get(app, '/sum', (req, res) => {
  let { a, b } = req.query;
  a = parseInt(a, 10);
  b = parseInt(b, 10);
  const result = JSON.stringify({ result: a + b });
  res.status(200).send(result);
}, [A, B], 'Adds two numbers together');
```

Initialize arguments with:
- The expected name of the variable
- An optional description

They are then passed into the `rio.get` or `rio.post` functions. If the request to the endpoint is missing either an integer value for `a` or `b`, then the endpoint will automatically return an error 403, without calling the callback.

### Argument Optionality
Initializers begin with the word `'Required'` or `'Optional'` and are followed by the type.

### Argument Types
Rio currently supports the following types:
- String (`RequiredString` or `OptionalString`)
- Integer (`RequiredInteger` or `OptionalInteger`)
- Float (`RequiredFloat` or `OptionalFloat`)
- Boolean (`RequiredBoolean` or `OptionalBoolean`)
- Array (`RequiredArray` or `OptionalArray`)
- Map (`RequiredMap` or `OptionalMap`)

## The Rio CLI

### Installation Guide
Install CLI with:
```bash
npm i -g ./
```

### Using the CLI to generate a README
Use the CLI command to generate API docs with:
```bash
rio init <path-to-api.js>
```
Omitting the path will default it to `./api.js`

## Example API Docs
You can view an example README [here](API-README.md) and the corresponding server code is available [here](api.js). Also can be found here:
