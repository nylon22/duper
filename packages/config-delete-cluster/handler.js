const {
  getConfigurationFile,
  writeConfigurationFile,
  logSuccess,
  logFailure,
} = require('@duper/utils');

const handler = async ({ name }) => {
  const config = await getConfigurationFile();
  let { clusters = [] } = config;

  const clusterExists = clusters.some((cluster) => cluster.name === name);

  if (!clusterExists) {
    logFailure({
      error: `Cluster named "${name}" does not exist`,
    });
    return;
  }

  config.clusters = clusters.filter((cluster) => cluster.name !== name);

  if (config.followerCluster === name) {
    delete config.followerCluster;
  }

  if (config.leaderCluster === name) {
    delete config.leaderCluster;
  }

  try {
    await writeConfigurationFile({ config });

    logSuccess({
      message: `Successfully deleted cluster named "${name}"`,
    });
  } catch (error) {
    logFailure({
      error: 'Error writing duper configuration',
      message: error.message,
      stack: error.stack
    });
  }
};

module.exports = { handler };
