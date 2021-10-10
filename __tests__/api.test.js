const request = require('supertest');
const rio = require('../src/index');
const { app, server } = require('../api');

const {
  Integer,
  String,
  Float,
  rArray,
  Boolean,
  Map,
  ArgumentType,
} = rio;

const Nothing = new ArgumentType('nothing');

const A = Integer('a', true, 'A number to be added');
const B = Integer('b', true, 'Another number to be added');
const C = String('c', true);
const D = Float('d', true);
const E = rArray('e', true);
const F = Boolean('f', true);
const G = Map('g', true);
const H = new rio.Argument('h', Nothing, false);
const I = new rio.Argument('i', Nothing);

rio.get('/hello', (req, res) => {
  const result = JSON.stringify({ result: 'Hello, world' });
  res.status(200).send(result);
}, []);

rio.post('/add', (req, res) => {
  let { a, b } = req.body;
  a = parseInt(a, 10);
  b = parseInt(b, 10);
  const result = JSON.stringify({ result: a + b });
  res.status(200).send(result);
}, [A, B]);

rio.post('/valids', (req, res) => {
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

  const cString = rio.formatter.String(c);
  const dFloat = rio.formatter.Float(d);
  const eArray = rio.formatter.Array(e);
  const fBool = rio.formatter.Boolean(f);
  const gMap = rio.formatter.Map(g);

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
}, [A, B, C, D, E, F, G, H, I]);

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
    expect(routes.length).toBe(5);
  });

  test('Get sum', async () => {
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

  test('Get /', async () => {
    const res = await request(app)
      .get('/');
    expect(res.statusCode).toEqual(200);
    const { text } = res;
    const { result } = JSON.parse(text);
    expect(result).toEqual('Hello, world');
  });
});

describe('Type formatters', () => {
  test('String formatter', () => {
    let formatted = rio.formatter.String(1.23);
    expect(formatted).toBe('1.23');

    formatted = rio.formatter.String(null);
    expect(formatted).toBe(null);

    formatted = rio.formatter.String(undefined);
    expect(formatted).toBe(null);
  });

  test('Integer formatter', () => {
    let formatted = rio.formatter.Int(1.23);
    expect(formatted).toBe(1);

    formatted = rio.formatter.Int('5');
    expect(formatted).toBe(5);

    formatted = rio.formatter.Int(75);
    expect(formatted).toBe(75);

    formatted = rio.formatter.Int(false);
    expect(formatted).toBe(null);

    formatted = rio.formatter.Int('ABC');
    expect(formatted).toBe(null);
  });

  test('Float formatter', () => {
    let formatted = rio.formatter.Float(1.23);
    expect(formatted).toBe(1.23);

    formatted = rio.formatter.Float('5');
    expect(formatted).toBe(5);

    formatted = rio.formatter.Float(75);
    expect(formatted).toBe(75);

    formatted = rio.formatter.Float(false);
    expect(formatted).toBe(0);

    formatted = rio.formatter.Float('ABC');
    expect(formatted).toBe(0);
  });

  test('Array formatter', () => {
    let formatted = rio.formatter.Array([]);
    expect(formatted).toEqual([]);

    formatted = rio.formatter.Array([[[[]]]]);
    expect(formatted).toEqual([[[[]]]]);

    formatted = rio.formatter.Array('ABC');
    expect(formatted).toEqual(null);

    const stringified = JSON.stringify(['1', '2', '3']);
    formatted = rio.formatter.Array(stringified);
    expect(formatted).toEqual(['1', '2', '3']);
  });

  test('Boolean formatter', () => {
    let formatted = rio.formatter.Boolean(false);
    expect(formatted).toEqual(false);

    formatted = rio.formatter.Boolean(true);
    expect(formatted).toEqual(true);

    formatted = rio.formatter.Boolean('true');
    expect(formatted).toEqual(true);

    formatted = rio.formatter.Boolean('True');
    expect(formatted).toEqual(true);

    formatted = rio.formatter.Boolean(55);
    expect(formatted).toEqual(false);

    formatted = rio.formatter.Boolean('ABC');
    expect(formatted).toEqual(false);

    formatted = rio.formatter.Boolean(null);
    expect(formatted).toEqual(null);
  });
});

test('Write to README no crash', () => {
  rio.writeREADME();
});
