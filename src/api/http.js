const { ArgumentType } = require('./argumentType');
const { formatter } = require('./formatter');

const rioArgsForEndpoint = {};
const rioTypeOfEndpoint = {};
const rioDescriptionOfEndpoint = {};
const rioExampleResultOfEndpoint = {};
const rioStatusOfEndpoint = {};
const rioAvailabilityOfEndpoint = {};
const rioIgnoreGlobalsForEndpoint = {};

function invalidType(providedArg, res) {
  const result = JSON.stringify({ error: `Argument ${providedArg.name} was not of the specified type ${providedArg.type.name}` });
  res.status(403).send(result);
}

function handleHTTP(globalArgs, req, res, next, callback, isPost) {
  const { path, methods } = req.route;
  const m = Object.keys(methods)[0].toUpperCase();
  let providedArgs = rioArgsForEndpoint[`${m}${req.baseUrl}${path}`];
  if (providedArgs == null) {
    providedArgs = [];
  }
  providedArgs = providedArgs.concat(globalArgs);
  const providedArgsCount = providedArgs.length;
  for (let i = 0; i < providedArgsCount; i += 1) {
    const providedArg = providedArgs[i];
    const argValues = { ...req.headers, ...(isPost ? req.body : req.query) };
    const value = argValues[providedArg.name] || argValues[providedArg.name.toLowerCase()];
    if (value != null) {
      let validType = null;

      switch (providedArg.type) {
        case ArgumentType.String:
          validType = formatter.String(value);
          break;
        case ArgumentType.Integer:
          validType = formatter.Int(value);
          break;
        case ArgumentType.Float:
          validType = formatter.Float(value);
          break;
        case ArgumentType.Array:
          validType = formatter.Array(value);
          break;
        case ArgumentType.Boolean:
          validType = formatter.Boolean(value);
          break;
        case ArgumentType.Map:
          validType = formatter.Map(value);
          break;
        default:
          validType = true;
          break;
      }

      if (validType == null) {
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

function handleListener(handler, isPost, endpoint, callback) {
  if (isPost) {
    handler.post(endpoint, callback);
  } else {
    handler.get(endpoint, callback);
  }
}

function addHTTPListener(rio, endpoint, ignoreGlobals, callback, args, description, exampleResult, isPost, status, availability, routerName = '') {
  const method = isPost ? 'POST' : 'GET';
  const key = `${method}${routerName}${endpoint}`;
  rioArgsForEndpoint[key] = args;
  rioTypeOfEndpoint[key] = method;
  rioDescriptionOfEndpoint[key] = description;
  rioExampleResultOfEndpoint[key] = exampleResult;
  rioStatusOfEndpoint[key] = status;
  rioAvailabilityOfEndpoint[key] = availability;
  rioIgnoreGlobalsForEndpoint[key] = ignoreGlobals;

  let handler = rio.app;

  if (routerName !== '') {
    const expressRouter = rio.routers[routerName];
    if (expressRouter) {
      handler = expressRouter;
    }

    rio.paths[key] = {
      methods: isPost ? { post: true } : { get: true },
      path: `${routerName}${endpoint}`,
    };
  }

  const globals = ignoreGlobals ? [] : rio.globalArgs;

  handleListener(handler, isPost, endpoint, ((req, res, next) => {
    handleHTTP(globals, req, res, next, callback, isPost);
  }));
}

module.exports = {
  addHTTPListener,
  rioArgsForEndpoint,
  rioTypeOfEndpoint,
  rioDescriptionOfEndpoint,
  rioExampleResultOfEndpoint,
  rioStatusOfEndpoint,
  rioAvailabilityOfEndpoint,
  rioIgnoreGlobalsForEndpoint,
};
