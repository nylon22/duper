# @duper/info

> List the parameters and the status for each follower index on the current cluster. For example, the results include follower index names, leader index names, replication options and whether the follower indices are active or paused.

## Usage

```sh
$ duper pause [options]
```

### Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | --------- | ------ |
| `index` | Index patterns to retrieve info about | `array` | `i` | **True** |

### Additional Information

For additional information, see the [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-get-follow-info.html)
