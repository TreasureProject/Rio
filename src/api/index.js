const { Argument } = require('./argument');
const { ArgumentType, format } = require('./argumentType');

function invalidType(providedArg, res) {
  const result = JSON.stringify({ error: `Argument ${providedArg.name} was not of the specified type ${providedArg.type.name}` });
  res.status(403).send(result);
}

function handleHTTP(req, res, next, callback, isPost) {
  const { path } = req.route;
  const providedArgs = process.rio.argsForEndpoint[path];
  const providedArgsCount = providedArgs.length;
  for (let i = 0; i < providedArgsCount; i += 1) {
    const providedArg = providedArgs[i];
    const value = (isPost ? req.body : req.query)[providedArg.name];
    if (value != null) {
      let validType = true;

      switch (providedArg.type) {
        case ArgumentType.String:
          validType = format.String(value);
          break;
        case ArgumentType.Integer:
          validType = format.Int(value);
          break;
        case ArgumentType.Float:
          validType = format.Float(value);
          break;
        case ArgumentType.Array:
          validType = format.Array(value);
          break;
        case ArgumentType.Boolean:
          validType = format.Boolean(value);
          break;
        case ArgumentType.Map:
          validType = format.Map(value);
          break;
        default:
          break;
      }

      if (!validType) {
        invalidType(providedArg, res);
        return;
      }
    } else if (value == null && providedArg.required === true) {
      const result = JSON.stringify({ error: `Missing ${providedArg.type.name} argument ${providedArg.name}` });
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
  format,
};
