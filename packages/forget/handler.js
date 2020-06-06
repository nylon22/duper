const { Client } = require('@elastic/elasticsearch');
const {
  getLeaderCluster,
  getFollowerCluster,
  logESSuccess,
  logESFailure,
} = require('@duper/utils');

const handler = async ({ leader_index, follower_index, verbose }) => {
  const { url: leaderUrl, name: leader_remote_cluster } = await getLeaderCluster();
  const { url: followerUrl, name: follower_cluster } = await getFollowerCluster();

  // Get the uuid of the follower index
  const followerClient = new Client({ node: followerUrl });

  const leaderClient = new Client({ node: leaderUrl });

  try {
    // Get the uuid of the follower index
    const resp1 = await followerClient.indices.getSettings({ index: follower_index, name: 'index.uuid' });
    const { uuid: follower_index_uuid } = resp1.body[follower_index].settings.index;

    const resp2 = await leaderClient.ccr.forgetFollower({
      index: leader_index,
      body: { follower_cluster, leader_remote_cluster, follower_index, follower_index_uuid },
    });

    logESSuccess({
      message: `Successfully forgot "${leader_index}" on "${leader_remote_cluster}"`,
      response: resp2.body,
      verbose,
    });
  } catch (error) {
    logESFailure({ error });
  }
};

module.exports = { handler };
