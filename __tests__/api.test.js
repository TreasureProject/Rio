const express = require('express');
const http = require('http');
const request = require('supertest');
const rio = require('../src/index');

const app = express();
const server = http.createServer(app);

rio.get(app, '/', (req, res) => {
  res.status(200).send('Hello, world');
});

rio.post(app, '/', (req, res) => {
  res.status(200).send('Hello, world');
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
      .get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Hello, world');
  });

  test('Post', async () => {
    const res = await request(app)
      .post('/')
      .send({});
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Hello, world');
  });
});
