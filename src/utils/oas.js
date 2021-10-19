const router = require('./router');
const {
  getRioRC,
  formatEndpoint,
} = require('./rc');

function oasGenerate(path, isPublic, paths, app, appName, globalArgs, rioArgsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint, rioIgnoreGlobalsForEndpoint) {
  const oas = {};
  oas.openapi = '3.0.0';
  oas.info = {
    version: '1.0.0',
    title: appName,
    license: {
      name: 'UNLICENSED',
    },
  };
  oas.servers = [
    {
      url: 'https://dev.api.com',
    },
  ];
  oas.paths = {};

  const { modules, routes } = router.getEndpoints(app, paths, rioStatusOfEndpoint, rioAvailabilityOfEndpoint, isPublic);
  routes.sort();
  const rc = getRioRC(path);

  const endpointCount = routes.length;
  routes.sort((a, b) => {
    if (formatEndpoint(a) < formatEndpoint(b)) {
      return -1;
    }

    if (formatEndpoint(a) > formatEndpoint(b)) {
      return 1;
    }
    return 0;
  });

  for (let i = 0; i < endpointCount; i += 1) {
    const endpoint = routes[i];
    const route = formatEndpoint(endpoint);
    const method = rioTypeOfEndpoint[endpoint].toLowerCase();
    const description = rioDescriptionOfEndpoint[endpoint];

    if (oas.paths[route] == null) {
      oas.paths[route] = {};
    }

    let args = rioArgsForEndpoint[endpoint];
    const ignoreGlobalArgs = rioIgnoreGlobalsForEndpoint[endpoint];
    if (!ignoreGlobalArgs) {
      args = args.concat(globalArgs);
    }
    const argumentCount = args.length;

    let parameters = null;
    if (method === 'get') {
      parameters = [];
      for (let j = 0; j < argumentCount; j += 1) {
        const argument = args[j];
        const param = {
          name: argument.name,
          in: 'query',
          description: argument.description,
          required: argument.required,
          schema: {
            type: argument.type.oasType,
            format: argument.type.oasFormat,
          },
        };
        parameters.push(param);
      }
    }

    let requestBody = null;
    if (method === 'post') {
      requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: {

            },
          },
        },
      };
    }

    oas.paths[route][method] = {
      summary: description,
    };

    if (parameters) {
      oas.paths[route][method].parameters = parameters;
    }

    if (parameters) {
      oas.paths[route][method].requestBody = requestBody;
    }
  }

  console.log(JSON.stringify(oas));
}

module.exports = {
  oasGenerate,
};
