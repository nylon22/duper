# @duper/auto-follow

> Create a new named collection of auto-follow patterns against the remote cluster specified in the options. Newly created indices on the remote cluster matching any of the specified patterns will be automatically configured as follower indices.

## Usage

```sh
$ duper auto-follow [options]
```

### Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | -------- | -------- |
| `auto_follow_pattern_name` | The name of the collection of auto-follow patterns | `string` | | **True** |
| `remote_cluster` | The remote cluster containing the leader indices to match against. | `string` | | **True** |
| `leader_index_patterns` | An array of simple index patterns to match against indices in the remote cluster specified by the `remote_cluster` option. | `array` | | False |
| `follow_index_pattern` | The name of follower index. The template {{leader_index}} can be used to derive the name of the follower index from the name of the leader index. | `string` | | False |
| `max_read_request_operation_count` | The maximum number of operations to pull per read from the remote cluster. | `number` | | False |
| `max_outstanding_read_requests` | The maximum number of outstanding reads requests from the remote cluster. | `number` | | False |
| `max_read_request_size` | The maximum total bytes of operations per bulk write request executed on the follower. | `string` | | False |
| `max_write_request_operation_count` | The maximum number of operations per bulk write request executed on the follower. | `number` | | False |
| `max_write_request_size` | The maximum total bytes of operations per bulk write request executed on the follower. | `string` | | False |
| `max_outstanding_write_requests` | The maximum number of outstanding write requests on the follower. | `number` | | False |
| `max_write_buffer_count` | The maximum number of operations that can be queued for writing. When this limit is reached, reads from the remote cluster will be deferred until the number of queued operations goes below the limit. | `number` | | False |
| `max_write_buffer_size` | The maximum total bytes of operations that can be queued for writing. When this limit is reached, reads from the remote cluster will be deferred until the total bytes of queued operations goes below the limit. | `string` | | False |
| `max_retry_delay` | The maximum time to wait before retrying an operation that failed exceptionally. An exponential backoff strategy is employed when retrying. | `string` | | False |
| `read_poll_timeout` | The maximum time to wait for new operations on the remote cluster when the follower index is synchronized with the leader index. When the timeout has elapsed, the poll for operations will return to the follower so that it can update some statistics. Then the follower will immediately attempt to read from the leader again. | `string` | | False |

### Additional Information

For additional information, including the defaults for options, see the [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-put-auto-follow-pattern.html)
