---
title: Add Cluster Configuration
description: Add a new Elasticsearch cluster to your duper configuration
---

## Usage

```sh
duper add-cluster [options]
```

## Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | -------- | ---------- |
| `url` | The url of the Elasticsearch cluster | `string` | `u` | **True** |
| `name` | The cluster name as defined by the `cluster.name` setting for the cluster | `string` | `n` | **True** |
| `role` | The role for the Elasticsearch cluster | `enum<leader, follower>` | `r` | False |
| `overwrite` | Set to true to overwrite an existing cluster in your duper configuration with the same name | `boolean` |  | False |
| `sslKey` | The file path to the private key to include in requests to the Elasticsearch cluster. Necessary only if the Elasticsearch cluster requires client certificate authentication. | `string` |  | False |
| `sslCert` | The file path to the client certificate to include in requests to the Elasticsearch cluster. Necessary only if the Elasticsearch cluster requires client certificate authentication. | `string` | | False |
| `sslCa` | Certificate authorities to include in requests to the Elasticsearch cluster. Necessary only if the server uses a self-signed certificate. | `Array<string>` | | False |
| `username` | The Elastic user to include in requests to the Elasticsearch cluster. Necessary only if the Elasticsearch cluster requires Basic Auth. | `string` |  | False |
| `password` | The Elastic password to include in requests to the Elasticsearch cluster. Necessary only if the Elasticsearch cluster requires Basic Auth. | `string` |  | False |
| `apiKey` | The Elastic API key to include in requests to the Elasticsearch cluster. Necessary only if the Elasticsearch cluster requires API Key authentication | `string` | | False |
| `cloudId` | The cloud id to use include in requests to the Elasticsearch cluster. Necessary only if you are using Elastic cloud | `string` | | False |
