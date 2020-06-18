const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'delete-cluster',
  describe: 'Delete an Elasticsearch cluster configuration',
  builder,
  handler,
};


