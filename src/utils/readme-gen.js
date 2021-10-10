const fs = require('fs');

function writeREADME(rioArgsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint, appName) {
  let content = '';

  const endpoints = Object.keys(rioArgsForEndpoint);
  endpoints.sort();
  const endpointCount = endpoints.length;

  if (appName) {
    content += `# ${appName}\n\n`;
  }

  for (let i = 0; i < endpointCount; i += 1) {
    if (i !== 0) {
      content += '___\n';
    }

    const endpoint = endpoints[i];
    const type = rioTypeOfEndpoint[endpoint];
    const header = `\`\`\`\n${type} - ${endpoint}\n\`\`\`\n\n`;
    content += header;

    const description = rioDescriptionOfEndpoint[endpoint];
    content += `#### Description:\n- ${description}\n\n`;

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
