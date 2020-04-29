---
title: Info
description: List the parameters and the status for follower indices on your follower cluster. For example, the results include follower index names, leader index names, replication options and whether the follower indices are active or paused.
---

## Usage

```sh
duper info [options]
```

## Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | --------- | ------ |
| `index` | Index patterns to retrieve info about. If not provided, info for all follower indices is listed | `array` | `i` | False |

## Additional Information

For additional information, see the [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-get-follow-info.html)

