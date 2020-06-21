const { builder } = require('./builder');
const {
  getFollowerCluster,
  getLeaderCluster,
  logESSuccess,
  logESFailure,
  getValidatedArguments,
} = require('@duper/utils');

const open = async ({ client, clusterName, index, verbose, args }) => {
  const payload = getValidatedArguments({ builder, args });

  try {
    const resp = await client.indices.open({
      index,
      ...payload,
    });

    logESSuccess({
      message: `Successfully opened "${index}" on "${clusterName}" cluster`,
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
    const { client, name: clusterName } = await getFollowerCluster();
    await open({ client, clusterName, index: follower_index, verbose, args });
  }

  if (leader_index) {
    const { client, name: clusterName } = await getLeaderCluster();
    await open({ client, clusterName, index: leader_index, verbose, args });
  }
};

module.exports = { handler };
