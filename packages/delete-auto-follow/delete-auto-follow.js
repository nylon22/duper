const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'delete-auto-follow',
  describe: 'Delete a configured collection of auto-follow patterns on your follower cluster',
  builder,
  handler,
};
