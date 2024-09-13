function getEndpoints(app, paths, rioStatusOfEndpoint = {}, rioAvailabilityOfEndpoint = {}, isPublic = true) {
  const routes = [];
  const addedModule = {};
  const modules = [];
  const moduleForEndpoints = {};

  function addModule(endpoint) {
    const parts = endpoint.path.split('/');
    parts.shift();
    if (parts.length > 1) {
      parts.pop();

      if (parts.length > 0) {
        let module = parts.join('/');
        module = `/${module}`;
        if (addedModule[module] == null) {
          addedModule[module] = true;
          modules.push(module);
        }
      }
    }
  }

  function getModuleForEndpoint(endpoint) {
    let longestMatchCount = -1;
    let longestModule = null;

    for (let i = 0; i < modules.length; i += 1) {
      const module = modules[i];
      if (endpoint.path.startsWith(module) && module.length > longestMatchCount) {
        longestMatchCount = module.length;
        longestModule = module;
      }
    }

    return longestModule;
  }

  function addPath(endpoint) {
    const parts = endpoint.path.split('/');
    parts.shift();
    const formatted = `${Object.keys(endpoint.methods)[0].toUpperCase()}${endpoint.path}`;
    if (parts.length > 1) {
      parts.pop();

      if (parts.length > 0) {
        const module = getModuleForEndpoint(endpoint);
        if (module) {
          moduleForEndpoints[formatted] = module;
        }
      }
    }

    let canAdd = true;
    if (isPublic) {
      const status = rioStatusOfEndpoint[formatted] ? rioStatusOfEndpoint[formatted].name : 'live';
      const availability = rioAvailabilityOfEndpoint[formatted] ? rioAvailabilityOfEndpoint[formatted].name : 'public';
      if (status !== 'live' || availability !== 'public') {
        canAdd = false;
        if (process.env.JEST_WORKER_ID === undefined) {
          /* istanbul ignore next */
          console.log(`Cannot add ${formatted} because the status was ${status} and the availability was ${availability}`);
        }
      }
    }

    if (canAdd) {
      routes.push(formatted);
    }
  }

  const endpoints = Object.keys(paths);
  const pathsCount = endpoints.length;
  for (let i = 0; i < pathsCount; i += 1) {
    const endpointPath = endpoints[i];
    const endpoint = paths[endpointPath];
    addModule(endpoint);
  }

  app._router.stack.forEach((middleware) => {
    const endpoint = middleware.route;
    if (endpoint && endpoint.path && !Array.isArray(endpoint.path)) {
      addModule(endpoint);
    }
  });

  app._router.stack.forEach((middleware) => {
    const endpoint = middleware.route;
    if (endpoint && endpoint.path && !Array.isArray(endpoint.path)) {
      addPath(endpoint);
    }
  });

  for (let i = 0; i < pathsCount; i += 1) {
    const endpointPath = endpoints[i];
    const endpoint = paths[endpointPath];
    addPath(endpoint);
  }

  return { routes, modules, moduleForEndpoints };
}

module.exports = {
  getEndpoints,
};
