const axios = require('axios');
const sysPath = require('path');
const chalk = require('chalk');
const { getCurrentCluster } = require('@duper/utils');

const handler = async (argv) => {
  const clusterUrl = await getCurrentCluster();
  const { follower_index, wait_for_active_shards, ...payload } = argv;

  const requestPath = '_ccr/follow';
  const requestUrl = sysPath.join(clusterUrl, follower_index, requestPath);

  const resp = await axios({
    method: 'PUT',
    url: requestUrl,
    data: payload,
    params: {
      wait_for_active_shards,
    },
  });

  const message = `Successfully followed "${payload.leader_index}" from "${follower_index}"

  Elasticsearch Response

  ${JSON.stringify(resp.data, null, 2)}`;

  console.log(`${chalk['green'](message)}`);
};

module.exports = { handler };
