const express = require('express');
const http = require('http');
const rio = require('./src/index');

const app = express();
const server = http.createServer(app);

const { rInt } = rio;

rio.init(app, 'RIO Example API');

const limit = '300KB';
app.use(express.json({ limit }));
app.use(express.urlencoded({ limit, extended: true, parameterLimit: 50000 }));

rio.get('/hi', (req, res) => {
  res.status(200).send('Hi!');
});

rio.get('/', (req, res) => {
  const result = JSON.stringify({ result: 'Hello, world' });
  res.status(200).send(result);
},
[],
'Hello, world endpoint. No functionality');

rio.get('/sum', (req, res) => {
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

rio.post('/makeSum', (req, res) => {
  let { a, b } = req.body;
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

if (rio.cli !== true) {
  const port = 3000;
  server.listen(port, () => {
    /* istanbul ignore next */
    console.log(`Serving on port ${port}`);
  });
}

module.exports = {
  app,
  server,
};
