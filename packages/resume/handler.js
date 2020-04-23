const axios = require('axios');
const sysPath = require('path');
const { getCurrentCluster, logESSuccess, logESFailure } = require('@duper/utils');

const handler = async ({ follower_index, verbose, ...payload }) => {
  const clusterUrl = await getCurrentCluster();

  const requestPath = '_ccr/resume_follow';
  const requestUrl = sysPath.join(clusterUrl, follower_index, requestPath);

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
