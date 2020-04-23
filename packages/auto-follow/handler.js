const axios = require('axios');
const sysPath = require('path');
const { getCurrentCluster, logESSuccess, logESFailure } = require('@duper/utils');

const handler = async ({ auto_follow_pattern_name, verbose, ...payload }) => {
  const clusterUrl = await getCurrentCluster();

  const requestPath = '_ccr/auto_follow';
  const requestUrl = sysPath.join(clusterUrl, requestPath, auto_follow_pattern_name);

  try {
    const resp = await axios({
      method: 'PUT',
      url: requestUrl,
      data: payload,
    });

    logESSuccess({
      message: `Successfully auto-followed "${payload.leader_index_patterns.join(', ')}"`,
      response: resp.data,
      verbose,
    });
  } catch (error) {
    logESFailure({ error, verbose });
  }
};

module.exports = { handler };
