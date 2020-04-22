const chalk = require('chalk');
const { getConfigurationFile, writeConfigurationFile } = require('@duper/utils');

const handler = async (argv) => {
  const { url, name } = argv;

  if (!url) {
    throw new Error('Missing required argument: "url"');
  }

  if (!name) {
    throw new Error('Missing required argument: "name"');
  }

  const config = await getConfigurationFile();
  let { current, clusters = [] } = config;

  const clusterAlreadyExists = clusters.some((cluster) => cluster.name === name);

  if (clusterAlreadyExists) {
    throw new Error(
      `Failed to add new Elasticsearch cluster configuration. A cluster with the name "${name}" already exists`
    );
  }

  clusters.push({ url, name });
  config.clusters = clusters;

  // Set the current cluster if they do not have one
  if (!current || config.clusters.length === 1) {
    config.current = name;
  }

  await writeConfigurationFile({ config });

  const message = `Successfully added "${name}" to cluster configurations

  Run "duper config list" to see the clusters in your duper configuration.
  `;
  console.log(`${chalk['green'](message)}`);
};

module.exports = {
  command: 'add-cluster',
  describe: 'Add a new Elasticsearch cluster configuration',
  builder: {},
  handler,
};
