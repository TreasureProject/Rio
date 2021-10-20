#!/usr/bin/env node
const childProcess = require('child_process');
const { Command } = require('commander');
const rio = require('./src/index');

const program = new Command();
program
  .version('0.0.1');

function callCommand(path, options, callback) {
  rio.cli = true;

  let isPrivate = options.private;
  if (isPrivate == null) {
    isPrivate = false;
  }

  // eslint-disable-next-line
  const { server } = require(path);

  const isPublic = !isPrivate;
  callback(isPublic);

  if (server) {
    server.close();
  }
}

program
  .command('init')
  .argument('[path]', 'path to api', './api.js')
  .option('--private', 'Whether to make it public or not')
  .description('Initialize')
  .action((path, options) => {
    callCommand(path, options, (isPublic) => {
      rio.writeREADME(process.cwd(), isPublic);
    });
  });

program
  .command('oas')
  .argument('[path]', 'path to api', './api.js')
  .option('--private', 'Whether to make it public or not')
  .description('Create OAS')
  .action((path, options) => {
    callCommand(path, options, (isPublic) => {
      rio.oasGenerate(process.cwd(), isPublic);
    });
  });

program
  .parse(childProcess.argv);
