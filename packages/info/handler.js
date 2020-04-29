const { Client } = require('@elastic/elasticsearch');
const { getFollowerCluster, logESFailure } = require('@duper/utils');

const handler = async ({ index }) => {
  const { url: followerUrl } = await getFollowerCluster();

  // Return info about all follower indices if index is not provided
  const emptyIndex = !index || (Array.isArray(index) && index.length === 0);
  const _index = emptyIndex ? '_all' : index.join(',');

  const client = new Client({ node: followerUrl });

  try {
    const resp = await client.ccr.followInfo({
      index: _index,
    });

    console.log(JSON.stringify(resp.body, null, 2));
  } catch (error) {
    logESFailure({ error });
  }
};

module.exports = { handler };
