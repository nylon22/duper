const axios = require('axios');
const sysPath = require('path');
const chalk = require('chalk');
const { getCurrentCluster } = require('@duper/utils');

const handler = async (argv) => {
  const clusterUrl = await getCurrentCluster();

  const index = argv.index.join(',');

  const requestPath = '_ccr/info';
  const requestUrl = sysPath.join(clusterUrl, index, requestPath);

  const resp = await axios({
    method: 'GET',
    url: requestUrl,
  });

  const message = `Elasticsearch Response

  ${JSON.stringify(resp.data, null, 2)}`;

  console.log(`${chalk['green'](message)}`);
};

module.exports = { handler };


