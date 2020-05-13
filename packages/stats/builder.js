const builder = {
  index: {
    alias: 'i',
    desc:
      'Indices to retrieve stats for. If not provided, stats for all follower indices are listed',
    type: 'array',
  },
  level: {
    alias: 'l',
    desc: 'Specify whether to get stats at the shard or the cluster level',
    choices: ['shard', 'cluster'],
    default: 'shard',
  },
};

module.exports = { builder };
