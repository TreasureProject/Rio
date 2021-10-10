const express = require('express');
const rio = require('../src/index');

const app = express();

rio.get(app, '/', (req, res) => {
  res.status(200).send('Hello, world');
});

rio.post(app, '/', (req, res) => {
  res.status(200).send('Hello, world');
});

test('Using rio.get and rio.put', () => {
  const routes = rio.utils.getEndpoints(app);
  expect(routes.length).toBe(2);
});
