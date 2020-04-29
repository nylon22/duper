const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'follow',
  describe:
    'Create a new follower index on your follower cluster that is configured to follow the provided leader index on your leader cluster.',
  builder,
  handler,
};
