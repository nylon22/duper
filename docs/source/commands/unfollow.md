---
title: Stats
description: Stop the following task associated with a follower index on your follower cluster and remove index metadata and settings associated with cross-cluster replication. This enables the index to be treated as a regular index. The follower index must be paused and closed before running the unfollow command.
---

## Usage

```sh
duper unfollow [options]
```

## Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | -------- | ------- |
| `follower_index` | The name of the index to unfollow | `string` | `f` | **True** |

## Additional Information

For additional information, see the [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-post-unfollow.html)

