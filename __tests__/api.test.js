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
    expect(routes.length).toBe(2);
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
        a: '1',
        b: '2',
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
        a: '1',
      });
    expect(res.statusCode).toEqual(403);
    const { text } = res;
    const { error } = JSON.parse(text);
    expect(error).toEqual('Missing integer argument b');
  });
});
