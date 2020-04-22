const { handler } = require('./handler');

module.exports = {
  command: 'unfollow',
  describe:
    'Stop the following task associated with a follower index on the current cluster and remove index metadata and settings associated with cross-cluster replication. This enables the index to treated as a regular index. The follower index must be paused and closed before running the unfollow command.',
  builder: {
    follower_index: {
      alias: 'f',
      desc:
        'The name of the index to unfollow in the current cluster. You can set the current cluster by running "duper config switch-cluster [options]"',
      type: 'string',
      demandOption: true,
    },
  },
  handler,
};
