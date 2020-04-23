const { handler } = require('./handler');

module.exports = {
  command: 'add-remote-cluster',
  describe:
    'Add a remote cluster to the current cluster. Your current cluster should be your follower cluster. The remote cluster is the name of the leader cluster. This command sets up connectivity for the follower cluster to be able to follow the leader (remote) cluster',
  builder: {
    remote_cluster: {
      alias: 'r',
      desc: 'The name of the leader cluster that the current (follower) cluster should pull from',
      type: 'string',
      demandOption: true,
    },
    seeds: {
      alias: 's',
      desc:
        'The seed nodes on the leader (remote) cluster that the current (follower) cluster should pull from. Whereas the default port for HTTP communication on an Elasticsearch node is 9200, the default port for node-to-node communication is 9300. Replication uses node-to-node communication.',
      type: 'array',
      demandOption: true,
    },
  },
  handler,
};
