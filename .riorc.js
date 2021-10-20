module.exports = {
  modules: {
    '/math': 'All math related functionality',
    'Misc': 'All other endpoints',
    '/v2': 'V2 API documentation',
  },
  errorModel: {
    errorText: {
      type: 'string',
    },
  },
  apiKeys: [
    'key1',
    'key2',
  ],
  license: 'MIT',
  servers: [
    'https://dev-api.com',
  ],
  errorExample: {
    errorText: 'Error!',
  },
};
