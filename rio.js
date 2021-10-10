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
    console.log('Initialize');
    console.log(path);

    rio.cli = true;

    const { api } = require(path);

    setTimeout(() => {
      console.log(rio.argsForEndpoint);
    }, 1000);
  });

program
  .parse(process.argv);
