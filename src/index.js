const utils = require('./utils');
const {
  Argument,
  ArgumentType,
  formatter,
  handleHTTP,
} = require('./api');

const rioArgsForEndpoint = {};
const rioTypeOfEndpoint = {};
const rioDescriptionOfEndpoint = {};
const rioExampleResultOfEndpoint = {};

const rio = {
  utils,
  Argument,
  ArgumentType,
  formatter,
  argsForEndpoint: rioArgsForEndpoint,
  cli: false,
  appName: 'My API',
};

rio.post = (endpoint, callback, args = [], description = null, exampleResult = null) => {
  rioArgsForEndpoint[`POST${endpoint}`] = args;
  rioTypeOfEndpoint[`POST${endpoint}`] = 'POST';
  rioDescriptionOfEndpoint[`POST${endpoint}`] = description;
  rioExampleResultOfEndpoint[`POST${endpoint}`] = exampleResult;
  rio.app.post(endpoint, ((req, res, next) => {
    handleHTTP(rioArgsForEndpoint, req, res, next, callback, true);
  }));
};

rio.get = (endpoint, callback, args = [], description = null, exampleResult = null) => {
  rioArgsForEndpoint[`GET${endpoint}`] = args;
  rioTypeOfEndpoint[`GET${endpoint}`] = 'GET';
  rioDescriptionOfEndpoint[`GET${endpoint}`] = description;
  rioExampleResultOfEndpoint[`GET${endpoint}`] = exampleResult;
  rio.app.get(endpoint, ((req, res, next) => {
    handleHTTP(rioArgsForEndpoint, req, res, next, callback, false);
  }));
};

function writeREADME(path) {
  utils.writeREADME(path, rio.app, rioArgsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioExampleResultOfEndpoint, rio.appName);
}

rio.writeREADME = writeREADME;

rio.init = (app, name = null) => {
  rio.app = app;
  if (name != null) {
    rio.appName = name;
  }
};

rio.RequiredInteger = (name, description = null) => new rio.Argument(name, rio.ArgumentType.Integer, true, description);
rio.RequiredString = (name, description = null) => new rio.Argument(name, rio.ArgumentType.String, true, description);
rio.RequiredFloat = (name, description = null) => new rio.Argument(name, rio.ArgumentType.Float, true, description);
rio.RequiredBoolean = (name, description = null) => new rio.Argument(name, rio.ArgumentType.Boolean, true, description);
rio.RequiredMap = (name, description = null) => new rio.Argument(name, rio.ArgumentType.Map, true, description);
rio.RequiredArray = (name, description = null) => new rio.Argument(name, rio.ArgumentType.Array, true, description);

rio.OptionalInteger = (name, description = null) => new rio.Argument(name, rio.ArgumentType.Integer, false, description);
rio.OptionalString = (name, description = null) => new rio.Argument(name, rio.ArgumentType.String, false, description);
rio.OptionalFloat = (name, description = null) => new rio.Argument(name, rio.ArgumentType.Float, false, description);
rio.OptionalBoolean = (name, description = null) => new rio.Argument(name, rio.ArgumentType.Boolean, false, description);
rio.OptionalMap = (name, description = null) => new rio.Argument(name, rio.ArgumentType.Map, false, description);
rio.OptionalArray = (name, description = null) => new rio.Argument(name, rio.ArgumentType.Array, false, description);

rio.rInt = rio.RequiredInteger;
rio.rStr = rio.RequiredString;
rio.rFloat = rio.RequiredFloat;
rio.rBool = rio.RequiredBoolean;
rio.rMap = rio.RequiredMap;
rio.rArray = rio.RequiredArray;

rio.oInt = rio.OptionalInteger;
rio.oStr = rio.OptionalString;
rio.oFloat = rio.OptionalFloat;
rio.oBool = rio.OptionalBoolean;
rio.oMap = rio.OptionalMap;
rio.oArray = rio.OptionalArray;

module.exports = rio;
