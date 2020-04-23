# @duper/resume-auto-follow

> Resume an auto-follow pattern that has been paused with the pause-auto-follow command. When this command runs, the auto-follow pattern will resume configuring following indices for newly created indices on the remote cluster that match its patterns. Remote indices created while the pattern was paused will also be followed, unless they have been deleted or closed in the meantime.

## Usage

```sh
$ duper resume-auto-follow [options]
```

### Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | ------ | ------- |
| `auto_follow_pattern_name` | Name of the auto-follow pattern to resume. | `string` | `p` | **True** |

### Additional Information

For additional information, see the [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-resume-auto-follow-pattern.html)
