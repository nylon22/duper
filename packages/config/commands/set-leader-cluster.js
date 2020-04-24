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
  let { leaderCluster = '', clusters = [] } = config;

  const clusterExists = clusters.some((cluster) => cluster.name === name);

  if (!clusterExists) {
    logFailure({
      message: `Cluster with name "${name}" does not exist`,
      verboseMessage: `To set "${name}" as your leader cluster, first run "duper config add-cluster"`,
      verbose,
    });
    return;
  }

  if (leaderCluster === name) {
    logSuccess({
      message: `Leader cluster is already "${name}"`,
    });
  } else {
    config.leaderCluster = name;

    await writeConfigurationFile({ config });

    logSuccess({
      message: `Successfully set your leader cluster to "${name}"`,
    });
  }
};

module.exports = {
  command: 'set-leader-cluster',
  describe: 'Set your leader cluster',
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
