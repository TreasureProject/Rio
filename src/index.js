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

function post(app, endpoint, args, callback, description) {
  rioArgsForEndpoint[endpoint] = args;
  rioTypeOfEndpoint[endpoint] = 'POST';
  rioDescriptionOfEndpoint[endpoint] = description;
  app.post(endpoint, ((req, res, next) => {
    handleHTTP(rioArgsForEndpoint, req, res, next, callback, true);
  }));
}

function get(app, endpoint, args, callback, description) {
  rioArgsForEndpoint[endpoint] = args;
  rioTypeOfEndpoint[endpoint] = 'GET';
  rioDescriptionOfEndpoint[endpoint] = description;
  app.get(endpoint, ((req, res, next) => {
    handleHTTP(rioArgsForEndpoint, req, res, next, callback, false);
  }));
}

function writeREADME() {
  utils.writeREADME(rioArgsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint);
}

const rio = {
  utils,
  post,
  get,
  Argument,
  ArgumentType,
  formatter,
  argsForEndpoint: rioArgsForEndpoint,
  cli: false,
  writeREADME,
  appName: 'My API',
};

module.exports = rio;
