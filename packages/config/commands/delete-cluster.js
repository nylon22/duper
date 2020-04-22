const chalk = require('chalk');
const { getConfigurationFile, writeConfigurationFile } = require('@duper/utils');

const handler = async (argv) => {
  const { name } = argv;

  if (!name) {
    throw new Error('Missing required argument: "name"');
  }

  const config = await getConfigurationFile();
  let { clusters = [] } = config;

  const clusterExists = clusters.some((cluster) => cluster.name === name);

  if (!clusterExists) {
    throw new Error(`Cluster with name "${name}" does not exist`);
  }

  config.clusters = clusters.filter((cluster) => cluster.name !== name);

  if (config.current === name) {
    delete config.current;
  }

  await writeConfigurationFile({ config });

  const message = `Successfully deleted cluster named "${name}"`;
  console.log(`${chalk['green'](message)}`);
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
