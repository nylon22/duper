---
title: Add Cluster Configuration
description: Add a new Elasticsearch cluster to your duper configuration
---

## Usage

```sh
duper config add-cluster [options]
```

## Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | -------- | ---------- |
| `url` | The url of the Elasticsearch cluster | `string` | `u` | **True** |
| `name` | The cluster name as defined by the `cluster.name` setting for the cluster | `string` | `n` | **True** |
| `role` | The role for the Elasticsearch cluster | `enum<leader, follower>` | `r` | False |
