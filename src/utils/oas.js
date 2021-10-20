const router = require('./router');
const {
  getRioRC,
  formatEndpoint,
  writeToFile,
  removeModule,
  isInModule,
  isInMiscModule,
} = require('./rc');

function writeRoutes(oas, routes, globalArgs, moduleForEndpoints, rioExampleResultOfEndpoint, errorExample, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioStatusOfEndpoint, rioArgsForEndpoint, rioIgnoreGlobalsForEndpoint) {
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
    if (rioTypeOfEndpoint[endpoint]) {
      const method = rioTypeOfEndpoint[endpoint].toLowerCase();
      const description = rioDescriptionOfEndpoint[endpoint];

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
      const examplePost = {};

      for (let j = 0; j < argumentCount; j += 1) {
        const argument = args[j];
        const param = {
          name: argument.name,
          in: 'query',
          description: argument.description,
          required: argument.required,
          schema: {
            type: argument.type.oasType,
            example: argument.exampleValue,
          },
        };

        if (argument.type.oasFormat) {
          param.schema.format = argument.type.oasFormat;
        }

        parameters.push(param);

        properties[argument.name] = {
          type: argument.type.oasType,
          description: argument.description,
        };

        if (argument.type.oasFormat) {
          properties[argument.name].format = argument.type.oasFormat;
        }

        examplePost[argument.name] = argument.exampleValue;
      }

      const requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties,
              example: examplePost,
            },
          },
        },
      };

      let module = moduleForEndpoints[endpoint];
      if (module == null) {
        module = 'Misc';
      }

      oas.paths[route][method] = {
        summary: removeModule(route, module),
        description,
      };

      oas.paths[route][method].deprecated = status.name === 'deprecated';

      oas.paths[route][method].tags = [module];

      if (method === 'get') {
        oas.paths[route][method].parameters = parameters;
      }

      if (method === 'post') {
        oas.paths[route][method].requestBody = requestBody;
      }

      const goodStatusResponse = {
        description: 'OK',
      };

      let goodStatusContent = null;
      const response = rioExampleResultOfEndpoint[endpoint];
      if (response != null) {
        const isArray = Array.isArray(response);
        const isObject = typeof response === 'object';
        const isString = typeof response === 'string';
        const isNumber = typeof response === 'number';

        let type = null;
        let items = null;
        const responseProperties = {};

        if (isArray) {
          type = 'array';
          if (response.length > 0) {
            items = {
              type: typeof response[0],
            };
          } else {
            items = {
              type: 'object',
            };
          }
        } else if (isObject) {
          type = 'object';
          const keys = Object.keys(response);
          for (let j = 0; j < keys.length; j += 1) {
            const key = keys[j];
            const value = response[key];
            const pIsObject = typeof value === 'object';
            const pIsString = typeof value === 'string';
            const pIsNumber = typeof value === 'number';
            const pIsArray = Array.isArray(value);
            let valueType = null;
            let valueItems = null;

            if (pIsArray) {
              valueType = 'array';
              if (value.length > 0) {
                valueItems = {
                  type: typeof value[0],
                };
              } else {
                valueItems = {
                  type: 'object',
                };
              }
            } else if (pIsObject) {
              valueType = 'object';
            } else if (pIsString) {
              valueType = 'string';
            } else if (pIsNumber) {
              valueType = 'number';
            }

            if (valueType != null) {
              responseProperties[key] = {
                type: valueType,
              };
            }

            if (valueItems != null) {
              responseProperties[key] = {
                items: valueItems,
              };
            }
          }
        } else if (isString) {
          type = 'string';
        } else if (isNumber) {
          type = 'number';
        }

        if (type != null) {
          const schema = {
            type,
          };

          if (isObject && !isArray) {
            schema.properties = responseProperties;
          }

          if (isArray) {
            schema.items = items;
          }

          goodStatusContent = {
            'application/json': {
              schema,
              example: response,
            },
          };
        }
      }

      if (goodStatusContent != null) {
        goodStatusResponse.content = goodStatusContent;
      }

      oas.paths[route][method].responses = {
        200: goodStatusResponse,
        default: {
          description: 'Error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GeneralError',
              },
              example: errorExample,
            },
          },
        },
      };
    }
  }
}

function oasGenerate(path, isPublic, paths, app, appName, globalArgs, rioArgsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint, rioIgnoreGlobalsForEndpoint) {
  const { moduleForEndpoints, modules, routes } = router.getEndpoints(app, paths, rioStatusOfEndpoint, rioAvailabilityOfEndpoint, isPublic);
  routes.sort();
  const rc = getRioRC(path);

  const oas = {};
  oas.openapi = '3.0.3';

  let license = 'UNLICENSED';
  const rcLicense = rc.license;
  if (rcLicense != null) {
    license = rcLicense;
  }

  oas.info = {
    version: '1.0.0',
    title: appName,
    license: {
      name: license,
    },
  };

  let servers = ['NONE'];
  const rcServers = rc.servers;
  if (rcServers != null) {
    servers = rcServers;
  }

  oas.servers = [];
  for (let i = 0; i < servers.length; i += 1) {
    const server = servers[i];
    const serverObj = {
      url: server,
    };
    oas.servers.push(serverObj);
  }
  oas.paths = {};

  let errorModel = {
    error: {
      type: 'string',
    },
  };

  let errorExample = {
    error: 'There was an error!!!',
  };

  if (rc.errorModel) {
    errorModel = rc.errorModel;
  }

  if (rc.errorExample) {
    errorExample = rc.errorExample;
  }

  let securitySchemes = null;
  if (rc.apiKeys && Array.isArray(rc.apiKeys)) {
    let { apiKeyLocation } = rc;
    if (apiKeyLocation == null) {
      apiKeyLocation = 'query';
    }

    securitySchemes = {};
    const apiKeyCount = rc.apiKeys.length;
    for (let i = 0; i < apiKeyCount; i += 1) {
      const apiKey = rc.apiKeys[i];
      securitySchemes[apiKey] = {
        type: 'apiKey',
        name: apiKey,
        in: apiKeyLocation,
      };
    }
  }

  oas.components = {
    schemas: {
      GeneralError: {
        type: 'object',
        properties: errorModel,
      },
    },
  };

  if (securitySchemes) {
    oas.components.securitySchemes = securitySchemes;
  }

  for (let i = 0; i < modules.length; i += 1) {
    const module = modules[i];
    const moduleRoutes = routes.filter((route) => isInModule(route, module));
    writeRoutes(oas, moduleRoutes, globalArgs, moduleForEndpoints, rioExampleResultOfEndpoint, errorExample, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioStatusOfEndpoint, rioArgsForEndpoint, rioIgnoreGlobalsForEndpoint);
  }
  const miscRoutes = routes.filter((route) => isInMiscModule(route));
  writeRoutes(oas, miscRoutes, globalArgs, moduleForEndpoints, rioExampleResultOfEndpoint, errorExample, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioStatusOfEndpoint, rioArgsForEndpoint, rioIgnoreGlobalsForEndpoint);

  const fileName = `${isPublic ? 'public-' : ''}swagger.json`;
  const formatted = JSON.stringify(oas, null, 2);
  writeToFile(fileName, formatted);
}

module.exports = {
  oasGenerate,
};
