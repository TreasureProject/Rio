const utils = require('./utils');
const {
  Argument,
  ArgumentType,
  formatter,
  handleHTTP,
} = require('./api');

const rioArgsForEndpoint = {};

function post(app, endpoint, args, callback) {
  rioArgsForEndpoint[endpoint] = args;
  app.post(endpoint, ((req, res, next) => {
    handleHTTP(rioArgsForEndpoint, req, res, next, callback, true);
  }));
}

function get(app, endpoint, args, callback) {
  rioArgsForEndpoint[endpoint] = args;
  app.get(endpoint, ((req, res, next) => {
    handleHTTP(rioArgsForEndpoint, req, res, next, callback, false);
  }));
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
};

module.exports = rio;
