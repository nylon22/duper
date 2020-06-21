const { getFollowerCluster, logESFailure } = require('@duper/utils');

const handler = async ({ index = [], level }) => {
  const { client } = await getFollowerCluster();

  // Return stats about all follower indices if index is not provided
  const emptyIndex = !index || (Array.isArray(index) && index.length === 0);
  const _index = emptyIndex ? '_all' : index.join(',');

  try {
    let resp;
    if (level === 'shard') {
      resp = await client.ccr.followStats({ index: _index });
    } else if (level === 'cluster') {
      resp = await client.ccr.stats();
    }

    console.log(JSON.stringify(resp.body, null, 2));
  } catch (error) {
    logESFailure({ error });
  }
};

module.exports = { handler };
