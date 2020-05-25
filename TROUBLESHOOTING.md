1. Include example `japan-cluster` and `us-cluster` `elasticsearch.yml`
2. Show command on how to start trial license

> curl -XPOST http://localhost:9200/_xpack/license/start_trial\?acknowledge\=true
3. Show command on how to create products index
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

4. Show command to index document
 curl -XPUT http://localhost:9200/products/_doc/1 -H "Content-Type: application/json" -d '{ "name": "iPhone" }
5. Show command to see document created in us-cluster
curl http://localhost:9200/products/_search\?pretty\=true
{
  "took" : 1,
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
        "_index" : "products",
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
6. Show command to see document created in japan-cluster
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
