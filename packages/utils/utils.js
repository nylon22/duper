const fs = require('fs');
const sysPath = require('path');
const globby = require('globby');
const YAML = require('yaml');
const chalk = require('chalk');

const getConfigurationFile = async () => {
  const configPath = sysPath.join(process.env['HOME'], '.duperrc.yml');

  const files = await globby([configPath]);

  if (!files || files.length === 0) {
    return {};
  }

  const config = fs.readFileSync(files[0], 'utf8');

  return YAML.parse(config);
};

const getLeaderCluster = async () => {
  const { clusters = [], leaderCluster } = await getConfigurationFile();
  const leader = clusters.find((cluster) => cluster.name === leaderCluster);
  if (!leader || !leaderCluster) {
    throw new Error(
      'Leader cluster is not defined. You can set the leader cluster by running "duper config set-leader-cluster"'
    );
  }

  return leader;
};

const getFollowerCluster = async () => {
  const { clusters = [], followerCluster } = await getConfigurationFile();
  const follower = clusters.find((cluster) => cluster.name === followerCluster);
  if (!follower || !followerCluster) {
    throw new Error(
      'Follower cluster is not defined. You can set the follower cluster by running "duper config set-follower-cluster"'
    );
  }

  return follower;
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

const logESFailure = ({ error, verbose }) => {
  console.log(chalk['red'](error.message));

  if (verbose) {
    console.log('\nStack Trace\n');
    console.log(error.stack);
  }
};

const log = ({ message, verbose, verboseMessage, color }) => {
  console.log(chalk[color](message));

  if (verbose && verboseMessage) {
    console.log(`\n${verboseMessage}`);
  }
};

const logSuccess = ({ ...args }) => {
  log({ ...args, color: 'green' });
};

const logFailure = ({ ...args }) => {
  log({ ...args, color: 'red' });
};

module.exports = {
  getConfigurationFile,
  getLeaderCluster,
  getFollowerCluster,
  writeConfigurationFile,
  logESSuccess,
  logESFailure,
  logSuccess,
  logFailure,
};
