const axios = require('axios');
const sysPath = require('path');
const { getCurrentCluster, logESSuccess, logESFailure } = require('@duper/utils');

const handler = async ({ leader_index, verbose, ...payload }) => {
  const clusterUrl = await getCurrentCluster();

  const requestPath = '_ccr/forget_follower';
  const requestUrl = sysPath.join(clusterUrl, leader_index, requestPath);

  try {
    const resp = await axios({
      method: 'POST',
      url: requestUrl,
      data: payload,
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
