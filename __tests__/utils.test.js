const express = require('express');
const rio = require('../src/index');

const app = express();
rio.init(app);

app.get('/utils', (req, res) => {
  res.status(200).send('Hello, world');
});

test('Write to README no crash', () => {
  rio.writeREADME();
});

test('Getting endpoints', () => {
  const { routes } = rio.utils.getEndpoints(app, rio.paths);
  expect(routes.length).toBe(1);
});

describe('Required Argument initializers', () => {
  test('Integer', () => {
    const func = rio.RequiredInteger;
    let a = func('name');
    expect(a.required).toBe(true);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(true);
    expect(a.description).toBe('Hi!');
  });

  test('Float', () => {
    const func = rio.RequiredFloat;
    let a = func('name');
    expect(a.required).toBe(true);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(true);
    expect(a.description).toBe('Hi!');
  });

  test('String', () => {
    const func = rio.RequiredString;
    let a = func('name');
    expect(a.required).toBe(true);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(true);
    expect(a.description).toBe('Hi!');
  });

  test('Boolean', () => {
    const func = rio.RequiredBoolean;
    let a = func('name');
    expect(a.required).toBe(true);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(true);
    expect(a.description).toBe('Hi!');
  });

  test('Array', () => {
    const func = rio.RequiredArray;
    let a = func('name');
    expect(a.required).toBe(true);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(true);
    expect(a.description).toBe('Hi!');
  });

  test('Map', () => {
    const func = rio.RequiredMap;
    let a = func('name');
    expect(a.required).toBe(true);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(true);
    expect(a.description).toBe('Hi!');
  });
});

describe('Optional Argument initializers', () => {
  test('Integer', () => {
    const func = rio.OptionalInteger;
    let a = func('name');
    expect(a.required).toBe(false);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(false);
    expect(a.description).toBe('Hi!');
  });

  test('Float', () => {
    const func = rio.OptionalFloat;
    let a = func('name');
    expect(a.required).toBe(false);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(false);
    expect(a.description).toBe('Hi!');
  });

  test('String', () => {
    const func = rio.OptionalString;
    let a = func('name');
    expect(a.required).toBe(false);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(false);
    expect(a.description).toBe('Hi!');
  });

  test('Boolean', () => {
    const func = rio.OptionalBoolean;
    let a = func('name');
    expect(a.required).toBe(false);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(false);
    expect(a.description).toBe('Hi!');
  });

  test('Array', () => {
    const func = rio.OptionalArray;
    let a = func('name');
    expect(a.required).toBe(false);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(false);
    expect(a.description).toBe('Hi!');
  });

  test('Map', () => {
    const func = rio.OptionalMap;
    let a = func('name');
    expect(a.required).toBe(false);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(false);
    expect(a.description).toBe('Hi!');
  });
});

describe('Required Argument initializers - shorthand', () => {
  test('Integer', () => {
    const func = rio.rInt;
    let a = func('name');
    expect(a.required).toBe(true);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(true);
    expect(a.description).toBe('Hi!');
  });

  test('Float', () => {
    const func = rio.rFloat;
    let a = func('name');
    expect(a.required).toBe(true);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(true);
    expect(a.description).toBe('Hi!');
  });

  test('String', () => {
    const func = rio.rStr;
    let a = func('name');
    expect(a.required).toBe(true);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(true);
    expect(a.description).toBe('Hi!');
  });

  test('Boolean', () => {
    const func = rio.rBool;
    let a = func('name');
    expect(a.required).toBe(true);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(true);
    expect(a.description).toBe('Hi!');
  });

  test('Array', () => {
    const func = rio.rArray;
    let a = func('name');
    expect(a.required).toBe(true);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(true);
    expect(a.description).toBe('Hi!');
  });

  test('Map', () => {
    const func = rio.rMap;
    let a = func('name');
    expect(a.required).toBe(true);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(true);
    expect(a.description).toBe('Hi!');
  });
});

describe('Optional Argument initializers - shorthand', () => {
  test('Integer', () => {
    const func = rio.oInt;
    let a = func('name');
    expect(a.required).toBe(false);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(false);
    expect(a.description).toBe('Hi!');
  });

  test('Float', () => {
    const func = rio.oFloat;
    let a = func('name');
    expect(a.required).toBe(false);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(false);
    expect(a.description).toBe('Hi!');
  });

  test('String', () => {
    const func = rio.oStr;
    let a = func('name');
    expect(a.required).toBe(false);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(false);
    expect(a.description).toBe('Hi!');
  });

  test('Boolean', () => {
    const func = rio.oBool;
    let a = func('name');
    expect(a.required).toBe(false);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(false);
    expect(a.description).toBe('Hi!');
  });

  test('Array', () => {
    const func = rio.oArray;
    let a = func('name');
    expect(a.required).toBe(false);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(false);
    expect(a.description).toBe('Hi!');
  });

  test('Map', () => {
    const func = rio.oMap;
    let a = func('name');
    expect(a.required).toBe(false);
    expect(a.description).toBe(null);

    a = func('name', 'Hi!');
    expect(a.required).toBe(false);
    expect(a.description).toBe('Hi!');
  });
});
