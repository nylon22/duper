const chalk = require('chalk');
const YAML = require('yaml');
const { getConfigurationFile } = require('@duper/utils');

const handler = async () => {
  const config = await getConfigurationFile();

  const stringifiedConfig = YAML.stringify(config);

  console.log(`${chalk['white'](stringifiedConfig)}`);
};

module.exports = {
  command: 'list',
  describe: 'Show duper configuration',
  handler,
};
