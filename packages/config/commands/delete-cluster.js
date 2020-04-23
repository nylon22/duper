const {
  getConfigurationFile,
  writeConfigurationFile,
  logSuccess,
  logFailure,
} = require('@duper/utils');

const handler = async ({ name }) => {
  if (!name) {
    throw new Error('Missing required argument: name');
  }

  const config = await getConfigurationFile();
  let { clusters = [] } = config;

  const clusterExists = clusters.some((cluster) => cluster.name === name);

  if (!clusterExists) {
    logFailure({
      message: `Cluster with name "${name}" does not exist`,
    });
    return;
  }

  config.clusters = clusters.filter((cluster) => cluster.name !== name);

  if (config.current === name) {
    delete config.current;
  }

  await writeConfigurationFile({ config });

  logSuccess({
    message: `Successfully deleted cluster named "${name}"`,
  });
};

module.exports = {
  command: 'delete-cluster',
  describe: 'Delete a Elasticsearch cluster configuration',
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
