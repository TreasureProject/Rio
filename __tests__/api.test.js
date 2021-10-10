const express = require('express');
const rio = require('../src/index');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello, world');
});

test('Getting application', () => {
  const routes = rio.utils.getEndpoints(app);
  expect(routes.length).toBe(1);
});
