const { getFollowerCluster, getLeaderCluster, logESSuccess, logESFailure } = require('@duper/utils');

const handler = async ({ auto_follow_pattern_name, verbose }) => {
  const { client } = await getFollowerCluster();
  const { name: leaderCluster } = await getLeaderCluster();

  try {
    const resp = await client.ccr.pauseAutoFollowPattern({
      name: auto_follow_pattern_name,
    });

    logESSuccess({
      message: `Successfully paused auto-following patterns matching "${auto_follow_pattern_name}" created on "${leaderCluster}"`,
      response: resp.body,
      verbose,
    });
  } catch (error) {
    logESFailure({ error });
  }
};

module.exports = { handler };
