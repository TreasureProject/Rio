function getEndpoints(app, paths) {
  const routes = [];
  const addedModule = {};
  const modules = [];

  function addPath(endpoint) {
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

    const formatted = `${Object.keys(endpoint.methods)[0].toUpperCase()}${endpoint.path}`;
    routes.push(formatted);
  }

  app._router.stack.forEach((middleware) => {
    const endpoint = middleware.route;
    if (endpoint && endpoint.path && !Array.isArray(endpoint.path)) {
      addPath(endpoint);
    }
  });

  const endpoints = Object.keys(paths);
  const pathsCount = endpoints.length;
  for (let i = 0; i < pathsCount; i += 1) {
    const endpointPath = endpoints[i];
    const endpoint = paths[endpointPath];
    addPath(endpoint);
  }
  return { routes, modules };
}

module.exports = {
  getEndpoints,
};
