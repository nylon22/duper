const { getFollowerCluster, logESSuccess, logESFailure } = require('@duper/utils');

const handler = async ({ follower_index, verbose }) => {
  const { client, name: followerCluster } = await getFollowerCluster();

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
