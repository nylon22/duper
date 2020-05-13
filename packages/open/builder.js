const builder = {
  follower_index: {
    alias: 'f',
    desc: 'The name of the index to open on your follower cluster.',
    type: 'string',
    demandOption: false,
  },
  leader_index: {
    alias: 'l',
    desc: 'The name of the index to open on your leader cluster',
    type: 'string',
    demandOption: false,
  },
  allow_no_indices: {
    desc:
      'If `true`, the request does not return an error if a wildcard expression or `_all` value retrieves only missing or closed indices. Defaults to `true`',
    type: 'boolean',
    demandOption: false,
  },
  expand_wildcards: {
    desc: 'Controls what kind of indices that wildcard expressions can expand to.',
    choices: ['all', 'open', 'closed', 'hidden', 'none'],
    demandOption: false,
  },
  ignore_unavailable: {
    desc:
      'If `true`, missing or closed indices are not included in the response. Defaults to `false`.',
    type: 'boolean',
    demandOption: false,
  },
  wait_for_active_shards: {
    desc:
      'The number of shard copies that must be active before proceeding with the operation. Set to `all` or any positive integer up to the total number of shards in the index (number_of_replicas+1). Default: 1, the primary shard.',
    type: 'string',
    demandOption: false,
  },
  master_timeout: {
    desc:
      'Specifies the period of time to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. Defaults to `30s`.',
    type: 'string',
    demandOption: false,
  },
  timeout: {
    desc:
      'Specifies the period of time to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. Defaults to `30s`.',
    type: 'string',
    demandOption: false,
  },
};

module.exports = { builder };
