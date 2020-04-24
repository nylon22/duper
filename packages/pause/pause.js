const { handler } = require('./handler');

module.exports = {
  command: 'pause',
  describe: 'Pause a follower index on your follower cluster.',
  builder: {
    follower_index: {
      alias: 'f',
      desc: 'The name of the index to pause following on your follower cluster.',
      type: 'string',
      demandOption: true,
    },
  },
  handler,
};
