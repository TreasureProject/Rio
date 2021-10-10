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

const rio = {
  utils,
  Argument,
  ArgumentType,
  formatter,
  argsForEndpoint: rioArgsForEndpoint,
  cli: false,
  appName: 'My API',
};

rio.post = (endpoint, callback, args, description) => {
  rioArgsForEndpoint[endpoint] = args;
  rioTypeOfEndpoint[endpoint] = 'POST';
  rioDescriptionOfEndpoint[endpoint] = description;
  rio.app.post(endpoint, ((req, res, next) => {
    handleHTTP(rioArgsForEndpoint, req, res, next, callback, true);
  }));
};

rio.get = (endpoint, callback, args, description) => {
  rioArgsForEndpoint[endpoint] = args;
  rioTypeOfEndpoint[endpoint] = 'GET';
  rioDescriptionOfEndpoint[endpoint] = description;
  rio.app.get(endpoint, ((req, res, next) => {
    handleHTTP(rioArgsForEndpoint, req, res, next, callback, false);
  }));
};

function writeREADME() {
  utils.writeREADME(rioArgsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rio.appName);
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

module.exports = rio;
