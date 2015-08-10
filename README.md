# sifttt-recipe-sheets-to-es

Recipe to index rows from a Google Sheets spreadsheet into ElasticSearch.

## Running the Task

The process can be run like this:

```shell
gulp sheets-to-es
```

## Parameters

The following should be set as environment variables:

### SPREADSHEET_KEYS

A comma separated list of spreadsheet keys.

### SPREADSHEET_CLIENT_EMAIL

The name of the Google user client that can access the spreadsheets.

### SPREADSHEET_PRIVATE_KEY

The private key for the Google user client.

### ELASTICSEARCH_INDEX

The name of the ElasticSearch index to copy the spreadsheet rows to.

### ELASTICSEARCH_HOST

The server that the ElasticSearch index is on.

### ELASTICSEARCH_REQUEST_TIMEOUT (optional)

The ElasticSearch `REQUEST_TIMEOUT` value.

### ELASTICSEARCH_RATE_LIMIT (optional)

Whether to limit the rate that records are inserted into the ElasticSearch index.
