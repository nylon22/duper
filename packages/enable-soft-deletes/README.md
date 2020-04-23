# @duper/enable-soft-deletes

> Enable soft deletes for a specified index on your leader cluster. Soft deletes are required for an index to serve as a leader index for CCR

## Usage

```sh
$ duper enable-soft-deletes [options]
```

### Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | -------- | -------- |
| `leader_index` | The name of the leader index that soft deletes should be enabled for | `string` | `l` | **True** |

### Additional Information

For additional information, see the [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-requirements.html)

