#!/usr/bin/env node
const nodecipher = require('node-cipher');
const separator = process.platform === 'win32' ? '\\' : '/'

const encrypt = (reactAppEnv) => {
  const clearTextPath = `${process.cwd()}${separator}src${separator}config${separator}secure${separator}${reactAppEnv}.js`
  const secureTextPath = `${process.cwd()}${separator}src${separator}config${separator}secure${separator}${reactAppEnv}.encrypted`

  nodecipher.decrypt({
    input: secureTextPath,
    output: clearTextPath,
    password: process.env.CONFIG_SECRET
  }, function (err, opts) {
    if (err) throw err;
    console.log(`${reactAppEnv}.encrypted decrypted into src/config/secure/${reactAppEnv}.js`)
  })
}

encrypt('local')
//encrypt('development')
