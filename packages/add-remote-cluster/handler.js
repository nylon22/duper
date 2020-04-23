const axios = require('axios');
const sysPath = require('path');
const set = require('lodash.set');
const { getCurrentCluster, logESSuccess, logESFailure } = require('@duper/utils');

const handler = async ({ remote_cluster, seeds, verbose }) => {
  const clusterUrl = await getCurrentCluster();

  try {
    // Get the cluster settings
    const requestPath = '_cluster/settings';
    const requestUrl = sysPath.join(clusterUrl, requestPath);

    const { data } = await axios({
      method: 'GET',
      url: requestUrl,
    });

    // Add the remote cluster and seeds to the cluster settings
    set(data, `persistent.cluster.remote.${remote_cluster}`, { seeds });

    // Save the updated cluster settings
    const resp = await axios({
      method: 'PUT',
      requestPath,
      data,
    });

    logESSuccess({
      message: `Successfully added remote cluster "${remote_cluster}" to follower cluster`,
      response: resp.data,
      verbose,
    });
  } catch (error) {
    logESFailure({ error, verbose });
  }
};

module.exports = { handler };
