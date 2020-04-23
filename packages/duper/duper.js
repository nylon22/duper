#!/usr/bin/env node

const chalk = require('chalk');

process.title = '@duper/duper';

const yargs = require('yargs');
yargs
  .usage('Usage: $0 <command> [options]')
  .alias('h', 'help')
  .alias('v', 'version')
  .option('verbose', {
    default: false,
    type: 'boolean',
    describe: 'Turn on verbose output',
    global: true,
  })
  .wrap(yargs.terminalWidth())
  .demandCommand(1, 'Pass --help to see all available commands and options.')
  .strict()
  .showHelpOnFail(true)
  .command(require('@duper/config'))
  .command(require('@duper/follow'))
  .command(require('@duper/pause'))
  .command(require('@duper/resume'))
  .command(require('@duper/unfollow'))
  .command(require('@duper/forget'))
  .command(require('@duper/info'))
  .command(require('@duper/stats'))
  .command(require('@duper/auto-follow'))
  .command(require('@duper/pause-auto-follow'))
  .command(require('@duper/resume-auto-follow'))
  .command(require('@duper/delete-auto-follow'))
  .command(require('@duper/get-auto-follow'))
  .recommendCommands()
  .parse(process.argv.slice(2));

process.on('unhandledRejection', (error) => {
  // eslint-disable-next-line no-console
  console.log(`${chalk['red'](error.stack)}`);
});
