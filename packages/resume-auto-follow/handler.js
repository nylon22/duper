const axios = require('axios');
const sysPath = require('path');
const { getCurrentCluster, logESSuccess, logESFailure } = require('@duper/utils');

const handler = async ({ auto_follow_pattern_name, verbose }) => {
  const clusterUrl = await getCurrentCluster();

  const requestPath = '_ccr/auto_follow';
  const requestUrl = sysPath.join(clusterUrl, requestPath, auto_follow_pattern_name, 'resume');

  try {
    const resp = await axios({
      method: 'POST',
      url: requestUrl,
    });

    logESSuccess({
      message: `Successfully resumed auto-following pattern "${auto_follow_pattern_name}"`,
      response: resp.data,
      verbose,
    });
  } catch (error) {
    logESFailure({ error, verbose });
  }
};

module.exports = { handler };
