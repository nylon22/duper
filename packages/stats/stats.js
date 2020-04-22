const { handler } = require('./handler');

module.exports = {
  command: 'stats',
  describe:
    'This command gets follower stats. This command will return shard-level stats about the following tasks associated with each shard for the specified indices.',
  builder: {
    index: {
      alias: 'i',
      desc: 'Index patterns to retrieve stats for',
      type: 'array',
      demandOption: true,
    },
  },
  handler,
};
