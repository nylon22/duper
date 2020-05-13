# @duper/close

> Close an index

## Usage

```sh
$ duper close [options]
```

### Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | -------- | -------- |
| `follower_index` | The name of the index to close on your follower cluster. | `string` | `f` | False |
| `leader_index` | The name of the index to close on your leader cluster | `string` | `l` | False |
| `allow_no_indices` | If `true`, the request does not return an error if a wildcard expression or `_all` value retrieves only missing or closed indices. Defaults to `true`| `boolean` | | False |
| `expand_wildcards` | Controls what kind of indices that wildcard expressions can expand to. | `enum<all,open,closed,hidden,none>` | | False |
| `ignore_unavailable` | If `true`, missing or closed indices are not included in the response. Defaults to `false`. | `boolean` | | False |
| `wait_for_active_shards` | The number of shard copies that must be active before proceeding with the operation. Set to `all` or any positive integer up to the total number of shards in the index (number_of_replicas+1). Default: 1, the primary shard. | `string` | | False |
| `master_timeout` | Specifies the period of time to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. Defaults to `30s`. | [Time units](https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#time-units) | | False |
| `timeout` | Specifies the period of time to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. Defaults to `30s`. | [Time units](https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#time-units) | | False |

### Additional Information

For additional information, including the defaults for options, see the [Elasicsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-close.html)

