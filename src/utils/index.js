const { getEndpoints } = require('./router');
const { writeREADME } = require('./readme-gen');
const { oasGenerate } = require('./oas');
const { getRioRC } = require('./rc');

module.exports = {
  getEndpoints,
  writeREADME,
  oasGenerate,
  getRioRC,
};
