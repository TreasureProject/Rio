#!/usr/bin/env node

const { Command } = require('commander');

const program = new Command();
program
  .version('0.0.1');

program
  .command('init')
  .description('Initialize')
  .action(() => {
    console.log('Initialize');
  });

program
  .parse(process.argv);
