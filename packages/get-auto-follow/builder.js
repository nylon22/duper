const builder = {
  auto_follow_pattern_name: {
    alias: 'p',
    desc:
      'Specifies the auto-follow pattern collection that you want to retrieve. If you do not specify a name, the command returns information for all collections.',
    type: 'string',
  },
};

module.exports = { builder };
