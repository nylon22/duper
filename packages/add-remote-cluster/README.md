# @duper/add-remote-cluster

> Add a remote cluster to the current cluster. The remote cluster is the name of the leader cluster. This command sets up connectivity for the follower cluster to be able to follow the leader (remote) cluster
>
## Usage

```sh
$ duper add-remote-cluster [options]
```

### Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | -------- | ------- |
| `remote_cluster` | The name of the leader (remote) cluster that the current (follower) cluster should pull from | `string` | `r` | **True** |
| `seeds` | The seed nodes on the remote cluster that the current cluster should pull from. Whereas the default port for HTTP communication is 9200, the default port for node-to-node communication is 9300. Replication uses node-to-node communication. | `array` | `s` | **True** |

### Additional Information

For additional information, see the [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-remote-clusters.html)
