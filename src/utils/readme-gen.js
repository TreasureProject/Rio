const fs = require('fs');

function writeREADME(rioArgsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint, rioExampleResultOfEndpoint, appName) {
  let content = '';

  const endpoints = Object.keys(rioArgsForEndpoint);
  endpoints.sort();
  const endpointCount = endpoints.length;

  if (appName) {
    content += `# ${appName}\n\n`;
  }

  if (endpointCount > 0) {
    content += '## Table of Contents\n';
    for (let i = 0; i < endpointCount; i += 1) {
      const endpoint = endpoints[i];
      content += `- [${endpoint}](#endpt-${i + 1})\n`;
    }
    content += '\n';
  }

  for (let i = 0; i < endpointCount; i += 1) {
    content += '___\n';
    content += `###### endpt #${i + 1}\n`;

    const endpoint = endpoints[i];
    const type = rioTypeOfEndpoint[endpoint];
    const header = `\`\`\`\n${type} - ${endpoint}\n\`\`\`\n\n`;
    content += header;

    const description = rioDescriptionOfEndpoint[endpoint];
    if (description != null) {
      content += `#### Description:\n- ${description}\n\n`;
    }

    const args = rioArgsForEndpoint[endpoint];
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
            content += `${endpoint}?${argument.name}=${argument.type.example}`;
          } else {
            content += `&${argument.name}=1`;
          }
        }
        content += '\n';
      } else {
        content += `${endpoint}\n`;
      }
    } else {
      content += '{\n';
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

  /* istanbul ignore next */
  if (process.env.JEST_WORKER_ID === undefined) {
    fs.writeFile('./API-README.md', content, (err) => {
      if (err) {
        console.log(err);
      }
      console.log('The file was saved!');
    });
  }
}

module.exports = {
  writeREADME,
};
