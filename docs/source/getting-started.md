---
title: Getting Started
---

This tutorial assumes you already have Elasticsearch installed. If not, see https://www.elastic.co/downloads/elasticsearch.

Let's say we have two clusters running on our local machine: `us-cluster`, which runs on port **9200** and `japan-cluster`, which runs on port **8200**. We want to replicate the documents in the `products` index on the US cluster (the leader cluster) to the Japan Cluster (the follower cluster).

**Note** Soft deletes must be enabled on the index for it to serve as a leader index. Soft deletes can only be configured at index creation. Soft deletes are enabled by default. Make sure you didn't disable them when you created your index!

1. Add the `us-cluster` to your duper configuration

```sh
duper config add-cluster --name us-cluster --url http://localhost:9200 --role leader
```

2. Add the `japan-cluster` to your duper configuration

```sh
duper config add-cluster --name japan-cluster --url http://localhost:8200 --role follower
```

3. Set up connectivity between your follower cluster and your leader cluster

```sh
duper connect --seeds "127.0.0.1:9300"
```

**Note** You might notice we use port **9300**. That is the default port used for node-to-node communication.

4. Replicate the `products` index on your leader cluster to the `products-copy` index on your follower cluster

```sh
duper follow --follower_index products-copy --leader_index products
```

5. Create a document in the `products` index

```sh
curl -XPUT http://localhost:9200/products/_doc/1 -H "Content-Type: application/json" -d '{ "name": "iPhone" }
```

6. It's automatically copied over to the `products-copy` index!

```sh
 curl http://localhost:8200/products-copy/_search\?pretty\=true
{
  "took" : 2,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "products-copy",
        "_type" : "_doc",
        "_id" : "1",
        "_score" : 1.0,
        "_source" : {
          "name" : "iPhone"
        }
      }
    ]
  }
}
 ```

## Troubleshooting

X-pack is required for CCR. To start your trial license:

```sh
curl -XPOST http://localhost:9200/_xpack/license/start_trial\?acknowledge\=true
```

## Additional Information

### Configuration Files

`elasticsearch.yml` used for the `us-cluster` for this tutorial:

```yml
cluster.name: us-cluster
path.data: /usr/local/var/lib/elasticsearch/us-cluster
path.logs: /usr/local/var/log/elasticsearch/us-cluster
http.port: 9200
xpack.security.enabled: false
```

`elasticsearch.yml` used for the `japan-cluster` for this tutorial:

```yml
cluster.name: japan-cluster
path.data: /usr/local/var/lib/elasticsearch/japan-cluster
path.logs: /usr/local/var/log/elasticsearch/japan-cluster
http.port: 8200
xpack.security.enabled: false
```

### Command Used to Create the Products Index

```sh
curl -XPUT http://localhost:9200/products -H "Content-Type: application/json" -d '
{
  "settings": {
    "index": {
      "number_of_shards": 1,
      "number_of_replicas": 0
    }
  },
  "mappings": {
    "properties": {
      "name": {
        "type": "text"
      }
    }
  }
}
'
```

For more on how to create an Elasticsearch index, see: https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-create-index.html
