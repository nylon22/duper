const { Client } = require('@elastic/elasticsearch');
const { getFollowerCluster, logESSuccess, logESFailure } = require('@duper/utils');

const handler = async ({ follower_index, verbose }) => {
  const { url: followerUrl, name: followerCluster } = await getFollowerCluster();

  const client = new Client({ node: followerUrl });

  try {
    const resp = await client.ccr.pauseFollow({
      index: follower_index,
    });

    logESSuccess({
      message: `Successfully paused follower index "${follower_index}" on "${followerCluster}"`,
      response: resp.body,
      verbose,
    });
  } catch (error) {
    logESFailure({ error });
  }
};

module.exports = { handler };
