const { handler } = require('./handler');
const { builder } = require('./builder');

module.exports = {
  command: 'resume',
  describe:
    'Resume a follower index on your follower cluster that has been paused either explicitly with the duper pause command or implicitly due to execution that can not be retried due to failure during following.',
  builder,
  handler,
};
