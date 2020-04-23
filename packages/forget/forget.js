const { handler } = require('./handler');

module.exports = {
  command: 'forget',
  describe:
    'Manually remove retention leases on the current cluster when the unfollow command was unable to do so.',
  builder: {
    leader_index: {
      desc: 'The name of the leader index.',
      type: 'string',
      demandOption: true,
    },
    follower_cluster: {
      desc: 'The name of the cluster containing the follower index.',
      type: 'string',
      demandOption: true,
    },
    follower_index: {
      desc: 'The name of the follower index.',
      type: 'string',
      demandOption: true,
    },
    follower_index_uuid: {
      desc: 'The UUID of the follower index.',
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
