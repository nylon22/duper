# @duper/stats

> Get follower stats on your follower cluster. 

## Usage

```sh
$ duper stats [options]
```

### Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | --------- | ------ |
| `index` | Indices to retrieve stats for. If not provided, stats for all follower indices are listed | `array` | `i` | False |
| `level` | Specify whether to get stats at the shard or the cluster level **Default:** "shard" | `enum<shard, cluster>` | `i` | False |


### Additional Information

For additional information, see the [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-get-follow-stats.html)
