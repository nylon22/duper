const {
  getConfigurationFile,
  writeConfigurationFile,
  logSuccess,
  logFailure,
} = require('@duper/utils');

const handler = async ({ name }) => {
  const config = await getConfigurationFile();
  let { followerCluster = '', clusters = [] } = config;

  const clusterExists = clusters.some((cluster) => cluster.name === name);

  if (!clusterExists) {
    logFailure({
      error: `Cluster named "${name}" does not exist`,
      message: `To set "${name}" as your follower cluster, first run "duper add-cluster"`,
    });
    return;
  }

  if (followerCluster === name) {
    logSuccess({
      message: `Follower cluster is already "${name}"`,
    });
  } else {
    config.followerCluster = name;

    try {
      await writeConfigurationFile({ config });

      logSuccess({
        message: `Successfully set your follower cluster to "${name}"`,
      });
    } catch (error) {
      logFailure({
        error: 'Error writing duper configuration',
        message: error.message,
        stack: error.stack
      });
    }
  }
};

module.exports = { handler };
