const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'pause',
  describe: 'Pause a follower index on your follower cluster.',
  builder,
  handler,
};
