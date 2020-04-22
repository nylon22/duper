const axios = require('axios');
const sysPath = require('path');
const chalk = require('chalk');
const { getCurrentCluster } = require('@duper/utils');

const handler = async (argv) => {
  const clusterUrl = await getCurrentCluster();

  const { leader_index, ...payload } = argv;

  const requestPath = '_ccr/forget_follower';
  const requestUrl = sysPath.join(clusterUrl, leader_index, requestPath);

  const resp = await axios({
    method: 'POST',
    url: requestUrl,
    data: payload,
  });

  const message = `Successfully forgot "${leader_index}"

  Elasticsearch Response

  ${JSON.stringify(resp.data, null, 2)}`;

  console.log(`${chalk['green'](message)}`);
};

module.exports = { handler };
