const { handler } = require('./handler');

module.exports = {
  command: 'follow',
  describe:
    'This command creates a new follower index on the current cluster that is configured to follow the referenced leader index. After running this command, the follower index exists, and cross-cluster replication starts replicating operations from the leader index to the follower index.',
  builder: {
    follower_index: {
      alias: 'f',
      desc: 'The name of the index to create in the follower cluster. The follower cluster is the current cluster. You can set the current cluster by running "duper config switch-cluster [options]"',
      type: 'string',
      demandOption: true,
    },
    leader_index: {
      alias: 'l',
      desc: 'The name of the index in the leader cluster to follow.',
      type: 'string',
      demandOption: true,
    },
    remote_cluster: {
      alias: 'r',
      desc: 'The name of the remote cluster containing the leader index.',
      type: 'string',
      demandOption: true,
    },
    wait_for_active_shards: {
      desc:
        'Specifies the number of shards to wait on being active before responding. This defaults to waiting on none of the shards to be active. A shard must be restored from the leader index being active. Restoring a follower shard requires transferring all the remote Lucene segment files to the follower index.',
      type: 'number',
    },
    max_read_request_operation_count: {
      desc:
        'The maximum number of operations to pull per read from the remote cluster.',
      type: 'number',
    },
    max_outstanding_read_requests: {
      desc:
        'The maximum number of outstanding reads requests from the remote cluster.',
      type: 'number',
    },
    max_read_request_size: {
      desc:
        'The maximum total bytes of operations per bulk write request executed on the follower.',
      type: 'string',
    },
    max_write_request_operation_count: {
      desc:
        'The maximum number of operations per bulk write request executed on the follower.',
      type: 'number',
    },
    max_write_request_size: {
      desc:
        'The maximum total bytes of operations per bulk write request executed on the follower.',
      type: 'string',
    },
    max_outstanding_write_requests: {
      desc: 'The maximum number of outstanding write requests on the follower.',
      type: 'number',
    },
    max_write_buffer_count: {
      desc:
        'The maximum number of operations that can be queued for writing. When this limit is reached, reads from the remote cluster will be deferred until the number of queued operations goes below the limit.',
      type: 'number',
    },
    max_write_buffer_size: {
      desc:
        'The maximum total bytes of operations that can be queued for writing. When this limit is reached, reads from the remote cluster will be deferred until the total bytes of queued operations goes below the limit.',
      type: 'string',
    },
    max_retry_delay: {
      desc:
        'The maximum time to wait before retrying an operation that failed exceptionally. An exponential backoff strategy is employed when retrying.',
      type: 'string',
    },
    read_poll_timeout: {
      desc:
        'The maximum time to wait for new operations on the remote cluster when the follower index is synchronized with the leader index. When the timeout has elapsed, the poll for operations will return to the follower so that it can update some statistics. Then the follower will immediately attempt to read from the leader again.',
      type: 'string',
    },
  },
  handler,
};
