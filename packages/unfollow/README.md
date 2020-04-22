# @duper/unfollow

> Stop the following task associated with a follower index on the current cluster and remove index metadata and settings associated with cross-cluster replication. This enables the index to treated as a regular index. The follower index must be paused and closed before running the unfollow command.

## Usage

```sh
$ duper unfollow [options]
```

### Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | -------- | ------- |
| `follower_index` | The name of the index to unfollow in the current cluster. You can set the current cluster by running "duper config switch-cluster [options]" | `string` | `f` | **True** |

### Additional Information

For additional information, see the [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-post-unfollow.html)
