const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'connect',
  describe: 'Enable connectivity between your follower cluster and your leader cluster',
  builder,
  handler,
};
