#!/usr/bin/env node

const rek = require('rekuire')
const program = require('commander')
const { addSetupProjectCommands } = rek('add-setup-project-commands')
const { addInProjectCommands } = rek('add-in-project-commands')

// set some meta-data
program
  .version('0.0.1')
  .description(
    'Generate react apps, react npm packages, and once generated, can generate elements of apps'
  )

// wire up commands
addSetupProjectCommands(program)
addInProjectCommands(program)

// listen for user input
program.parse(process.argv)
