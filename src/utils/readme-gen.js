const fs = require('fs');
const router = require('./router');

function writeToFile(fileName, content) {
  /* istanbul ignore next */
  if (process.env.JEST_WORKER_ID === undefined) {
    fs.writeFile(fileName, content, (err) => {
      if (err) {
        console.log(`Failed to write ${fileName} due to error ${err}`);
        return;
      }
      console.log(`${fileName} was written successfully`);
    });
  }
}

function pathForModule(module, isPublic) {
  const apiModuleDirectory = `${isPublic ? 'Public-' : ''}API-Modules`;

  let parsed = module.split('/').join('-');
  parsed = parsed.replace('-', '/');
  if (parsed.substring(0, 1) !== '/') {
    parsed = `/${parsed}`;
  }
  return `${apiModuleDirectory}${parsed}`;
}

function formatEndpoint(route) {
  let parts = route.split('/');
  parts.shift();
  parts = `/${parts.join('/')}`;
  return parts;
}

function getContentForRoutes(endpoints, globalArgs, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioArgsForEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint) {
  let content = '';
  const endpointCount = endpoints.length;
  endpoints.sort((a, b) => {
    if (formatEndpoint(a) < formatEndpoint(b)) {
      return -1;
    }

    if (formatEndpoint(a) > formatEndpoint(b)) {
      return 1;
    }
    return 0;
  });

  if (endpointCount > 0) {
    content += '## Table of Contents\n';
    for (let i = 0; i < endpointCount; i += 1) {
      const endpoint = endpoints[i];
      content += `- [${formatEndpoint(endpoint)}](#endpt-${i + 1})\n`;
    }
    content += '\n';
  }

  for (let i = 0; i < endpointCount; i += 1) {
    content += '___\n';
    content += `###### endpt #${i + 1}\n`;

    const endpoint = endpoints[i];
    const type = rioTypeOfEndpoint[endpoint];
    const header = `\`\`\`\n${type} - ${formatEndpoint(endpoint)}\n\`\`\`\n\n`;
    content += header;

    const status = rioStatusOfEndpoint[endpoint].name.toUpperCase();
    content += `**Status**: ${status}\n`;

    const availability = rioAvailabilityOfEndpoint[endpoint].name.toUpperCase();
    content += `**Availability**: ${availability}\n\n`;

    const description = rioDescriptionOfEndpoint[endpoint];
    if (description != null) {
      content += `#### Description:\n- ${description}\n\n`;
    }

    let args = rioArgsForEndpoint[endpoint];
    args = args.concat(globalArgs);
    const argumentCount = args.length;

    if (argumentCount > 0) {
      content += 'Params:\n\n';

      content += '| Name | Type | Description |\n|--|--|--|\n';

      for (let j = 0; j < argumentCount; j += 1) {
        const argument = args[j];
        content += `| **${argument.name}** | \`${argument.type.name}\` | ${argument.description} (${argument.required ? '*Required' : 'Optional'})\n`;
      }
    } else {
      content += '_No parameters_\n';
    }
    content += '\n';

    content += '\nExample Request:\n';
    content += '```\n';
    if (type === 'GET') {
      if (argumentCount > 0) {
        for (let j = 0; j < argumentCount; j += 1) {
          const argument = args[j];
          if (j === 0) {
            content += `${formatEndpoint(endpoint)}?${argument.name}=${argument.type.example}`;
          } else {
            content += `&${argument.name}=${argument.type.example}`;
          }
        }
        content += '\n';
      } else {
        content += `${formatEndpoint(endpoint)}\n`;
      }
    } else {
      const lbSuffix = argumentCount > 0 ? '\n' : '';
      content += `{${lbSuffix}`;
      for (let j = 0; j < argumentCount; j += 1) {
        const argument = args[j];
        const suffix = j === argumentCount - 1 ? '' : ',';
        content += `  ${argument.name}: ${argument.type.example}${suffix}\n`;
      }
      content += '}\n';
    }
    content += '```\n';

    const response = rioExampleResultOfEndpoint[endpoint];
    if (response != null) {
      content += '\nExample Response:\n';
      content += '```\n';
      const formatted = JSON.stringify(response, null, 2);
      content += `${formatted}\n`;
      content += '```\n';
    }
  }
  return content;
}

