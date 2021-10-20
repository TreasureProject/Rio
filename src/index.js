const utils = require('./utils');
const {
  Argument,
  ArgumentType,
  formatter,
  http,
  Status,
  Availability,
} = require('./api');

const {
  addHTTPListener,
  rioArgsForEndpoint,
  rioTypeOfEndpoint,
  rioDescriptionOfEndpoint,
  rioExampleResultOfEndpoint,
  rioStatusOfEndpoint,
  rioAvailabilityOfEndpoint,
  rioIgnoreGlobalsForEndpoint,
} = http;

const rio = {
  utils,
  Argument,
  ArgumentType,
  formatter,
  argsForEndpoint: rioArgsForEndpoint,
  cli: false,
  appName: 'My API',
  paths: {},
  globalArgs: [],
};

rio.routers = {};
rio.router = {};

rio.router.init = (expressRouter, routerName) => {
  rio.routers[routerName] = expressRouter;
};

rio.post = (endpoint, callback, args = [], description = null, exampleResult = null, status = Status.live, availability = Availability.public, ignoreGlobals = false) => {
  addHTTPListener(rio, endpoint, ignoreGlobals, callback, args, description, exampleResult, true, status, availability);
};

rio.get = (endpoint, callback, args = [], description = null, exampleResult = null, status = Status.live, availability = Availability.public, ignoreGlobals = false) => {
  addHTTPListener(rio, endpoint, ignoreGlobals, callback, args, description, exampleResult, false, status, availability);
};

rio.router.get = (routerName, endpoint, callback, args = [], description = null, exampleResult = null, status = Status.live, availability = Availability.public, ignoreGlobals = false) => {
  addHTTPListener(rio, endpoint, ignoreGlobals, callback, args, description, exampleResult, false, status, availability, routerName);
};

rio.router.post = (routerName, endpoint, callback, args = [], description = null, exampleResult = null, status = Status.live, availability = Availability.public, ignoreGlobals = false) => {
  addHTTPListener(rio, endpoint, ignoreGlobals, callback, args, description, exampleResult, true, status, availability, routerName);
};

rio.writeREADME = (path, isPublic = true) => {
  let pathToUse = path;
  if (pathToUse == null) {
    pathToUse = process.cwd();
  }
  utils.writeREADME(pathToUse, isPublic, rio.paths, rio.app, rio.appName, rio.globalArgs, rioArgsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint, rioIgnoreGlobalsForEndpoint);
};

rio.oasGenerate = (path, isPublic = true) => {
  let pathToUse = path;
  if (pathToUse == null) {
    pathToUse = process.cwd();
  }
  utils.oasGenerate(pathToUse, isPublic, rio.paths, rio.app, rio.appName, rio.globalArgs, rioArgsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint, rioIgnoreGlobalsForEndpoint);
};

rio.init = (app, name = null, globalArgs = []) => {
  rio.app = app;
  if (name != null) {
    rio.appName = name.toString();
  }

  if (Array.isArray(globalArgs)) {
    rio.globalArgs = globalArgs;
  } else {
    if (process.env.JEST_WORKER_ID === undefined) {
      /* istanbul ignore next */
      console.log('Invalid argument for globalArgs is not an array');
    }
    rio.globalArgs = [];
  }
};

rio.RequiredInteger = (name, description = null, exampleValue = null) => new rio.Argument(name, rio.ArgumentType.Integer, true, description, exampleValue);
rio.RequiredString = (name, description = null, exampleValue = null) => new rio.Argument(name, rio.ArgumentType.String, true, description, exampleValue);
rio.RequiredFloat = (name, description = null, exampleValue = null) => new rio.Argument(name, rio.ArgumentType.Float, true, description, exampleValue);
rio.RequiredBoolean = (name, description = null, exampleValue = null) => new rio.Argument(name, rio.ArgumentType.Boolean, true, description, exampleValue);
rio.RequiredMap = (name, description = null, exampleValue = null) => new rio.Argument(name, rio.ArgumentType.Map, true, description, exampleValue);
rio.RequiredArray = (name, description = null, exampleValue = null) => new rio.Argument(name, rio.ArgumentType.Array, true, description, exampleValue);

rio.OptionalInteger = (name, description = null, exampleValue = null) => new rio.Argument(name, rio.ArgumentType.Integer, false, description, exampleValue);
rio.OptionalString = (name, description = null, exampleValue = null) => new rio.Argument(name, rio.ArgumentType.String, false, description, exampleValue);
rio.OptionalFloat = (name, description = null, exampleValue = null) => new rio.Argument(name, rio.ArgumentType.Float, false, description, exampleValue);
rio.OptionalBoolean = (name, description = null, exampleValue = null) => new rio.Argument(name, rio.ArgumentType.Boolean, false, description, exampleValue);
rio.OptionalMap = (name, description = null, exampleValue = null) => new rio.Argument(name, rio.ArgumentType.Map, false, description, exampleValue);
rio.OptionalArray = (name, description = null, exampleValue = null) => new rio.Argument(name, rio.ArgumentType.Array, false, description, exampleValue);

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

rio.deprecated = Status.deprecated;
rio.preview = Status.preview;
rio.live = Status.live;

rio.public = Availability.public;
rio.private = Availability.private;
rio.thirdParty = Availability.thirdParty;

module.exports = rio;
