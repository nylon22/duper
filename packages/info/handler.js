const { getFollowerCluster, logESFailure } = require('@duper/utils');

const handler = async ({ index }) => {
  const { client } = await getFollowerCluster();

  // Return info about all follower indices if index is not provided
  const isEmpty = !index || (Array.isArray(index) && index.length === 0);
  const _index = isEmpty ? '_all' : index.join(',');

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