function writeModule(module, isPublic, rc, globalArgs, moduleRoutes, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioArgsForEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint) {
  let content = `# ${module}\n\n`;

  let moduleDescription = '_No description for this module_';
  if (rc.modules && rc.modules[module]) {
    moduleDescription = rc.modules[module];
  }
  content += `${moduleDescription}\n\n`;

  content += getContentForRoutes(moduleRoutes, globalArgs, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioArgsForEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint);
  const fileName = `${pathForModule(module, isPublic)}-API.md`;
  writeToFile(fileName, content);
}

function writeNoModules(apiREADME, cnt, globalArgs, rioArgsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint) {
  let content = cnt;
  const endpoints = Object.keys(rioArgsForEndpoint);
  endpoints.sort();

  content += getContentForRoutes(endpoints, globalArgs, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioArgsForEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint);
  writeToFile(apiREADME, content);
}

function getRioRC(path) {
  if (path) {
    // eslint-disable-next-line
    const rc = require(`${path}/.riorc.js`);
    return rc;
  }
  return {};
}

function isInModule(route, module) {
  let parts = route.split('/');
  parts.shift();
  parts = `/${parts.join('/')}`;
  return parts.startsWith(module);
}

function isInMiscModule(route) {
  return route.split('/').length === 2;
}

function writeREADME(path, isPublic, paths, app, appName, globalArgs, rioArgsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint) {
  const { modules, routes } = router.getEndpoints(app, paths, rioStatusOfEndpoint, rioAvailabilityOfEndpoint, isPublic);
  routes.sort();
  const rc = getRioRC(path);

  let content = '';
  if (appName) {
    content += `# ${appName}\n\n`;
  }

  const apiModuleDirectory = `${isPublic ? 'Public-' : ''}API-Modules`;
  const apiREADME = `./${isPublic ? 'PUBLIC-' : ''}AUTOGENERATED-API-README.md`;

  if (modules.length > 0) {
    content += '## API Modules\n';
    fs.mkdir(apiModuleDirectory, { recursive: true }, (err) => {
      if (err) {
        console.log(`Failed to make directory API-Modules due to error ${err}`);
      } else {
        const routesForModule = {};
        let totalEndpoints = 0;
        for (let i = 0; i < modules.length; i += 1) {
          const module = modules[i];
          const moduleRoutes = routes.filter((route) => isInModule(route, module));
          routesForModule[module] = moduleRoutes;
          const moduleRoutesCount = moduleRoutes.length;
          content += `- [${module}](${pathForModule(module, isPublic)}-API.md) (${moduleRoutesCount} total endpoint${moduleRoutesCount === 1 ? '' : 's'})\n`;
          totalEndpoints += moduleRoutesCount;
        }
        const miscRoutes = routes.filter((route) => isInMiscModule(route));
        const miscRoutesCount = miscRoutes.length;
        content += `- [Misc](${apiModuleDirectory}/Misc-API.md) (${miscRoutesCount} total endpoint${miscRoutesCount === 1 ? '' : 's'})\n`;
        content += '\n';

        for (let i = 0; i < modules.length; i += 1) {
          const module = modules[i];
          const moduleRoutes = routesForModule[module];
          writeModule(module, isPublic, rc, globalArgs, moduleRoutes, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioArgsForEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint);
        }
        writeModule('Misc', isPublic, rc, globalArgs, miscRoutes, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioArgsForEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint);
        totalEndpoints += miscRoutesCount;

        content += `Total Endpoints: ${totalEndpoints}\n`;
        writeToFile(apiREADME, content);
      }
    });
  } else {
    writeNoModules(apiREADME, content, globalArgs, rioArgsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint);
  }
}

module.exports = {
  writeREADME,
};
