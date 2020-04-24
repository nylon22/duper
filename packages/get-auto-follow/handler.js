const axios = require('axios');
const sysPath = require('path');
const { getFollowerCluster, logESFailure } = require('@duper/utils');

const handler = async ({ auto_follow_pattern_name = '', verbose }) => {
  const { url: followerUrl } = await getFollowerCluster();

  const requestPath = '_ccr/auto_follow';
  const requestUrl = sysPath.join(followerUrl, requestPath, auto_follow_pattern_name);

  try {
    const resp = await axios({
      method: 'GET',
      url: requestUrl,
    });

    console.log(JSON.stringify(resp.data, null, 2));
  } catch (error) {
    logESFailure({ error, verbose });
  }
};

module.exports = { handler };
