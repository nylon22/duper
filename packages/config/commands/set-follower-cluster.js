const {
  getConfigurationFile,
  writeConfigurationFile,
  logSuccess,
  logFailure,
} = require('@duper/utils');

const handler = async ({ name, verbose }) => {
  if (!name) {
    throw new Error('Missing required argument: name');
  }

  const config = await getConfigurationFile();
  let { followerCluster = '', clusters = [] } = config;

  const clusterExists = clusters.some((cluster) => cluster.name === name);

  if (!clusterExists) {
    logFailure({
      message: `Cluster with name "${name}" does not exist`,
      verboseMessage: `To set "${name}" as your follower cluster, first run "duper config add-cluster"`,
      verbose,
    });
    return;
  }

  if (followerCluster === name) {
    logSuccess({
      message: `Follower cluster is already "${name}"`,
    });
  } else {
    config.followerCluster = name;

    await writeConfigurationFile({ config });

    logSuccess({
      message: `Successfully set your follower cluster to "${name}"`,
    });
  }
};

module.exports = {
  command: 'set-follower-cluster',
  describe: 'Set your follower cluster',
  builder: {
    name: {
      alias: 'n',
      desc: 'The friendly name for the Elasticsearch cluster',
      type: 'string',
      demandOption: true,
    },
  },
  handler,
};
