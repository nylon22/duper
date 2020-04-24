const { handler } = require('./handler');

module.exports = {
  command: 'info',
  describe:
    'List the parameters and the status for each follower index on your follower cluster. For example, the results include follower index names, leader index names, replication options and whether the follower indices are active or paused.',
  builder: {
    index: {
      alias: 'i',
      desc: 'Index patterns to retrieve info about',
      type: 'array',
      demandOption: true,
    },
  },
  handler,
};
