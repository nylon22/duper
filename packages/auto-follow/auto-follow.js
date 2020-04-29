const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'auto-follow',
  describe:
    'Create a new named collection of auto-follow patterns to follow on your leader cluster.',
  builder,
  handler,
};
