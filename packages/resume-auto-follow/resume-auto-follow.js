const { handler } = require('./handler');

module.exports = {
  command: 'resume-auto-follow',
  describe: 'Resume an auto-follow pattern.',
  builder: {
    auto_follow_pattern_name: {
      alias: 'p',
      desc: 'Name of the auto-follow pattern to resume.',
      type: 'string',
      demandOption: true,
    },
  },
  handler,
};
