#!/usr/bin/env node

import fs from 'fs'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import component from './component'

yargs(hideBin(process.argv))
  .scriptName('generate')
  .usage('Usage: $0 <command> [options]')
  .demandCommand(1, 'must provide a valid command')
  .help('h').alias('h', 'help')
  .option('r', {
    alias: 'root',
    default: './components',
    describe: 'sets the root directory',
    type: 'string'
  })
  .command(component)
  .argv
