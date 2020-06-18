const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'config',
  describe: 'Show duper configuration',
  builder,
  handler,
};


