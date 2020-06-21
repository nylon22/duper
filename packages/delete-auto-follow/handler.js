const { getFollowerCluster, logESSuccess, logESFailure } = require('@duper/utils');

const handler = async ({ auto_follow_pattern_name, verbose }) => {
  const { client } = await getFollowerCluster();

  try {
    const resp = await client.ccr.deleteAutoFollowPattern({
      name: auto_follow_pattern_name,
    });

    logESSuccess({
      message: `Successfully deleted auto-follow pattern "${auto_follow_pattern_name}" on your follower cluster`,
      response: resp.body,
      verbose,
    });
  } catch (error) {
    logESFailure({ error });
  }
};

module.exports = { handler };
