const rek = require('rekuire')
const shell = require('shelljs')
const messages = rek('messages')


const execute = async (command) => {
  if (process.NODE_ENV !== 'test') {
    return await shell.exec(command)
  }

  messages.info(`Shell command: ${command}`)
}

module.exports = {
  execute
}
