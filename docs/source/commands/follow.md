---
title: Follow
description: Create a new follower index on your follower cluster that is configured to follow the referenced leader index. After running this command, the follower index exists, and cross-cluster replication starts replicating operations from the leader index to the follower index.
---

## Usage

```sh
duper follow [options]
```

## Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | -------- | -------- |
| `follower_index` | The name of the index to create on your follower cluster.  | `string` | `f` | **True** |
| `leader_index` | The name of the index in the leader cluster to follow. | `string` | `l` | **True** |
| `wait_for_active_shards` | Specifies the number of shards to wait on being active before responding. This defaults to waiting on none of the shards to be active. A shard must be restored from the leader index being active. Restoring a follower shard requires transferring all the remote Lucene segment files to the follower index. | `number` | | False |
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

For additional information, including the defaults for options, see the [Elasicsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-put-follow.html)
