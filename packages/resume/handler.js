const axios = require('axios');
const sysPath = require('path');
const chalk = require('chalk');
const { getCurrentCluster } = require('@duper/utils');

const handler = async (argv) => {
  const clusterUrl = await getCurrentCluster();
  const { follower_index, ...payload } = argv;

  const requestPath = '_ccr/resume_follow';
  const requestUrl = sysPath.join(clusterUrl, follower_index, requestPath);

  const resp = await axios({
    method: 'POST',
    url: requestUrl,
    data: payload,
  });

  const message = `Successfully resumed following from "${follower_index}"

  Elasticsearch Response

  ${JSON.stringify(resp.data, null, 2)}`;

  console.log(`${chalk['green'](message)}`);
};

module.exports = { handler };
