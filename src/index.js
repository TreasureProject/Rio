const utils = require('./utils');
const {
  Argument,
  ArgumentType,
  formatter,
  handleHTTP,
} = require('./api');

const rioArgsForEndpoint = {};
const rioTypeOfEndpoint = {};

function post(app, endpoint, args, callback) {
  rioArgsForEndpoint[endpoint] = args;
  rioTypeOfEndpoint[endpoint] = 'POST';
  app.post(endpoint, ((req, res, next) => {
    handleHTTP(rioArgsForEndpoint, req, res, next, callback, true);
  }));
}

function get(app, endpoint, args, callback) {
  rioArgsForEndpoint[endpoint] = args;
  rioTypeOfEndpoint[endpoint] = 'GET';
  app.get(endpoint, ((req, res, next) => {
    handleHTTP(rioArgsForEndpoint, req, res, next, callback, false);
  }));
}

function writeREADME() {
  utils.writeREADME(rioArgsForEndpoint, rioTypeOfEndpoint);
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
};

module.exports = rio;
