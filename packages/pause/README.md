# @duper/pause

> Pause a follower index on your follower cluster. After running this command, the follower index will not fetch any additional operations from the leader index. You can resume following by running "duper follow [options]". Pausing and resuming a follower index can be used to change the configuration of the following task.

## Usage

```sh
$ duper pause [options]
```

### Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | ------ | ------- |
| `follower_index` | The name of the index on your follower cluster to pause following for. | `string` | `f` | **True** |

### Additional Information

For additional information, see the [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-post-pause-follow.html)
