---
title: Resume 
description: Resume a follower index on your follower cluster that has been paused either explicitly with the duper pause command or implicitly due to execution that can not be retried due to failure during following. After running this command, the follower index will resume fetching operations from the leader index.
---

## Usage

```sh
duper resume [options]
```

## Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | -------- | -------- |
| `follower_index` | The name of the index to resume following on your follower cluster. | `string` | `f` | **True** |
| `max_read_request_operation_count` | The maximum number of operations to pull per read from your leader cluster. | `number` | | False |
| `max_outstanding_read_requests` | The maximum number of outstanding reads requests from your leader cluster. | `number` | | False |
| `max_read_request_size` | The maximum total bytes of operations per bulk write request executed on the follower. | `string` | | False |
| `max_write_request_operation_count` | The maximum number of operations per bulk write request executed on the follower. | `number` | | False |
| `max_write_request_size` | The maximum total bytes of operations per bulk write request executed on the follower. | `string` | | False |
| `max_outstanding_write_requests` | The maximum number of outstanding write requests on the follower. | `number` | | False |
| `max_write_buffer_count` | The maximum number of operations that can be queued for writing. When this limit is reached, reads from your leader cluster will be deferred until the number of queued operations goes below the limit. | `number` | | False |
| `max_write_buffer_size` | The maximum total bytes of operations that can be queued for writing. When this limit is reached, reads from your leader cluster will be deferred until the total bytes of queued operations goes below the limit. | `string` | | False |
| `max_retry_delay` | The maximum time to wait before retrying an operation that failed exceptionally. An exponential backoff strategy is employed when retrying. | `string` | | False |
| `read_poll_timeout` | The maximum time to wait for new operations on your leader cluster when the follower index is synchronized with the leader index. When the timeout has elapsed, the poll for operations will return to the follower so that it can update some statistics. Then the follower will immediately attempt to read from the leader again. | `string` | | False |

## Additional Information

For additional information, including the defaults for options, see the [Elasicsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-post-resume-follow.html)
