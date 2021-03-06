---
title: Pause Auto Follow
description: Pause an auto-follow pattern on your follower cluster. When this command runs, the auto-follow pattern is inactive and ignores any new index created on your leader cluster that matches any of the auto-follow’s patterns. Paused auto-follow patterns appear with the active field set to false in the get-auto-follow command. You can resume auto-following with the resume-auto-follow command. Once resumed, the auto-follow pattern is active again and automatically configures follower indices for newly created indices on your leader cluster that match its patterns. Indices created on your leader cluster that match the auto-follow pattern while the pattern was paused will also be followed, unless they have been deleted or closed in the meantime.
---

## Usage

```sh
duper pause-auto-follow [options]
```

## Options

| Option | Description | Type | Alias | Required |
| -------- | ----------- | ------- | ------ | ------- |
| `auto_follow_pattern_name` | Name of the auto-follow pattern to pause. | `string` | `p` | **True** |

## Additional Information

For additional information, see the [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-pause-auto-follow-pattern.html)
