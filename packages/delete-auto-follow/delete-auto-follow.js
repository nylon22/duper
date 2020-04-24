const { handler } = require('./handler');

module.exports = {
  command: 'delete-auto-follow',
  describe: 'Delete a configured collection of auto-follow patterns on your follower cluster',
  builder: {
    auto_follow_pattern_name: {
      alias: 'p',
      desc: 'The auto-follow pattern name to delete ',
      type: 'string',
      demandOption: true,
    },
  },
  handler,
};
