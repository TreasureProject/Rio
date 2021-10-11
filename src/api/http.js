const { ArgumentType } = require('./argumentType');
const { formatter } = require('./formatter');

function invalidType(providedArg, res) {
  const result = JSON.stringify({ error: `Argument ${providedArg.name} was not of the specified type ${providedArg.type.name}` });
  res.status(403).send(result);
}

function handleHTTP(rioArgsForEndpoint, req, res, next, callback, isPost) {
  const { path, methods } = req.route;
  const m = Object.keys(methods)[0].toUpperCase();
  const providedArgs = rioArgsForEndpoint[`${m}${req.baseUrl}${path}`];
  const providedArgsCount = providedArgs.length;
  for (let i = 0; i < providedArgsCount; i += 1) {
    const providedArg = providedArgs[i];
    const value = (isPost ? req.body : req.query)[providedArg.name];
    if (value != null) {
      let validType = true;

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

module.exports = {
  handleHTTP,
};
