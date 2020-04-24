const { handler } = require('./handler');

module.exports = {
  command: 'enable-soft-deletes',
  describe:
    'Enable soft deletes for a specified index on your leader cluster. Soft deletes are required for an index to serve as a leader index for CCR',
  builder: {
    leader_index: {
      alias: 'l',
      desc:
        'The name of the leader index on your leader cluster that soft deletes should be enabled for.',
      type: 'string',
      demandOption: true,
    },
  },
  handler,
};
