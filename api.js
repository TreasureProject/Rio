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
const C = new rio.Argument('c', rio.ArgumentType.String, true);
const D = new rio.Argument('d', rio.ArgumentType.Float, true);
const E = new rio.Argument('e', rio.ArgumentType.Array, true);
const F = new rio.Argument('f', rio.ArgumentType.Boolean, true);
const G = new rio.Argument('g', rio.ArgumentType.Map, true);
const H = new rio.Argument('h', new rio.ArgumentType('nothing'), false);
const I = new rio.Argument('i', new rio.ArgumentType('nothing2'));

rio.get(app, '/sum', [A, B], (req, res) => {
  let { a, b } = req.query;
  a = parseInt(a, 10);
  b = parseInt(b, 10);
  const result = JSON.stringify({ result: a + b });
  res.status(200).send(result);
});

rio.post(app, '/add', [A, B], (req, res) => {
  let { a, b } = req.body;
  a = parseInt(a, 10);
  b = parseInt(b, 10);
  const result = JSON.stringify({ result: a + b });
  res.status(200).send(result);
});

rio.post(app, '/valids', [A, B, C, D, E, F, G, H, I], (req, res) => {
  let {
    a,
    b,
  } = req.body;
  a = parseInt(a, 10);
  b = parseInt(b, 10);

  const {
    c,
    d,
    e,
    f,
    g,
  } = req.body;

  const cString = rio.format.String(c);
  const dFloat = rio.format.Float(d);
  const eArray = rio.format.Array(e);
  const fBool = rio.format.Boolean(f);
  const gMap = rio.format.Map(g);

  let r = a + b;
  if (cString) {
    r += 1;
  }

  if (dFloat) {
    r += 1;
  }

  if (eArray) {
    r += 1;
  }

  if (fBool) {
    r += 1;
  }

  if (gMap) {
    r += 1;
  }

  const result = JSON.stringify({ result: r });
  res.status(200).send(result);
});

const port = 3000;
server.listen(port, () => {
  console.log(`Serving on port ${port}`);
});

module.exports = {
  app,
  server,
};
