# @duper/config

> Manage your duper configuration

## Usage

```sh
$ duper config <command> [options]
```

### List Command

> Show duper configuration

#### Usage

```sh
$ duper config list
```

### Add Cluster Command

> Add a new Elasticsearch cluster configuration

#### Usage

```sh
$ duper config add-cluster [options]
```

#### Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | -------- | ---------- |
| `url` | The url of the Elasticsearch cluster | `string` | `u` | **True** |
| `name` | The friendly name for the Elasticsearch cluster | `string` | `n` | **True** |

### Set Follower Cluster Command

> Set your follower cluster

#### Usage

```sh
$ duper config set-follower-cluster [options]
```

### Set Leader Cluster Command

> Set your leader cluster

#### Usage

```sh
$ duper config set-leader-cluster [options]
```

#### Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | ------- | -------- |
| `name` | The friendly name for the Elasticsearch cluster | `string` | `n` | **True** |

### Delete Cluster Command

> Delete an Elasticsearch cluster configuration

#### Usage

```sh
$ duper config delete-cluster [options]
```

#### Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | ------- | -------- |
| `name` | The friendly name for the Elasticsearch cluster | `string` | `n` | **True** |
