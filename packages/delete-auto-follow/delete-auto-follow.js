const { handler } = require('./handler');

module.exports = {
  command: 'delete-auto-follow',
  describe: 'Delete a configured collection of auto-follow patterns.',
  builder: {
    auto_follow_pattern_name: {
      alias: 'p',
      desc: 'Delete a configured collection of auto-follow patterns.',
      type: 'string',
      demandOption: true,
    },
  },
  handler,
};
