const { Client } = require('@elastic/elasticsearch');
const { getFollowerCluster, logESSuccess, logESFailure } = require('@duper/utils');

const handler = async ({ follower_index, verbose }) => {
  const { url: followerUrl } = await getFollowerCluster();

  const client = new Client({ node: followerUrl });

  try {
    const resp = await client.ccr.unfollow({
      index: follower_index,
    });

    logESSuccess({
      message: `Successfully unfollowed the leader index that "${follower_index}" was following`,
      response: resp.body,
      verbose,
    });
  } catch (error) {
    logESFailure({ error });
  }
};

module.exports = { handler };
