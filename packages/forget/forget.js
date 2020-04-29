const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'forget',
  describe:
    'Manually remove retention leases on your follower cluster when the unfollow command was unable to do so.',
  builder,
  handler,
};
