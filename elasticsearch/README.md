

```shell
curl -s -H "Content-Type: application/x-ndjson" -XPOST localhost:9200/_bulk --data-binary "@data-sam.json"
```

```
http://localhost:9200/sam/sam/_search?pretty
http://localhost:9200/sam/sam/6?pretty
```