const listCmd = require('./list');
const addClusterCmd = require('./add-cluster');
const setCurrentClusterCmd = require('./set-current-cluster');

module.exports = {
  command: 'config',
  describe: 'Duper configuration commands',
  builder: (yargs) => {
    yargs
      .usage('Usage: $0 config <command> [options]')
      .command(listCmd)
      .command(addClusterCmd)
      .command(setCurrentClusterCmd)
      .option('url', {
        alias: 'u',
        desc: 'The url of the Elasticsearch cluster',
        type: 'string',
        global: true,
      })
      .option('name', {
        alias: 'n',
        desc: 'The friendly name for the Elasticsearch cluster',
        type: 'string',
        global: true,
      });

    // If they don't specify a sub-command of "config", show the help
    if (yargs.argv._.length < 2) {
      yargs.showHelp();
    }
  },
};
