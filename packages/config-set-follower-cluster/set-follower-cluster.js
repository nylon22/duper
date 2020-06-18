const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'set-follower-cluster',
  describe: 'Set your follower cluster',
  builder,
  handler,
};


