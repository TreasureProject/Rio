const express = require('express');
const http = require('http');
const rio = require('./src/index');

const app = express();
const server = http.createServer(app);

const limit = '300KB';
app.use(express.json({ limit }));
app.use(express.urlencoded({ limit, extended: true, parameterLimit: 50000 }));

const A = new rio.Argument('a', rio.ArgumentType.Integer, true, 'A number to be added');
const B = new rio.Argument('b', rio.ArgumentType.Integer, true, 'Another number to be added');

rio.get(app, '/sum', [A, B], (req, res) => {
  let { a, b } = req.query;
  a = parseInt(a, 10);
  b = parseInt(b, 10);
  const result = JSON.stringify({ result: a + b });
  res.status(200).send(result);
});

if (rio.cli !== true) {
  const port = 3000;
  server.listen(port, () => {
    console.log(`Serving on port ${port}`);
  });
}

module.exports = {
  app,
  server,
};
