# duper

> A command line tool for managing Elasticsearch Cross-cluster Replication

## Why duper

Cross-datacenter replication of Elasticsearch clusters is a necessity for fault-tolerant production systems. Elasticsearch's Cross Cluster Replication (CCR) API satisfies this need. Elasticsearch provides a UI to administer CCR via its Kibana offering. So why use `duper`? If you prefer the command line, `duper` is the tool for you.

For more on CCR, check out the [Elasticsearch blog](https://www.elastic.co/blog/cross-datacenter-replication-with-elasticsearch-cross-cluster-replication) and the [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-apis.html)

## Installation

```sh
$ npm install -g @duper/duper
```

## Getting Started

Following the [Elasticsearch tutorial on CCR](https://www.elastic.co/blog/cross-datacenter-replication-with-elasticsearch-cross-cluster-replication), let's say we have two clusters running on our local machine: `us-cluster`, which runs on port **9200** and `japan-cluster`, which runs on port **8200**. We want to replicate the documents in the `products` index from the US cluster (the leader cluster) to the Japan Cluster (the follower cluster). Here's how we would achieve this using `duper`

1. Define the leader cluster on the follower cluster

```sh
$ curl -XPUT -H "Content-type: application/json" -d '{
  "persistent" : {
    "cluster" : {
      "remote" : {
        "us-cluster" : {
          "seeds" : [
            "127.0.0.1:9300"
          ]
        }
      }
    }
  }
  }' 'http://localhost:8200/_cluster/settings'
```

2. Create an index on the leader cluster to replicate to the follower cluster

```sh
$ curl -XPUT -H "Content-type: application/json" -d '{
  "settings" : {
    "index" : {
      "number_of_shards" : 1,
      "number_of_replicas" : 0,
      "soft_deletes" : {
        "enabled" : true      
      }
    }
  },
  "mappings" : {
    "_doc" : {
      "properties" : {
        "name" : {
          "type" : "keyword"
        }
      }
    }
  }
  }' 'http://localhost:9200/products'
```

3. Configure the follower cluster

```sh
$ duper config add-cluster --url "http://localhost:8200" --name "japan"
$ duper config set-current-cluster --name "japan"
```

**NOTE:** The `set-current-cluster` command is not necessary if your `duper` configuration does not contain any other clusters. `duper` will set your current cluster for you if you only have one.

4. Replicate the `products` index on our leader cluster to the `products-copy` index on our follower cluster

```sh
$ duper follow --follower_index "products-copy" --leader_index "products" --remote-cluster "us-cluster"
```

## Commands

- [config](./packages/config/README.md)
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
- [add-remote-cluster](./packages/add-remote-cluster/README.md)
- [enable-soft-deletes](./packages/enable-soft-deletes/README.md)

## Configuration

`duper` was made to be used with multiple Elasticsearch clusters. It saves a configuration file to `~/.duperrc.yml` that stores the clusters you interact with as well as the current cluster you are operating on. For more on managing your `duper` configuration, see [config](./packages/config/README.md).

## Help

```sh
$ duper --help
```

## What is duper not?

There are steps that go into replicating Elasticsearch clusters that `duper` does not provide commands for. For example, to follow an index, the index you want to follow must have been created first. `duper` does not provide a command to create non-follower indices. `duper` is purpose-built to put a CLI in front of the CCR API.

## Supported Elasticsearch Versions

- 7.x
