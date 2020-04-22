const { handler } = require('./handler');

module.exports = {
  command: 'forget',
  describe:
    'A following index takes out retention leases on its leader index. These retention leases are used to increase the likelihood that the shards of the leader index retain the history of operations that the shards of the following index need to execute replication. When a follower index is converted to a regular index via the unfollow command (either via explicit execution of this command, or implicitly via index lifecycle management), these retention leases are removed. However, removing these retention leases can fail (e.g., if the remote cluster containing the leader index is unavailable). While these retention leases will eventually expire on their own, their extended existence can cause the leader index to hold more history than necessary, and prevent index lifecycle management from performing some operations on the leader index. This command exists to enable manually removing these retention leases on the current clusterwhen the unfollow command was unable to do so.',
  builder: {
    leader_index: {
      desc:
        'The name of the leader index.',
      type: 'string',
      demandOption: true,
    },
    follower_cluster: {
      desc:
        'The name of the cluster containing the follower index.',
      type: 'string',
      demandOption: true,
    },
    follower_index: {
      desc:
        'The name of the follower index.',
      type: 'string',
      demandOption: true,
    },
    follower_index_uuid: {
      desc:
        'The UUID of the follower index.',
      type: 'string',
      demandOption: true,
    },
    leader_remote_cluster: {
      desc:
        'The alias (from the perspective of the cluster containing the follower index) of the remote cluster containing the leader index.',
      type: 'string',
      demandOption: true,
    },
  },
  handler,
};
