const axios = require('axios');
const sysPath = require('path');
const { getFollowerCluster, logESFailure } = require('@duper/utils');

const handler = async ({ index, verbose }) => {
  const { url: followerUrl } = await getFollowerCluster();

  const _index = index.join(',');

  const requestPath = '_ccr/stats';
  const requestUrl = sysPath.join(followerUrl, _index, requestPath);

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
