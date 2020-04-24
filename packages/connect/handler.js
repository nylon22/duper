const axios = require('axios');
const sysPath = require('path');
const set = require('lodash.set');
const {
  getFollowerCluster,
  getLeaderCluster,
  logESSuccess,
  logESFailure,
} = require('@duper/utils');

const handler = async ({ seeds, verbose }) => {
  const { url: followerUrl } = await getFollowerCluster();
  const { name: remote_cluster } = await getLeaderCluster();

  try {
    // Get the cluster settings
    const requestPath = '_cluster/settings';
    const requestUrl = sysPath.join(followerUrl, requestPath);

    const { data } = await axios({
      method: 'GET',
      url: requestUrl,
    });

    // Add the remote cluster and seeds to the cluster settings
    set(data, `persistent.cluster.remote.${remote_cluster}`, { seeds });

    // Save the updated cluster settings
    const resp = await axios({
      method: 'PUT',
      requestUrl,
      data,
    });

    logESSuccess({
      message: `Successfully added leader cluster "${remote_cluster}" to your follower cluster`,
      response: resp.data,
      verbose,
    });
  } catch (error) {
    logESFailure({ error, verbose });
  }
};

module.exports = { handler };
