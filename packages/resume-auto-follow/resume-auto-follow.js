const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'resume-auto-follow',
  describe: 'Resume an auto-follow pattern on your follower cluster',
  builder,
  handler,
};
