const { Client } = require('@elastic/elasticsearch');
const { getFollowerCluster, logESFailure } = require('@duper/utils');

const handler = async ({ auto_follow_pattern_name = '' }) => {
  const { url: followerUrl } = await getFollowerCluster();

  const client = new Client({ node: followerUrl });

  try {
    const resp = await client.ccr.getAutoFollowPattern({
      name: auto_follow_pattern_name,
    });

    console.log(JSON.stringify(resp.body, null, 2));
  } catch (error) {
    logESFailure({ error });
  }
};

module.exports = { handler };
