---
title: About
---

## Why duper

Cross-datacenter replication of Elasticsearch clusters is a necessity for fault-tolerant production systems. Elasticsearch's Cross Cluster Replication (CCR) API satisfies this need. Elasticsearch provides a UI to administer CCR via its Kibana offering. So why use duper? If you prefer the command line, duper is the tool for you.

For more on CCR, check out the [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-apis.html)

## Installation

```sh
npm install -g @duper/duper
```

## Configuration

`duper` was made to be used with as many Elasticsearch clusters as you like. It saves a configuration file to `~/.duperrc.yml` that stores the clusters you interact with. It also stores which cluster is the follower cluster you are currently acting on, and which cluster is the leader cluster you are currently acting on. For more on managing your `duper` configuration, see [Configuration Commands](./commands/config-add-cluster).

## Help

```sh
duper --help
```

## Supported Elasticsearch Versions

- 7.x
