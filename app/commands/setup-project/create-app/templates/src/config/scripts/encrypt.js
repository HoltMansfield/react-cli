#!/usr/bin/env node
const nodecipher = require('node-cipher');
const separator = process.platform === 'win32' ? '\\' : '/'

const encrypt = (reactAppEnv) => {
  const clearTextPath = `${process.cwd()}${separator}src${separator}config${separator}secure${separator}${reactAppEnv}.js`
  const secureTextPath = `${process.cwd()}${separator}src${separator}config${separator}secure${separator}${reactAppEnv}.encrypted`

  nodecipher.encrypt({
    input: clearTextPath,
    output: secureTextPath,
    password: process.env.CONFIG_SECRET
  }, function (err, opts) {
    if (err) throw err;
    console.log(`${reactAppEnv}.js encrypted into src/config/secure/${reactAppEnv}.encrypted`)
  })
}

encrypt('local')
//encrypt('development')
