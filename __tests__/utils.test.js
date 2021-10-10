const express = require('express');
const rio = require('../src/index');

const app = express();
rio.init(app);

app.get('/utils', (req, res) => {
  res.status(200).send('Hello, world');
});

test('Getting endpoints', () => {
  const routes = rio.utils.getEndpoints(app);
  expect(routes.length).toBe(1);
});

describe('Argument initializers', () => {
  test('Integer', () => {
    const func = rio.Integer;
    let a = func('name');
    expect(a.required).toBe(false);
    expect(a.description).toBe(null);

    a = func('name', true);
    expect(a.required).toBe(true);
    expect(a.description).toBe(null);

    a = func('name', true, 'Hi!');
    expect(a.required).toBe(true);
    expect(a.description).toBe('Hi!');
  });

  test('Float', () => {
    const func = rio.Float;
    let a = func('name');
    expect(a.required).toBe(false);
    expect(a.description).toBe(null);

    a = func('name', true);
    expect(a.required).toBe(true);
    expect(a.description).toBe(null);

    a = func('name', true, 'Hi!');
    expect(a.required).toBe(true);
    expect(a.description).toBe('Hi!');
  });

  test('String', () => {
    const func = rio.String;
    let a = func('name');
    expect(a.required).toBe(false);
    expect(a.description).toBe(null);

    a = func('name', true);
    expect(a.required).toBe(true);
    expect(a.description).toBe(null);

    a = func('name', true, 'Hi!');
    expect(a.required).toBe(true);
    expect(a.description).toBe('Hi!');
  });

  test('Boolean', () => {
    const func = rio.Boolean;
    let a = func('name');
    expect(a.required).toBe(false);
    expect(a.description).toBe(null);

    a = func('name', true);
    expect(a.required).toBe(true);
    expect(a.description).toBe(null);

    a = func('name', true, 'Hi!');
    expect(a.required).toBe(true);
    expect(a.description).toBe('Hi!');
  });

  test('Array', () => {
    const func = rio.rArray;
    let a = func('name');
    expect(a.required).toBe(false);
    expect(a.description).toBe(null);

    a = func('name', true);
    expect(a.required).toBe(true);
    expect(a.description).toBe(null);

    a = func('name', true, 'Hi!');
    expect(a.required).toBe(true);
    expect(a.description).toBe('Hi!');
  });

  test('Map', () => {
    const func = rio.Map;
    let a = func('name');
    expect(a.required).toBe(false);
    expect(a.description).toBe(null);

    a = func('name', true);
    expect(a.required).toBe(true);
    expect(a.description).toBe(null);

    a = func('name', true, 'Hi!');
    expect(a.required).toBe(true);
    expect(a.description).toBe('Hi!');
  });
});
