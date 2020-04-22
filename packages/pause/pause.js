const { handler } = require('./handler');

module.exports = {
  command: 'pause',
  describe:
    'Pause a follower index on the current cluster. After running this command, the follower index will not fetch any additional operations from the leader index. You can resume following by running "duper follow [options]". Pausing and resuming a follower index can be used to change the configuration of the following task.',
  builder: {
    follower_index: {
      alias: 'f',
      desc:
        'The name of the index to pause following in the current cluster. You can set the current cluster by running "duper config switch-cluster [options]"',
      type: 'string',
      demandOption: true,
    },
  },
  handler,
};
