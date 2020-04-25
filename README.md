# duper

> A command line tool that makes administering Elasticsearch Cross-cluster Replication easy

## Why duper

Cross-datacenter replication of Elasticsearch clusters is a necessity for fault-tolerant production systems. Elasticsearch's Cross Cluster Replication (CCR) API satisfies this need. Elasticsearch provides a UI to administer CCR via its Kibana offering. So why use duper? If you prefer the command line, `duper` is the tool for you.

For more on CCR, check out the [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-apis.html)

## Installation

```sh
$ npm install -g @duper/duper
```

## Getting Started

Let's say we have two clusters running on our local machine: `us-cluster`, which runs on port **9200** and `japan-cluster`, which runs on port **8200**. We want to replicate the documents on an already-existing `products` index on the US cluster (the leader cluster) to the Japan Cluster (the follower cluster).

1. Configure the `us-cluster`

```sh
$ duper config add-cluster --name us-cluster --url http://localhost:9200 --role leader
```

2. Configure the `japan-cluster` 

```sh
$ duper config add-cluster --name japan-cluster --url http://localhost:8200 --role follower
```

3. Set up connectivity between your follower cluster and your leader cluster

```sh
$ duper connect --seeds "127.0.0.1:9300"
```

**Note** You might notice we use port **9300**. That is the default port used for node-to-node communication.

4. Enable soft deletes on your leader index. Soft deletes are required for an index to serve as a leader index for CCR

```sh
$ duper enable-soft-deletes --leader_index products
```

5. Replicate the `products` index on your leader cluster to the `products-copy` index on your follower cluster

```sh
$ duper follow --follower_index products-copy --leader_index products
```

The Getting Started section was inspired by the [Elasticsearch tutorial on CCR](https://www.elastic.co/blog/cross-datacenter-replication-with-elasticsearch-cross-cluster-replication).

## Commands

- [config](./packages/config/README.md)
- [connect](./packages/connect/README.md)
- [enable-soft-deletes](./packages/enable-soft-deletes/README.md)
- [follow](./packages/follow/README.md)
- [forget](./packages/forget/README.md)
- [info](./packages/info/README.md)
- [pause](./packages/pause/README.md)
- [resume](./packages/resume/README.md)
- [stats](./packages/stats/README.md)
- [unfollow](./packages/unfollow/README.md)
- [auto-follow](./packages/auto-follow/README.md)
- [delete-auto-follow](./packages/delete-auto-follow/README.md)
- [get-auto-follow](./packages/get-auto-follow/README.md)
- [pause-auto-follow](./packages/pause-auto-follow/README.md)
- [resume-auto-follow](./packages/resume-auto-follow/README.md)

## Configuration

`duper` was made to be used with as many Elasticsearch clusters as you like. It saves a configuration file to `~/.duperrc.yml` that stores the clusters you interact with. It also stores which cluster is the follower cluster you are currently acting on, and which cluster is the leader cluster you are currently acting on. For more on managing your `duper` configuration, see [config](./packages/config/README.md).

## Help

```sh
$ duper --help
```

## Supported Elasticsearch Versions

- 7.x
