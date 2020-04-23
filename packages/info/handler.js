const axios = require('axios');
const sysPath = require('path');
const { getCurrentCluster, logESFailure } = require('@duper/utils');

const handler = async ({ index, verbose }) => {
  const clusterUrl = await getCurrentCluster();

  const _index = index.join(',');
  const requestPath = '_ccr/info';
  const requestUrl = sysPath.join(clusterUrl, _index, requestPath);

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
