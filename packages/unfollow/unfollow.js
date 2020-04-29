const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'unfollow',
  describe:
    'Stop the following task associated with a follower index on your follower cluster and remove index metadata and settings associated with cross-cluster replication. This enables the index to be treated as a regular index. The follower index must be paused and closed before running the unfollow command.',
  builder,
  handler,
};
