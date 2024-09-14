const fs = require('fs');

function getRioRC(path) {
  if (path) {
    // eslint-disable-next-line
    return require(`${path}/.riorc.js`);
  }

  // eslint-disable-next-line
  return require(`${process.cwd()}/.riorc.js`);
}

function formatEndpoint(route, version = 1) {
  let parts = route.split('/');
  if (version === 1) {
    parts.shift();
    parts = `/${parts.join('/')}`;
  } else {
    parts = `[${parts[0]}] — ${parts.slice(1).join('/')}`;
  }
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

function removeModule(route, module) {
  const parts = route.split(module);
  const withoutModule = parts.length === 1 ? parts[0] : parts[1];
  return withoutModule;
}

function isInModule(rc, route, module, modules) {
  let parts = route.split('/');
  parts.shift();
  parts = `/${parts.join('/')}`;

  if (rc && rc.modules) {
    const modulesInRc = Object.keys(rc.modules);
    for (let i = 0; i < modulesInRc.length; i += 1) {
      const m = modulesInRc[i];
      if (module.startsWith(m) && parts.startsWith(m)) {
        return true;
      }
    }
  }

  let longestMatchCount = -1;
  let longestModule = null;

  for (let i = 0; i < modules.length; i += 1) {
    const m = modules[i];
    if (parts.startsWith(m) && m.length > longestMatchCount) {
      longestMatchCount = m.length;
      longestModule = m;
    }
  }

  return longestModule === module;
}

function isInMiscModule(route) {
  return route.split('/').length === 2;
}

module.exports = {
  getRioRC,
  formatEndpoint,
  writeToFile,
  removeModule,
  isInModule,
  isInMiscModule,
};
