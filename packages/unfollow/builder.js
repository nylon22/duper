const builder = {
  follower_index: {
    alias: 'f',
    desc: 'The name of the index to unfollow on your follower cluster.',
    type: 'string',
    demandOption: true,
  },
};

module.exports = { builder };
