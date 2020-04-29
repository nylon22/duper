const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'info',
  describe: 'List the parameters and the status for follower indices on your follower cluster',
  builder,
  handler,
};
