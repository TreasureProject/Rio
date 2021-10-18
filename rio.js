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
  .option('--private', 'Whether to make it public or not')
  .description('Initialize')
  .action((path, options) => {
    rio.cli = true;

    let isPrivate = options.private;
    if (isPrivate == null) {
      isPrivate = false;
    }
    const isPublic = !isPrivate;

    // eslint-disable-next-line
    const { server } = require(path);

    rio.writeREADME(process.cwd(), isPublic);
    if (server) {
      server.close();
    }
  });

program
  .parse(childProcess.argv);
