const { handler } = require('./handler');

module.exports = {
  command: 'unfollow',
  describe:
    'Stop the following task associated with a follower index on your follower cluster and remove index metadata and settings associated with cross-cluster replication. This enables the index to be treated as a regular index. The follower index must be paused and closed before running the unfollow command.',
  builder: {
    follower_index: {
      alias: 'f',
      desc: 'The name of the index to unfollow on your follower cluster.',
      type: 'string',
      demandOption: true,
    },
  },
  handler,
};
