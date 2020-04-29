const builder = {
  index: {
    alias: 'i',
    desc: 'Index patterns to retrieve stats for',
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
