const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'close',
  describe: 'Close an index',
  builder,
  handler,
};
