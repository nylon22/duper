const { handler } = require('./handler');

module.exports = {
  command: 'stats',
  describe: 'Get follower stats on your follower cluster.',
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
