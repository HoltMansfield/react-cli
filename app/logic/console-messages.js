const chalk = require('chalk')
const serializeError = require('serialize-error')
/* eslint-disable-next-line no-console  */
const log = console.log


const info = (content) => {
  log(chalk.blue(content))
}

const label = (label, data) => {
  info(label)
  info(JSON.stringify(data, null, 2))
}

const success = (content) => {
  log(chalk.green(content))
}

const paragraph = (content) => {
  log(chalk.underline.bgBlue(content))
}

const error = (content) => {
  log(chalk.red(content))
}

const handleError = (err, title) => {
  error(`******** ERROR HANDLED IN: ${title} ********`)
  log(chalk.green(JSON.stringify(serializeError(err), null, 2)))
  error('***************************************')
}

const json = (data) => {
  info(JSON.stringify(data, null, 2))
}

module.exports = {
  info,
  label,
  paragraph,
  error,
  handleError,
  json,
  success
}
