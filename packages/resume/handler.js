const axios = require('axios');
const sysPath = require('path');
const { getFollowerCluster, logESSuccess, logESFailure } = require('@duper/utils');

const handler = async ({ follower_index, verbose, ...payload }) => {
  const { url: followerUrl } = await getFollowerCluster();

  const requestPath = '_ccr/resume_follow';
  const requestUrl = sysPath.join(followerUrl, follower_index, requestPath);

  try {
    const resp = await axios({
      method: 'POST',
      url: requestUrl,
      data: payload,
    });

    logESSuccess({
      message: `Successfully resumed following from "${follower_index}"`,
      response: resp.data,
      verbose,
    });
  } catch (error) {
    logESFailure({ error, verbose });
  }
};

module.exports = { handler };
