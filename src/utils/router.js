function getEndpoints(app) {
  const routes = [];
  const addedModule = {};
  const modules = [];

  app._router.stack.forEach((middleware) => {
    const endpoint = middleware.route;
    if (endpoint) {
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
      // console.log(parts);
      routes.push(endpoint.path);
    }
  });
  return { routes, modules };
}

module.exports = {
  getEndpoints,
};
