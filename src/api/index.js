function post(app, endpoint, callback) {
  app.post(endpoint, callback);
}

function get(app, endpoint, callback) {
  app.get(endpoint, callback);
}

module.exports = {
  post,
  get,
};
