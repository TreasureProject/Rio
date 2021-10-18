const request = require('supertest');
const express = require('express');
const http = require('http');
const rio = require('../src/index');

const app = express();
rio.init(app, null, null);

const server = http.createServer(app);
app.use(express.json());

const router = express.Router();

const routerName = '/v2';

rio.router.init(router, routerName);

rio.router.get(routerName, '/test', (req, res) => {
  res.status(200).send('Hi');
}, [rio.rInt('a', 'a number')]);

rio.router.post(routerName, '/test', (req, res) => {
  res.status(200).send('Hi');
}, [rio.rInt('a', 'a number')]);

rio.router.get(routerName, '/testB', (req, res) => {
  res.status(200).send('Hi');
});

app.use(routerName, router);

afterEach(async () => {
  await server.close();
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(async () => {
    await server.close();
    resolve();
  }, 500));
});

describe('Router tests - GET', () => {
  test('Get correctly', async () => {
    const res = await request(app)
      .get('/v2/test?a=1');
    expect(res.statusCode).toEqual(200);
    const { text } = res;
    expect(text).toEqual('Hi');
  });

  test('Get missing module', async () => {
    const res = await request(app)
      .get('/test?a=1');
    expect(res.statusCode).toEqual(404);
  });

  test('Get missing arg', async () => {
    const res = await request(app)
      .get('/v2/test');
    expect(res.statusCode).toEqual(403);
  });

  test('Get bad arg', async () => {
    const res = await request(app)
      .get('/v2/test?a=A');
    expect(res.statusCode).toEqual(403);
  });

  test('Get correctly, no args', async () => {
    const res = await request(app)
      .get('/v2/testB');
    expect(res.statusCode).toEqual(200);
    const { text } = res;
    expect(text).toEqual('Hi');
  });
});

describe('Router tests - POST', () => {
  test('Post correctly', async () => {
    const res = await request(app)
      .post('/v2/test')
      .send({ a: 1 });
    expect(res.statusCode).toEqual(200);
    const { text } = res;
    expect(text).toEqual('Hi');
  });

  test('Get missing module', async () => {
    const res = await request(app)
      .post('/test')
      .send({ a: 1 });
    expect(res.statusCode).toEqual(404);
  });

  test('Get missing arg', async () => {
    const res = await request(app)
      .post('/v2/test')
      .send({});
    expect(res.statusCode).toEqual(403);
  });

  test('Get bad arg', async () => {
    const res = await request(app)
      .post('/v2/test')
      .send({ a: 'A' });
    expect(res.statusCode).toEqual(403);
  });
});

test('Generate README', () => {
  rio.writeREADME('../..');
});
