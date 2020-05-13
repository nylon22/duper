const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'open',
  describe: 'Open an index',
  builder,
  handler,
};
