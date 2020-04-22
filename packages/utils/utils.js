const fs = require('fs');
const sysPath = require('path');
const globby = require('globby');
const YAML = require('yaml');

const getConfigurationFile = async () => {
  const configPath = sysPath.join(process.env['HOME'], '.duperrc.yml');

  const files = await globby([configPath]);

  if (!files || files.length === 0) {
    return {};
  }

  const config = fs.readFileSync(files[0], 'utf8');

  return YAML.parse(config);
};

const getCurrentCluster = async () => {
  const { clusters = [], current } = await getConfigurationFile();
  const currentCluster = clusters.find((cluster) => cluster.name === current);
  if (!currentCluster) {
    throw new Error(
      'Current cluster is not defined. Please add cluster first by running "duper config add"'
    );
  }

  return currentCluster;
};

const writeConfigurationFile = async ({ config }) => {
  const stringifiedConfig = YAML.stringify(config);

  process.chdir(process.env['HOME']);
  fs.writeFileSync('.duperrc.yml', stringifiedConfig, 'utf8');
};

module.exports = {
  getConfigurationFile,
  getCurrentCluster,
  writeConfigurationFile,
};
