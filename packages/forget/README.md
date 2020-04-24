# @duper/forget

> A following index takes out retention leases on its leader index. These retention leases are used to increase the likelihood that the shards of the leader index retain the history of operations that the shards of the following index need to execute replication. When a follower index is converted to a regular index via the unfollow command (either via explicit execution of this command, or implicitly via index lifecycle management), these retention leases are removed. However, removing these retention leases can fail (e.g., if your leader cluster containing the leader index is unavailable). While these retention leases will eventually expire on their own, their extended existence can cause the leader index to hold more history than necessary, and prevent index lifecycle management from performing some operations on the leader index. This command exists to enable manually removing these retention leases on your follower cluster when the unfollow command was unable to do so.

## Usage

```sh
$ duper forget [options]
```

### Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | ------- | --------- |
| `leader_index` | The name of the leader index. | `string` | | **True** |
| `follower_index` | The name of the follower index. | `string` | | **True** |
| `follower_index_uuid` | The UUID of the follower index. | `string` | | **True** |

### Additional Information

For additional information, see the [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-post-forget-follower.html)
