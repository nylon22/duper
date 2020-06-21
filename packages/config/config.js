const { handler } = require('./handler');

module.exports = {
  command: 'config',
  describe: 'Show duper configuration',
  handler,
};
