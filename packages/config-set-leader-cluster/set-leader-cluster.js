const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'set-leader-cluster',
  describe: 'Set your leader cluster',
  builder,
  handler,
};


