const chalk = require('chalk');
const { getConfigurationFile, writeConfigurationFile } = require('@duper/utils');

const handler = async (argv) => {
  const { name } = argv;

  if (!name) {
    throw new Error('Missing required argument: "name"');
  }

  const config = await getConfigurationFile();
  let { current = '', clusters = [] } = config;

  const clusterExists = clusters.some((cluster) => cluster.name === name);

  if (!clusterExists) {
    const message = `Cluster with name "${name}" does not exist

    To set "${name}" as the current cluster, first run "duper config add-cluster"`;
    throw new Error(message);
  }

  if (current === name) {
    const message = `Current cluster configuration is already "${name}"`;
    console.log(`${chalk['gray'](message)}`);
    return;
  }

  config.current = name;

  await writeConfigurationFile({ config });

  const message = `Successfully set current cluster to "${name}"`;

  console.log(`${chalk['green'](message)}`);
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
