const express = require('express');
const rio = require('../src/index');

const app = express();

app.get('/utils', (req, res) => {
  res.status(200).send('Hello, world');
});

test('Getting endpoints', () => {
  const routes = rio.utils.getEndpoints(app);
  expect(routes.length).toBe(1);
});
