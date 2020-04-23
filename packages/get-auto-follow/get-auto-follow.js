const { handler } = require('./handler');

module.exports = {
  command: 'get-auto-follow',
  describe:
    'Get configured auto-follow patterns. This command will return the specified auto-follow pattern collection.',
  builder: {
    auto_follow_pattern_name: {
      alias: 'p',
      desc:
        'Specifies the auto-follow pattern collection that you want to retrieve. If you do not specify a name, the command returns information for all collections.',
      type: 'string',
    },
  },
  handler,
};
