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
  let { current = '', clusters = [] } = config;

  const clusterExists = clusters.some((cluster) => cluster.name === name);

  if (!clusterExists) {
    logFailure({
      message: `Cluster with name "${name}" does not exist`,
      verboseMessage: `To set "${name}" as the current cluster, first run "duper config add-cluster"`,
      verbose,
    });
    return;
  }

  if (current === name) {
    logSuccess({
      message: `Current cluster configuration is already "${name}"`,
    });
  } else {
    config.current = name;

    await writeConfigurationFile({ config });

    logSuccess({
      message: `Successfully set current cluster to "${name}"`,
    });
  }
};

module.exports = {
  command: 'set-current-cluster',
  describe: 'Set the current cluster',
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
