const express = require('express');
const http = require('http');
const request = require('supertest');
const rio = require('../src/index');

const app = express();
const server = http.createServer(app);

const limit = '300KB';
app.use(express.json({ limit }));
app.use(express.urlencoded({ limit, extended: true, parameterLimit: 50000 }));

const A = new rio.Argument('a', rio.ArgumentType.Integer, true);
const B = new rio.Argument('b', rio.ArgumentType.Integer, true);
const C = new rio.Argument('c', rio.ArgumentType.String, true);
const D = new rio.Argument('d', rio.ArgumentType.Float, true);
const E = new rio.Argument('e', rio.ArgumentType.Array, true);
const F = new rio.Argument('f', rio.ArgumentType.Boolean, true);
const G = new rio.Argument('g', rio.ArgumentType.Map, true);
const H = new rio.Argument('h', new rio.ArgumentType('nothing'), false);
const I = new rio.Argument('i', new rio.ArgumentType('nothing2'), false);

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

afterEach(async () => {
  await server.close();
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(async () => {
    await server.close();
    resolve();
  }, 500));
});

describe('Using rio.get and rio.put', () => {
  test('Checking endpoints', async () => {
    const routes = rio.utils.getEndpoints(app);
    expect(routes.length).toBe(3);
  });

  test('Get', async () => {
    const res = await request(app)
      .get('/sum?a=1&b=2');
    expect(res.statusCode).toEqual(200);
    const { text } = res;
    const { result } = JSON.parse(text);
    expect(result).toEqual(3);
  });

  test('Post, with arguments', async () => {
    const res = await request(app)
      .post('/add')
      .send({
        a: 1,
        b: 2,
      });
    expect(res.statusCode).toEqual(200);
    const { text } = res;
    const { result } = JSON.parse(text);
    expect(result).toEqual(3);
  });

  test('Post, without arguments', async () => {
    const res = await request(app)
      .post('/add')
      .send({
        a: 1,
      });
    expect(res.statusCode).toEqual(403);
    const { text } = res;
    const { error } = JSON.parse(text);
    expect(error).toEqual('Missing integer argument b');
  });

  test('Post, with wrong type arguments', async () => {
    const res = await request(app)
      .post('/add')
      .send({
        a: 1,
        b: 'A',
      });
    expect(res.statusCode).toEqual(403);
    const { text } = res;
    const { error } = JSON.parse(text);
    expect(error).toEqual('Argument b was not of the specified type integer');
  });

  test('Validating all types', async () => {
    const res = await request(app)
      .post('/valids')
      .send({
        a: 1,
        b: 2,
        c: 'A',
        d: 1.2,
        e: [],
        f: true,
        g: {},
        h: '123',
      });
    expect(res.statusCode).toEqual(200);
    const { text } = res;
    const { result } = JSON.parse(text);
    expect(result).toEqual(8);
  });
});

describe('Type formatters', () => {
  test('String formatter', () => {
    let formatted = rio.format.String(1.23);
    expect(formatted).toBe('1.23');

    formatted = rio.format.String(null);
    expect(formatted).toBe(null);

    formatted = rio.format.String(undefined);
    expect(formatted).toBe(null);
  });

  test('Integer formatter', () => {
    let formatted = rio.format.Int(1.23);
    expect(formatted).toBe(1);

    formatted = rio.format.Int('5');
    expect(formatted).toBe(5);

    formatted = rio.format.Int(75);
    expect(formatted).toBe(75);

    formatted = rio.format.Int(false);
    expect(formatted).toBe(null);

    formatted = rio.format.Int('ABC');
    expect(formatted).toBe(null);
  });
});
