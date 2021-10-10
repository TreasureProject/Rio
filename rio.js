#!/usr/bin/env node
const process = require('child_process');
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
    require(path);

    rio.writeREADME();
  });

program
  .parse(process.argv);
