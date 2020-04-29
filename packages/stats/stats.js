const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'stats',
  describe: 'Get follower stats on your follower cluster.',
  builder,
  handler,
};
