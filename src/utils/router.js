function getEndpoints(app) {
  const routes = [];
  const addedModule = {};
  const modules = [];

  app._router.stack.forEach((middleware) => {
    const endpoint = middleware.route;
    if (endpoint) {
      if (endpoint.path && !Array.isArray(endpoint.path)) {
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
    }
  });
  return { routes, modules };
}

module.exports = {
  getEndpoints,
};
