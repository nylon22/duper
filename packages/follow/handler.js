const { builder } = require('./builder');
const {
  getFollowerCluster,
  getLeaderCluster,
  logESSuccess,
  logESFailure,
  getValidatedArguments,
} = require('@duper/utils');

const handler = async ({ follower_index, wait_for_active_shards, verbose, ...args }) => {
  const { client } = await getFollowerCluster();
  const { name: remote_cluster } = await getLeaderCluster();

  const payload = getValidatedArguments({ builder, args });

  try {
    const resp = await client.ccr.follow({
      index: follower_index,
      wait_for_active_shards,
      body: { remote_cluster, ...payload },
    });

    logESSuccess({
      message: `Successfully followed "${payload.leader_index}" from "${follower_index}"`,
      response: resp.body,
      verbose,
    });
  } catch (error) {
    logESFailure({ error });
  }
};

module.exports = { handler };
