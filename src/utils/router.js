function getEndpoints(app) {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      routes.push(middleware.route);
    }
  });
  return routes;
}

module.exports = {
  getEndpoints,
};
