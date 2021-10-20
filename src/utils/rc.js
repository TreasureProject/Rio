const fs = require('fs');

function getRioRC(path) {
  if (path) {
    // eslint-disable-next-line
    const rc = require(`${path}/.riorc.js`);
    return rc;
  }
  return {};
}

function formatEndpoint(route) {
  let parts = route.split('/');
  parts.shift();
  parts = `/${parts.join('/')}`;
  return parts;
}

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

module.exports = {
  getRioRC,
  formatEndpoint,
  writeToFile,
};
