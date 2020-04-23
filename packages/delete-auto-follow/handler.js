const axios = require('axios');
const sysPath = require('path');
const chalk = require('chalk');
const { getCurrentCluster } = require('@duper/utils');

const handler = async (argv) => {
  const clusterUrl = await getCurrentCluster();

  const { auto_follow_pattern_name } = argv;

  const requestPath = '_ccr/auto_follow';
  const requestUrl = sysPath.join(clusterUrl, requestPath, auto_follow_pattern_name);

  const resp = await axios({
    method: 'DELETE',
    url: requestUrl,
  });

  const message = `Successfully deleted auto-follow pattern "${auto_follow_pattern_name}"

  Elasticsearch Response

  ${JSON.stringify(resp.data, null, 2)}`;

  console.log(`${chalk['green'](message)}`);
};

module.exports = { handler };
