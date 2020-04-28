---
title: Connect
description: Enable connectivity between your follower cluster and your leader cluster
---

## Usage

```sh
duper connect [options]
```

## Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | -------- | ------- |
| `seeds` | The seed nodes on your leader cluster that your follower cluster should pull from. Whereas the default port for HTTP communication is 9200, the default port for node-to-node communication is 9300. Replication uses node-to-node communication. | `array` | `s` | **True** |

## Additional Information

For additional information, see the [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-remote-clusters.html)
