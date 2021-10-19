const { getEndpoints } = require('./router');
const { writeREADME } = require('./readme-gen');
const { oasGenerate } = require('./oas');

module.exports = {
  getEndpoints,
  writeREADME,
  oasGenerate,
};
