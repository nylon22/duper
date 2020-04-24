const { handler } = require('./handler');

module.exports = {
  command: 'pause-auto-follow',
  describe: 'Pause an auto-follow pattern on your follower cluster.',
  builder: {
    auto_follow_pattern_name: {
      alias: 'p',
      desc: 'Name of the auto-follow pattern to pause.',
      type: 'string',
      demandOption: true,
    },
  },
  handler,
};
