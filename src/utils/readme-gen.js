const fs = require('fs');

function writeREADME(rioArgsForEndpoint, rioTypeOfEndpoint) {
  let content = '';

  const endpoints = Object.keys(rioArgsForEndpoint);
  endpoints.sort();
  const endpointCount = endpoints.length;

  for (let i = 0; i < endpointCount; i += 1) {
    const endpoint = endpoints[i];
    const type = rioTypeOfEndpoint[endpoint];
    const header = `${type} - ${endpoint}\n`;
    content += header;

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

  fs.writeFile('./API-README.md', content, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('The file was saved!');
  });
}

module.exports = {
  writeREADME,
};
