const axios = require('axios');
const sysPath = require('path');
const {
  getFollowerCluster,
  getLeaderCluster,
  logESSuccess,
  logESFailure,
} = require('@duper/utils');

const handler = async ({ follower_index, wait_for_active_shards, verbose, ...payload }) => {
  const { url: followerUrl } = await getFollowerCluster();
  const { name: remote_cluster } = await getLeaderCluster();

  const requestPath = '_ccr/follow';
  const requestUrl = sysPath.join(followerUrl, follower_index, requestPath);

  try {
    const resp = await axios({
      method: 'PUT',
      url: requestUrl,
      data: { remote_cluster, ...payload },
      params: {
        wait_for_active_shards,
      },
    });

    logESSuccess({
      message: `Successfully followed "${payload.leader_index}" from "${follower_index}"`,
      response: resp.data,
      verbose,
    });
  } catch (error) {
    logESFailure({ error, verbose });
  }
};

module.exports = { handler };
