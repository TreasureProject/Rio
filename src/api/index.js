function post(app, endpoint, callback) {
  app.post(endpoint, ((req, res, next) => {
    callback(req, res, next);
  }));
}

function get(app, endpoint, callback) {
  app.get(endpoint, callback);
}

module.exports = {
  post,
  get,
};
