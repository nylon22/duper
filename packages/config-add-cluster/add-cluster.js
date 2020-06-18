const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'add-cluster',
  describe: 'Add an Elasticsearch cluster to your duper configuration',
  builder,
  handler,
};


