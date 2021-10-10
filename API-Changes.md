## Usage Guide

### Side-by-side Express + Rio

Here is an example Express API endpoint that takes no arguments and returns the string `"Hello, world"`:

The key differences are:
- Initializing rio with the express application
- Changing `app` to `rio`
- Adding an empty array for the expected arguments, after the callback
- Adding an optional description string, after the arguments array
- Adding an optional response example


<table>    
  <tr>    
    <th>Original</th>    
    <th>Updated</th>    
  </tr>    
  <tr>    
    <td>    
      <pre>    
            const express = require('express');
            <br>
            const app = express();
            <br>
            app.get('/', (req, res) => {  
              res.status(200).send('Hello, world');  
            });
            <br>
            app.get('/sum', (req, res) => {
              let { a, b } = req.query;  
              a = parseInt(a, 10);  
              b = parseInt(b, 10);  
              const result = JSON.stringify({ result: a + b }); 
              res.status(200).send(result); 
            });
      </pre>    
    </td>    
    <td>    
      <pre>    
            const express = require('express');
            const rio = require('rio-express');
            <br>
            const app = express();
            rio.init(app);
            <br>
            app.get('/', (req, res) => {  
              res.status(200).send('Hello, world');  
            },
            [],
            'Returns the string \'Hello, world\'',
            'Hello, world');
            <br>
            app.get('/sum', (req, res) => {
              let { a, b } = req.query;  
              a = parseInt(a, 10);  
              b = parseInt(b, 10);  
              const result = JSON.stringify({ result: a + b }); 
              res.status(200).send(result); 
            },
            [
              rio.rInt('a', 'A number to be added'),  
              rio.rInt('b', 'Another number to be added'),
            ],
            'Adds two numbers together',
            { result: 2 });     
      </pre>    
    </td>    
  </tr>    
</table>

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
},
[
  A,
  B,
],
'Adds two numbers together',
{ result: 2 });
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

### Shorthand Arguments
Each initializer can also be shorted to begin with the letters `'r'` or `'o'` instead of the full words, followed by the types.

For example:
- `rStr` and `oStr`
- `rInt` and `oInt`
- `rFloat` and `oFloat`
- `rBool` and `oBool`
- `rArray` and `oArray`
- `rMap` and `oMap`

Example Usage of shorthand initializers:
```javascript
const rio = require('rio-express');

const app = express();
rio.init(app);

const { rInt } = rio;

rio.get(app, '/sum', (req, res) => {
  let { a, b } = req.query;
  a = parseInt(a, 10);
  b = parseInt(b, 10);
  const result = JSON.stringify({ result: a + b });
  res.status(200).send(result);
},
[
  rInt('a', 'A number to be added'),
  rInt('b', 'Another number to be added'),
],
'Adds two numbers together');
```
