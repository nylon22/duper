const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'pause-auto-follow',
  describe: 'Pause an auto-follow pattern on your follower cluster.',
  builder,
  handler,
};
