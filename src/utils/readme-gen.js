const fs = require('fs');

function writeREADME(rioArgsForEndpoint, rioTypeOfEndpoint, rioDescriptionOfEndpoint) {
  let content = '';

  const endpoints = Object.keys(rioArgsForEndpoint);
  endpoints.sort();
  const endpointCount = endpoints.length;

  for (let i = 0; i < endpointCount; i += 1) {
    const endpoint = endpoints[i];
    const type = rioTypeOfEndpoint[endpoint];
    const header = `${type} - ${endpoint}\n`;
    content += header;

    const description = rioDescriptionOfEndpoint[endpoint];
    content += `Description:\n- ${description}\n`;

    const args = rioArgsForEndpoint[endpoint];
    const argumentCount = args.length;

    if (argumentCount > 0) {
      for (let j = 0; j < argumentCount; j += 1) {
        const argument = args[j];
        content += `- ${argument.name} : ${argument.type.name} ${argument.description} (${argument.required ? '*Required' : 'Optional'})\n`;
      }
    } else {
      content += 'No parameters';
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
