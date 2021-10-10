const utils = require('./utils');
const {
  post,
  get,
  Argument,
  ArgumentType,
  format,
} = require('./api');

process.rio = {};
process.rio.argsForEndpoint = {};

module.exports = {
  utils,
  post,
  get,
  Argument,
  ArgumentType,
  format,
};
