const axios = require('axios');
const sysPath = require('path');
const { getFollowerCluster, logESSuccess, logESFailure } = require('@duper/utils');

const handler = async ({ follower_index, verbose }) => {
  const { url: followerUrl } = await getFollowerCluster();

  const requestPath = '_ccr/unfollow';
  const requestUrl = sysPath.join(followerUrl, follower_index, requestPath);

  try {
    const resp = await axios({
      method: 'POST',
      url: requestUrl,
    });

    logESSuccess({
      message: `Successfully unfollowed from "${follower_index}"`,
      response: resp.data,
      verbose,
    });
  } catch (error) {
    logESFailure({ error, verbose });
  }
};

module.exports = { handler };
