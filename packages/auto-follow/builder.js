const builder = {
  auto_follow_pattern_name: {
    desc: 'The name of the collection of auto-follow patterns',
    alias: 'p',
    type: 'string',
    demandOption: true,
  },
  leader_index_patterns: {
    desc: 'An array of simple index patterns to match against indices in your leader cluster',
    alias: 'l',
    type: 'array',
  },
  follow_index_pattern: {
    desc:
      'The name of follower index. The template {{leader_index}} can be used to derive the name of the follower index from the name of the leader index.',
    alias: 'f',
    type: 'string',
  },
  max_read_request_operation_count: {
    desc: 'The maximum number of operations to pull per read from your leader cluster.',
    type: 'number',
  },
  max_outstanding_read_requests: {
    desc: 'The maximum number of outstanding reads requests from your leader cluster.',
    type: 'number',
  },
  max_read_request_size: {
    desc: 'The maximum total bytes of operations per bulk write request executed on the follower.',
    type: 'string',
  },
  max_write_request_operation_count: {
    desc: 'The maximum number of operations per bulk write request executed on the follower.',
    type: 'number',
  },
  max_write_request_size: {
    desc: 'The maximum total bytes of operations per bulk write request executed on the follower.',
    type: 'string',
  },
  max_outstanding_write_requests: {
    desc: 'The maximum number of outstanding write requests on the follower.',
    type: 'number',
  },
  max_write_buffer_count: {
    desc:
      'The maximum number of operations that can be queued for writing. When this limit is reached, reads from your leader cluster will be deferred until the number of queued operations goes below the limit.',
    type: 'number',
  },
  max_write_buffer_size: {
    desc:
      'The maximum total bytes of operations that can be queued for writing. When this limit is reached, reads from your leader cluster will be deferred until the total bytes of queued operations goes below the limit.',
    type: 'string',
  },
  max_retry_delay: {
    desc:
      'The maximum time to wait before retrying an operation that failed exceptionally. An exponential backoff strategy is employed when retrying.',
    type: 'string',
  },
  read_poll_timeout: {
    desc:
      'The maximum time to wait for new operations on your leader cluster when the follower index is synchronized with the leader index. When the timeout has elapsed, the poll for operations will return to the follower so that it can update some statistics. Then the follower will immediately attempt to read from the leader again.',
    type: 'string',
  },
};

module.exports = { builder };
