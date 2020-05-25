const builder = {
  leader_index: {
    desc: 'The name of the leader index.',
    type: 'string',
    alias: 'l',
    demandOption: true,
  },
  follower_index: {
    desc: 'The name of the follower index.',
    type: 'string',
    alias: 'f',
    demandOption: true,
  }
};

module.exports = { builder };
