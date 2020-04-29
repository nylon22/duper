const { Client } = require('@elastic/elasticsearch');
const { builder } = require('./builder');
const {
  getFollowerCluster,
  logESSuccess,
  logESFailure,
  getValidatedArguments,
} = require('@duper/utils');

const handler = async ({ follower_index, verbose, ...args }) => {
  const { url: followerUrl } = await getFollowerCluster();

  const client = new Client({ node: followerUrl });
  const payload = getValidatedArguments({ builder, args });

  try {
    const resp = await client.ccr.resumeFollow({
      index: follower_index,
      body: payload,
    });

    logESSuccess({
      message: `Successfully resumed following from "${follower_index}"`,
      response: resp.body,
      verbose,
    });
  } catch (error) {
    logESFailure({ error });
  }
};

module.exports = { handler };
