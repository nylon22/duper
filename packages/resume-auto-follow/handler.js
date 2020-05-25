const { Client } = require('@elastic/elasticsearch');
const { getFollowerCluster, logESSuccess, logESFailure } = require('@duper/utils');

const handler = async ({ auto_follow_pattern_name, verbose }) => {
  const { url: followerUrl } = await getFollowerCluster();

  const client = new Client({ node: followerUrl });

  try {
    const resp = await client.ccr.resumeAutoFollowPattern({
      name: auto_follow_pattern_name,
    });

    logESSuccess({
      message: `Successfully resumed auto-following patterns under "${auto_follow_pattern_name}" created on your leader cluster`,
      response: resp.body,
      verbose,
    });
  } catch (error) {
    logESFailure({ error });
  }
};

module.exports = { handler };
