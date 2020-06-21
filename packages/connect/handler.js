const set = require('lodash.set');
const {
  getFollowerCluster,
  getLeaderCluster,
  logESSuccess,
  logESFailure,
} = require('@duper/utils');

const handler = async ({ seeds, verbose }) => {
  const { client } = await getFollowerCluster();
  const { name: remote_cluster } = await getLeaderCluster();

  try {
    // Get the cluster settings
    const { body: data } = await client.cluster.getSettings();

    // Add the remote cluster and seeds to the cluster settings
    set(data, `persistent.cluster.remote.${remote_cluster}`, { seeds });

    // Save the updated cluster settings
    const resp = await client.cluster.putSettings({
      body: data,
    });

    logESSuccess({
      message: `Successfully connected leader cluster "${remote_cluster}" to your follower cluster`,
      response: resp.body,
      verbose,
    });
  } catch (error) {
    logESFailure({ error });
  }
};

module.exports = { handler };
