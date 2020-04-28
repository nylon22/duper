---
title: Getting Started
---

Let's say we have two clusters running on our local machine: `us-cluster`, which runs on port **9200** and `japan-cluster`, which runs on port **8200**. We want to replicate the documents on an already-existing `products` index on the US cluster (the leader cluster) to the Japan Cluster (the follower cluster).

1. Configure the `us-cluster`

```sh
duper config add-cluster --name us-cluster --url http://localhost:9200 --role leader
```

2. Configure the `japan-cluster` 

```sh
duper config add-cluster --name japan-cluster --url http://localhost:8200 --role follower
```

3. Set up connectivity between your follower cluster and your leader cluster

```sh
duper connect --seeds "127.0.0.1:9300"
```

**Note** You might notice we use port **9300**. That is the default port used for node-to-node communication.

4. Enable soft deletes on your leader index. Soft deletes are required for an index to serve as a leader index for CCR

```sh
duper enable-soft-deletes --leader_index products
```

5. Replicate the `products` index on your leader cluster to the `products-copy` index on your follower cluster

```sh
duper follow --follower_index products-copy --leader_index products
```
