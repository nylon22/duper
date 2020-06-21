const { builder } = require('./builder');
const {
  getFollowerCluster,
  getLeaderCluster,
  logESSuccess,
  logESFailure,
  getValidatedArguments,
} = require('@duper/utils');

const close = async ({ client, clusterName, index, verbose, args }) => {
  const payload = getValidatedArguments({ builder, args });

  try {
    const resp = await client.indices.close({
      index,
      ...payload,
    });

    logESSuccess({
      message: `Successfully closed "${index}" on "${clusterName}" cluster`,
      response: resp.body,
      verbose,
    });
  } catch (error) {
    logESFailure({ error });
  }
};

const handler = async ({ follower_index, leader_index, verbose, ...args }) => {
  if (!follower_index && !leader_index) {
    throw new Error('Expected at least one of: "follower_index" "leader_index"');
  }

  if (follower_index) {
    const { name: clusterName, client } = await getFollowerCluster();
    await close({ client, clusterName, index: follower_index, verbose, args });
  }

  if (leader_index) {
    const { name: clusterName, client } = await getLeaderCluster();
    await close({ client, clusterName, index: leader_index, verbose, args });
  }
};

module.exports = { handler };
