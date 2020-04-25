const {
  getConfigurationFile,
  writeConfigurationFile,
  logSuccess,
  logFailure,
} = require('@duper/utils');

const handler = async ({ url, name, verbose, role }) => {
  if (!url) {
    throw new Error('Missing required argument: url');
  }

  if (!name) {
    throw new Error('Missing required argument: name');
  }

  const config = await getConfigurationFile();
  let { clusters = [] } = config;

  const clusterAlreadyExists = clusters.some((cluster) => cluster.name === name);

  if (clusterAlreadyExists) {
    logFailure({
      message: `Failed to add new Elasticsearch cluster configuration. A cluster with the name "${name}" already exists`,
    });
    return;
  }

  clusters.push({ url, name });
  config.clusters = clusters;

  if (role) {
    if (role === 'leader') {
      role.leaderCluster = name;
    } else if (role === 'follower') {
      role.followerCluster = name;
    }

  }

  await writeConfigurationFile({ config });

  logSuccess({
    message: `Successfully added "${name}" to cluster configurations`,
    verboseMessage: 'Run "duper config list" to see the clusters in your duper configuration.',
    verbose,
  });
};

module.exports = {
  command: 'add-cluster',
  describe: 'Add a new Elasticsearch cluster configuration',
  builder: {},
  handler,
};
