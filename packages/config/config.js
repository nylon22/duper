const {
  listCmd,
  addClusterCmd,
  setLeaderClusterCmd,
  setFollowerClusterCmd,
  deleteClusterCmd,
} = require('./commands/index');

module.exports = {
  command: 'config',
  describe: 'Manage your duper configuration',
  builder: (yargs) => {
    yargs
      .usage('Usage: $0 config <command> [options]')
      .command(listCmd)
      .command(addClusterCmd)
      .command(setLeaderClusterCmd)
      .command(setFollowerClusterCmd)
      .command(deleteClusterCmd)
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
      })
      .option('role', {
        alias: 'r',
        desc: 'The role of the cluster',
        choices: ['leader', 'follower'],
        global: true,
      });

    // If they don't specify a sub-command of "config", show the help
    if (yargs.argv._.length < 2) {
      yargs.showHelp();
    }
  },
};
