const { handler } = require('./handler');

module.exports = {
  command: 'resume',
  describe:
    'This command resumes a follower index on the current cluster that has been paused either explicitly with the duper pause command or implicitly due to execution that can not be retried due to failure during following. After running this command, the follower index will resume fetching operations from the leader index.',
  builder: {
    follower_index: {
      alias: 'f',
      desc:
        'The name of the index to resume following in the follower cluster. The follower cluster is the current cluster. You can set the current cluster by running "duper config switch-cluster [options]"',
      type: 'string',
      demandOption: true,
    },
    max_read_request_operation_count: {
      desc: 'The maximum number of operations to pull per read from the remote cluster.',
      type: 'number',
    },
    max_outstanding_read_requests: {
      desc: 'The maximum number of outstanding reads requests from the remote cluster.',
      type: 'number',
    },
    max_read_request_size: {
      desc:
        'The maximum total bytes of operations per bulk write request executed on the follower.',
      type: 'string',
    },
    max_write_request_operation_count: {
      desc: 'The maximum number of operations per bulk write request executed on the follower.',
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
