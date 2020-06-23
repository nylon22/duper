const {
  getConfigurationFile,
  writeConfigurationFile,
  logSuccess,
  logFailure,
} = require('@duper/utils');
const fs = require('fs');

const handler = async ({ url, name, role, sslKey, sslCert, sslCa, username, password, apiKey, cloudId, overwrite, verbose }) => {
  const config = await getConfigurationFile();
  let { clusters = [] } = config;

  const clusterAlreadyExists = clusters.some((cluster) => cluster.name === name);

  if (clusterAlreadyExists) {
    if (overwrite) {
      clusters = clusters.filter((cluster) => cluster.name !== name);
    } else {
      logFailure({
        error: `A cluster named "${name}" already exists.`,
        message: 'If you meant to overwrite it, include the --overwrite option'
      });
      return;
    }
  }

  const cluster = {
    node: {
      url,
    },
  };

  if (sslKey || sslCert || sslCa) {
    if (sslKey && !fs.existsSync(sslKey)) {
      logFailure({
        error: `sslKey "${sslKey}" does not exist`
      });
      return;
    }

    if (sslCert && !fs.existsSync(sslCert)) {
      logFailure({
        error: `sslCert "${sslCert}" does not exist`
      });
      return;
    }

    if (sslCa) {
      let invalidCa = false;
      sslCa.forEach(ca => {
        if (!fs.existsSync(ca)) {
          logFailure({
            error: `sslCa "${ca}" does not exist`
          });
          invalidCa = true;
        }
      });

      if (invalidCa) return;
    }
    cluster.node.ssl = { key: sslKey, cert: sslCert, ca: sslCa };
  }

  if (username || password || apiKey) {
    cluster.auth = { username, password, apiKey };
  }

  if (cloudId) {
    cluster.cloud = { id: cloudId };
  }

  clusters.push({ name, options: cluster });
  config.clusters = clusters;

  if (role) {
    if (role === 'leader') {
      config.leaderCluster = name;
    } else if (role === 'follower') {
      config.followerCluster = name;
    }
  }

  try {
    await writeConfigurationFile({ config });

    logSuccess({
      message: `Successfully added "${name}" to cluster configurations`,
      verboseMessage: 'Run "duper config list" to see the clusters in your duper configuration.',
      verbose,
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
