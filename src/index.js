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

rio.init = (app, name) => {
  rio.app = app;
  rio.appName = name;
};

module.exports = rio;
