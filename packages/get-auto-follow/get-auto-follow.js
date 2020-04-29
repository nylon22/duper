const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'get-auto-follow',
  describe: 'Get configured auto-follow patterns on your follower cluster.',
  builder,
  handler,
};
