const request = require('supertest');
const rio = require('../src/index');
const { app, server } = require('../api');

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
