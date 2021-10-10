const { Argument } = require('./argument');
const { ArgumentType } = require('./argumentType');

function handleHTTP(req, res, next, callback, isPost) {
  const { path } = req.route;
  const providedArgs = process.rio.argsForEndpoint[path];
  const providedArgsCount = providedArgs.length;
  for (let i = 0; i < providedArgsCount; i += 1) {
    const providedArg = providedArgs[i];
    const value = (isPost ? req.body : req.query)[providedArg.name];
    if (value == null && providedArg.required === true) {
      const result = JSON.stringify({ error: `Missing ${providedArg.type.name} argument ${providedArg.name}`});
      res.status(403).send(result);
      return;
    }
  }
  callback(req, res, next);
}

function post(app, endpoint, args, callback) {
  process.rio.argsForEndpoint[endpoint] = args;
  app.post(endpoint, ((req, res, next) => {
    handleHTTP(req, res, next, callback, true);
  }));
}

function get(app, endpoint, args, callback) {
  process.rio.argsForEndpoint[endpoint] = args;
  app.get(endpoint, ((req, res, next) => {
    handleHTTP(req, res, next, callback, false);
  }));
}

module.exports = {
  post,
  get,
  Argument,
  ArgumentType,
};
