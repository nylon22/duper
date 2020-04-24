const { handler } = require('./handler');

module.exports = {
  command: 'connect',
  describe: 'Enable connectivity between your follower cluster and your leader cluster',
  builder: {
    seeds: {
      alias: 's',
      desc:
        'The seed nodes on your leader cluster that your follower cluster should pull from. Whereas the default port for HTTP communication on an Elasticsearch node is 9200, the default port for node-to-node communication is 9300. Replication uses node-to-node communication.',
      type: 'array',
      demandOption: true,
    },
  },
  handler,
};
