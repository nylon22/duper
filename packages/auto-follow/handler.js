const { Client } = require('@elastic/elasticsearch');
const { builder } = require('./builder');
const {
  getFollowerCluster,
  getLeaderCluster,
  logESSuccess,
  logESFailure,
  getValidatedArguments,
} = require('@duper/utils');

const handler = async ({ auto_follow_pattern_name, verbose, ...args }) => {
  const { url: followerUrl } = await getFollowerCluster();
  const { name: remote_cluster } = await getLeaderCluster();

  const client = new Client({ node: followerUrl });
  const payload = getValidatedArguments({ builder, args });

  try {
    const resp = await client.ccr.putAutoFollowPattern({
      name: auto_follow_pattern_name,
      body: { remote_cluster, ...payload },
    });

    logESSuccess({
      message: `Successfully auto-followed "${payload.leader_index_patterns.join(', ')}"`,
      response: resp.body,
      verbose,
    });
  } catch (error) {
    logESFailure({ error });
  }
};

module.exports = { handler };
