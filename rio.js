#!/usr/bin/env node
const childProcess = require('child_process');
const { Command } = require('commander');
const rio = require('./src/index');

const program = new Command();
program
  .version('0.0.1');

program
  .command('init')
  .argument('[path]', 'path to api', './api.js')
  .description('Initialize')
  .action((path) => {
    rio.cli = true;

    // eslint-disable-next-line
    const { server } = require(path);

    rio.writeREADME(process.cwd());
    if (server) {
      server.close();
    }
  });

program
  .parse(childProcess.argv);
