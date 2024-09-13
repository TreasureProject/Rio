const fs = require('fs');
const router = require('./router');
const {
  getRioRC,
  formatEndpoint,
  writeToFile,
  isInModule,
  isInMiscModule,
} = require('./rc');

function pathForModule(module, isPublic) {
  const apiModuleDirectory = `${isPublic ? 'Public-' : ''}API-Modules`;

  let parsed = module.split('/').join('-');
  parsed = parsed.replace('-', '/');
  if (parsed.substring(0, 1) !== '/') {
    parsed = `/${parsed}`;
  }
  return `${apiModuleDirectory}${parsed}`;
}

function getContentForRoutes(endpoints, globalArgs, rioIgnoreGlobalsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioArgsForEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint) {
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

    const status = rioStatusOfEndpoint[endpoint];
    if (status && status.name) {
      const statusText = status.name.toUpperCase();
      content += `**Status**: ${statusText}\n\n`;
    }

    const availability = rioAvailabilityOfEndpoint[endpoint];
    if (availability && availability.name) {
      const availabilityText = availability.name.toUpperCase();
      content += `**Availability**: ${availabilityText}\n\n`;
    }

    const description = rioDescriptionOfEndpoint[endpoint];
    if (description != null) {
      content += `#### Description:\n- ${description}\n\n`;
    }

    let args = rioArgsForEndpoint[endpoint];
    const ignoreGlobalArgs = rioIgnoreGlobalsForEndpoint[endpoint];
    if (!ignoreGlobalArgs) {
      args = args.concat(globalArgs);
    }
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
            content += `${formatEndpoint(endpoint)}?${argument.name}=${argument.exampleValue}`;
          } else {
            content += `&${argument.name}=${argument.exampleValue}`;
          }
        }
        content += '\n';
      } else {
        content += `${formatEndpoint(endpoint)}\n`;
      }
    } else {
      const argDct = {};
      for (let j = 0; j < argumentCount; j += 1) {
        const argument = args[j];
        argDct[argument.name] = argument.exampleValue;
      }
      const formatted = JSON.stringify(argDct, null, 2);
      content += `${formatted}\n`;
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

function writeModule(module, isPublic, rc, globalArgs, rioIgnoreGlobalsForEndpoint, moduleRoutes, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioArgsForEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint) {
  let content = `# ${module}\n\n`;

  let moduleDescription = '_No description for this module_';
  if (rc.modules && rc.modules[module]) {
    moduleDescription = rc.modules[module];
  }
  content += `${moduleDescription}\n\n`;

  content += getContentForRoutes(moduleRoutes, globalArgs, rioIgnoreGlobalsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioArgsForEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint);
  const fileName = `${pathForModule(module, isPublic)}-API.md`;
  writeToFile(fileName, content);
}

function writeNoModules(apiREADME, cnt, globalArgs, rioIgnoreGlobalsForEndpoint, rioArgsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint) {
  let content = cnt;
  const endpoints = Object.keys(rioArgsForEndpoint);
  endpoints.sort();

  content += getContentForRoutes(endpoints, globalArgs, rioIgnoreGlobalsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioArgsForEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint);
  writeToFile(apiREADME, content);
}

function writeREADME(path, isPublic, paths, app, appName, globalArgs, rioArgsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint, rioIgnoreGlobalsForEndpoint) {
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
        /* istanbul ignore next */
        console.log(`Failed to make directory API-Modules due to error ${err}`);
      } else {
        const routesForModule = {};
        let totalEndpoints = 0;
        for (let i = 0; i < modules.length; i += 1) {
          const module = modules[i];
          const moduleRoutes = routes.filter((route) => isInModule(route, module, modules));
          routesForModule[module] = moduleRoutes;
          const moduleRoutesCount = moduleRoutes.length;
          if (moduleRoutesCount > 0) {
            content += `- [${module}](${pathForModule(module, isPublic)}-API.md) (${moduleRoutesCount} total endpoint${moduleRoutesCount === 1 ? '' : 's'})\n`;
          }
          totalEndpoints += moduleRoutesCount;
        }
        const miscRoutes = routes.filter((route) => isInMiscModule(route));
        const miscRoutesCount = miscRoutes.length;
        if (miscRoutesCount > 0) {
          content += `- [Misc](${apiModuleDirectory}/Misc-API.md) (${miscRoutesCount} total endpoint${miscRoutesCount === 1 ? '' : 's'})\n`;
        }
        content += '\n';

        for (let i = 0; i < modules.length; i += 1) {
          const module = modules[i];
          const moduleRoutes = routesForModule[module];
          writeModule(module, isPublic, rc, globalArgs, rioIgnoreGlobalsForEndpoint, moduleRoutes, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioArgsForEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint);
        }
        writeModule('Misc', isPublic, rc, globalArgs, rioIgnoreGlobalsForEndpoint, miscRoutes, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioArgsForEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint);
        totalEndpoints += miscRoutesCount;

        content += `Total Endpoints: ${totalEndpoints}\n`;
        writeToFile(apiREADME, content);
      }
    });
  } else {
    writeNoModules(apiREADME, content, globalArgs, rioIgnoreGlobalsForEndpoint, rioArgsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioExampleResultOfEndpoint, rioStatusOfEndpoint, rioAvailabilityOfEndpoint);
  }
}

module.exports = {
  writeREADME,
};
