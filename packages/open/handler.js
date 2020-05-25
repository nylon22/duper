const { Client } = require('@elastic/elasticsearch');
const { builder } = require('./builder');
const {
  getFollowerCluster,
  getLeaderCluster,
  logESSuccess,
  logESFailure,
  getValidatedArguments,
} = require('@duper/utils');

const open = async ({ node, clusterName, index, verbose, args }) => {
  const client = new Client({ node });
  const payload = getValidatedArguments({ builder, args });

  try {
    const resp = await client.indices.close({
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
    const { url: followerUrl, name: clusterName } = await getFollowerCluster();
    await open({ node: followerUrl, clusterName, index: follower_index, verbose, args });
  }

  if (leader_index) {
    const { url: leaderUrl, name: clusterName } = await getLeaderCluster();
    await open({ node: leaderUrl, clusterName, index: leader_index, verbose, args });
  }
};

module.exports = { handler };
