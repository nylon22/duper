const axios = require('axios');
const sysPath = require('path');
const {
  getFollowerCluster,
  getLeaderCluster,
  logESSuccess,
  logESFailure,
} = require('@duper/utils');

const handler = async ({ leader_index, verbose, ...payload }) => {
  const { url: followerUrl } = await getFollowerCluster();
  const { name: leader_remote_cluster } = getLeaderCluster();

  const requestPath = '_ccr/forget_follower';
  const requestUrl = sysPath.join(followerUrl, leader_index, requestPath);

  try {
    const resp = await axios({
      method: 'POST',
      url: requestUrl,
      data: { leader_remote_cluster, ...payload },
    });

    logESSuccess({
      message: `Successfully forgot "${leader_index}"`,
      response: resp.data,
      verbose,
    });
  } catch (error) {
    logESFailure({ error, verbose });
  }
};

module.exports = { handler };
