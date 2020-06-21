const fs = require('fs');
const sysPath = require('path');
const globby = require('globby');
const YAML = require('yaml');
const chalk = require('chalk');
const { Client } = require('@elastic/elasticsearch');

const getConfigurationFile = async () => {
  const configPath = sysPath.join(process.env['HOME'], '.duperrc.yml');

  const files = await globby([configPath]);

  if (!files || files.length === 0) {
    return {};
  }

  const config = fs.readFileSync(files[0], 'utf8');

  return YAML.parse(config);
};

const getElasticsearchClient = ({ cluster }) => {
  let key;
  let cert;
  let ca;

  if (cluster.options && cluster.options.ssl && cluster.options.ssl.key) {
    key = fs.readFileSync(cluster.options.ssl.key);
  }

  if (cluster.options && cluster.options.ssl && cluster.options.ssl.cert) {
    cert = fs.readFileSync(cluster.options.ssl.cert);
  }

  if (cluster.options && cluster.options.ssl && cluster.options.ssl.ca) {
    ca = cluster.options.ssl.ca.map(_ca => fs.readFileSync(_ca));
  }

  const client = new Client({
    node: cluster.options.node.url,
    ssl: {
      key,
      cert,
      ca,
    },
    auth: {
      username: cluster.options && cluster.options.auth && cluster.options.auth.username,
      password: cluster.options && cluster.options.auth && cluster.options.auth.password,
      apiKey: cluster.options && cluster.options.auth && cluster.options.auth.apiKey,
    },
    cloud: cluster.options.cloud,
  });

  return client;
};


const getLeaderCluster = async () => {
  const { clusters = [], leaderCluster } = await getConfigurationFile();
  const leader = clusters.find((cluster) => cluster.name === leaderCluster);
  if (!leader || !leaderCluster) {
    throw new Error(
      'Leader cluster is not defined. You can set the leader cluster by running "duper config set-leader-cluster"'
    );
  }

  return { ...leader, client: getElasticsearchClient({ cluster: leader })};
};

const getFollowerCluster = async () => {
  const { clusters = [], followerCluster } = await getConfigurationFile();
  const follower = clusters.find((cluster) => cluster.name === followerCluster);
  if (!follower || !followerCluster) {
    throw new Error(
      'Follower cluster is not defined. You can set the follower cluster by running "duper config set-follower-cluster"'
    );
  }

  return { ...follower, client: getElasticsearchClient({ cluster: follower }) };
};

const writeConfigurationFile = async ({ config }) => {
  const stringifiedConfig = YAML.stringify(config);

  process.chdir(process.env['HOME']);
  fs.writeFileSync('.duperrc.yml', stringifiedConfig, 'utf8');
};

const logESSuccess = ({ message, response, verbose }) => {
  console.log(chalk['green'](message));

  if (verbose) {
    console.log('\nElasticsearch Response\n');
    console.log(JSON.stringify(response, null, 2));
  }
};

const logESFailure = ({ error }) => {
  if (error && error.meta && !!error.meta.statusCode) {
    console.log(chalk['red'](`Status Code: ${error.meta.statusCode}`));
    console.log('\nError Detail:\n');
    console.log(error.meta.body.error);
  } else {
    console.log(error);
  }
};

const logSuccess = ({ message, verbose, verboseMessage }) => {
  console.log(chalk['green'](message));

  if (verbose && verboseMessage) {
    console.log(`\n${verboseMessage}`);
  }
};

const logFailure = ({ error, message, stack}) => {
  console.log(chalk['red'](error));

  if (message) {
    console.log('\nMessage\n');
    console.log(message);
  }

  if (stack) {
    console.log('\nStack\n');
    console.log(stack);
  }
};

// Function that returns only the arguments specified in the builder for the command
const getValidatedArguments = ({ builder, args }) => {
  const validArguments = Object.keys(builder);
  return Object.entries(args).reduce((accum, [key, value]) => {
    if (validArguments.includes(key)) {
      accum[key] = value;
    }
    return accum;
  }, {});
};



module.exports = {
  getConfigurationFile,
  getLeaderCluster,
  getFollowerCluster,
  getElasticsearchClient,
  getLeaderCluster,
  writeConfigurationFile,
  logESSuccess,
  logESFailure,
  logSuccess,
  logFailure,
  getValidatedArguments,
};
