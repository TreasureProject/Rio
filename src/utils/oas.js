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

  let errorModel = {
    error: {
      type: 'string',
    },
  };

  if (rc.errorModel) {
    errorModel = rc.errorModel;
  }

  oas.components = {
    schemas: {
      GeneralError: {
        type: 'object',
        properties: errorModel,
      },
    },
  };

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

    const availability = rioAvailabilityOfEndpoint[endpoint];
    const status = rioStatusOfEndpoint[endpoint];

    if (oas.paths[route] == null) {
      oas.paths[route] = {};
    }

    let args = rioArgsForEndpoint[endpoint];
    const ignoreGlobalArgs = rioIgnoreGlobalsForEndpoint[endpoint];
    if (!ignoreGlobalArgs) {
      args = args.concat(globalArgs);
    }
    const argumentCount = args.length;

    const parameters = [];
    const properties = {};
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

      properties[argument.name] = {
        type: argument.type.oasType,
        format: argument.type.oasFormat,
        description: argument.description,
      };
    }

    const requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties,
          },
        },
      },
    };

    oas.paths[route][method] = {
      summary: description,
    };

    oas.paths[route][method].deprecated = status.name === 'deprecated';
    oas.paths[route][method].tags = [availability.name.toLowerCase(), status.name.toLowerCase()];

    if (method === 'get') {
      oas.paths[route][method].parameters = parameters;
    }

    if (method === 'post') {
      oas.paths[route][method].requestBody = requestBody;
    }

    oas.paths[route][method].responses = {
      200: {
        description: 'Ok',
      },
      default: {
        description: 'Error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GeneralError',
            },
          },
        },
      },
    };
  }

  console.log(JSON.stringify(oas));
}

module.exports = {
  oasGenerate,
};
