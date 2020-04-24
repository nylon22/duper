const axios = require('axios');
const sysPath = require('path');
const { getFollowerCluster, logESSuccess, logESFailure } = require('@duper/utils');

const handler = async ({ auto_follow_pattern_name, verbose }) => {
  const { url: followerUrl } = await getFollowerCluster();

  const requestPath = '_ccr/auto_follow';
  const requestUrl = sysPath.join(followerUrl, requestPath, auto_follow_pattern_name, 'resume');

  try {
    const resp = await axios({
      method: 'POST',
      url: requestUrl,
    });

    logESSuccess({
      message: `Successfully resumed auto-following pattern "${auto_follow_pattern_name} on your follower cluster"`,
      response: resp.data,
      verbose,
    });
  } catch (error) {
    logESFailure({ error, verbose });
  }
};

module.exports = { handler };
