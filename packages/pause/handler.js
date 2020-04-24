const axios = require('axios');
const sysPath = require('path');
const { getFollowerCluster, logESSuccess, logESFailure } = require('@duper/utils');

const handler = async ({ follower_index, verbose }) => {
  const { url: followerUrl } = await getFollowerCluster();

  const requestPath = '_ccr/pause_follow';
  const requestUrl = sysPath.join(followerUrl, follower_index, requestPath);

  try {
    const resp = await axios({
      method: 'POST',
      url: requestUrl,
    });

    logESSuccess({
      message: `Successfully paused follower index "${follower_index}" on your follower cluster`,
      response: resp.data,
      verbose,
    });
  } catch (error) {
    logESFailure({ error, verbose });
  }
};

module.exports = { handler };
