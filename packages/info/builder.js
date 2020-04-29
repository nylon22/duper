const builder = {
  index: {
    alias: 'i',
    desc: 'Index patterns to retrieve info about. If not provided, info for all follower indices is listed',
    type: 'array',
  },
};

module.exports = { builder };
