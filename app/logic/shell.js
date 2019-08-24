const rek = require('rekuire')
const shell = require('shelljs')
const exec = require('child_process').exec
const messages = rek('console-messages')


const execute = async (command) => {
  if (process.NODE_ENV !== 'test') {
    return await shell.exec(command)
  }

  messages.info(`Shell command: ${command}`)
}

const executeAsync = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error !== null) {
        reject(error)
      }

      resolve(true)
    })
  })
}

module.exports = {
  execute,
  executeAsync
}
