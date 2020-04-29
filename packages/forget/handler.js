const { Client } = require('@elastic/elasticsearch');
const { builder } = require('./builder');
const {
  getFollowerCluster,
  getLeaderCluster,
  logESSuccess,
  logESFailure,
  getValidatedArguments,
} = require('@duper/utils');

const handler = async ({ leader_index, verbose, ...args }) => {
  const { url: followerUrl } = await getFollowerCluster();
  const { name: leader_remote_cluster } = getLeaderCluster();

  const client = new Client({ node: followerUrl });
  const payload = getValidatedArguments({ builder, args });

  try {
    const resp = await client.ccr.forgetFollower({
      index: leader_index,
      body: { leader_remote_cluster, ...payload },
    });

    logESSuccess({
      message: `Successfully forgot "${leader_index}"`,
      response: resp.body,
      verbose,
    });
  } catch (error) {
    logESFailure({ error });
  }
};

module.exports = { handler };
