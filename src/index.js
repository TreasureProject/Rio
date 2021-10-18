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

rio.post = (endpoint, callback, args = [], description = null, exampleResult = null, status = Status.live, availability = Availability.public) => {
  addHTTPListener(rio, endpoint, callback, args, description, exampleResult, true, status, availability);
};

rio.get = (endpoint, callback, args = [], description = null, exampleResult = null, status = Status.live, availability = Availability.public) => {
  addHTTPListener(rio, endpoint, callback, args, description, exampleResult, false, status, availability);
};

rio.router.get = (routerName, endpoint, callback, args = [], description = null, exampleResult = null, status = Status.live, availability = Availability.public) => {
  addHTTPListener(rio, endpoint, callback, args, description, exampleResult, false, status, availability, routerName);
};

rio.router.post = (routerName, endpoint, callback, args = [], description = null, exampleResult = null, status = Status.live, availability = Availability.public) => {
  addHTTPListener(rio, endpoint, callback, args, description, exampleResult, true, status, availability, routerName);
};

function writeREADME(path) {
  let pathToUse = path;
  if (pathToUse == null) {
    pathToUse = process.cwd();
  }
  utils.writeREADME(pathToUse, rio.paths, rio.app, rio.appName, rio.globalArgs, rioArgsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint);
}

rio.writeREADME = writeREADME;

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

rio.deprecated = Status.deprecated;
rio.preview = Status.preview;
rio.live = Status.live;

rio.public = Availability.public;
rio.private = Availability.private;
rio.thirdParty = Availability.thirdParty;

module.exports = rio;
