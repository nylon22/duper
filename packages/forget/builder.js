const builder = {
  leader_index: {
    desc: 'The name of the leader index.',
    type: 'string',
    demandOption: true,
  },
  follower_index: {
    desc: 'The name of the follower index.',
    type: 'string',
    demandOption: true,
  },
  follower_index_uuid: {
    desc: 'The UUID of the follower index.',
    type: 'string',
    demandOption: true,
  },
};

module.exports = { builder };
