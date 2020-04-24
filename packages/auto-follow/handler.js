const axios = require('axios');
const sysPath = require('path');
const {
  getFollowerCluster,
  getLeaderCluster,
  logESSuccess,
  logESFailure,
} = require('@duper/utils');

const handler = async ({ auto_follow_pattern_name, verbose, ...payload }) => {
  const { url: followerUrl } = await getFollowerCluster();
  const { name: remote_cluster } = await getLeaderCluster();

  const requestPath = '_ccr/auto_follow';
  const requestUrl = sysPath.join(followerUrl, requestPath, auto_follow_pattern_name);

  try {
    const resp = await axios({
      method: 'PUT',
      url: requestUrl,
      data: { remote_cluster, ...payload },
    });

    logESSuccess({
      message: `Successfully auto-followed "${payload.leader_index_patterns.join(', ')}"`,
      response: resp.data,
      verbose,
    });
  } catch (error) {
    logESFailure({ error, verbose });
  }
};

module.exports = { handler };
