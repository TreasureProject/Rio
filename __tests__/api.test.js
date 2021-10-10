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

  test('Float formatter', () => {
    let formatted = rio.format.Float(1.23);
    expect(formatted).toBe(1.23);

    formatted = rio.format.Float('5');
    expect(formatted).toBe(5);

    formatted = rio.format.Float(75);
    expect(formatted).toBe(75);

    formatted = rio.format.Float(false);
    expect(formatted).toBe(0);

    formatted = rio.format.Float('ABC');
    expect(formatted).toBe(0);
  });

  test('Array formatter', () => {
    let formatted = rio.format.Array([]);
    expect(formatted).toEqual([]);

    formatted = rio.format.Array([[[[]]]]);
    expect(formatted).toEqual([[[[]]]]);

    formatted = rio.format.Array('ABC');
    expect(formatted).toEqual(null);

    const stringified = JSON.stringify(['1', '2', '3']);
    formatted = rio.format.Array(stringified);
    expect(formatted).toEqual(['1', '2', '3']);
  });

  test('Boolean formatter', () => {
    let formatted = rio.format.Boolean(false);
    expect(formatted).toEqual(false);

    formatted = rio.format.Boolean(true);
    expect(formatted).toEqual(true);

    formatted = rio.format.Boolean('true');
    expect(formatted).toEqual(true);

    formatted = rio.format.Boolean('True');
    expect(formatted).toEqual(true);

    formatted = rio.format.Boolean(55);
    expect(formatted).toEqual(false);

    formatted = rio.format.Boolean('ABC');
    expect(formatted).toEqual(false);

    formatted = rio.format.Boolean(null);
    expect(formatted).toEqual(null);
  });
});
