const rek = require('rekuire')
const inquirer = require('inquirer')
const projectPaths = rek('project-paths')
const rmrf = require('rmrf')
const fs = require('fs').promises
const shell = rek('shell')
const fileSystem = rek('file-system')
const packageDotJson = rek('package-dot-json')
const messages = rek('console-messages')

// root gets set in addFirebase
let root

const addNpmPackages = async (appName) => {
  const seperator = projectPaths.getSeparator()
  const packageList = [
    'firebase'
  ]

  try {
    // first we install npm packages
    await shell.executeAsync(`cd ${appName} && npm i ${packageList.join(' ')}`)
    messages.info('**** firebase npm packages added ****')
    return
  } catch (e) {
    messages.handleError(e, 'addNpmPackages')
  }
}

const copyTemplates = async (root) => {
  try {
    // copy over the whole root
    const templateRootPath = `${__dirname}/templates`
    const command = `cp -a ${templateRootPath}/. ${root}/`
    shell.execute(command)
    messages.info('**** firebase templates copied ****')
  } catch (e) {
    messages.handleError(e, 'copyTemplates')
  }
}

const inquire = async () => {
  const questions = [
    {
      type: 'input',
      name: 'apiKey',
      message: "What's your firebase API Key?"
    },
    {
      type: 'input',
      name: 'authDomain',
      message: "What's your firebase Auth Domain?"
    },
    {
      type: 'input',
      name: 'authDomain',
      message: "What's your firebase Database URL?"
    },
    {
      type: 'input',
      name: 'projectId',
      message: "What's your firebase Project Id?"
    },
    {
      type: 'input',
      name: 'messagingSenderId',
      message: "What's your firebase Messaging Sender Id?"
    }
  ]
  try {
    shell.execute('cls')
    const answers = await inquirer.prompt(questions)
    return answers
  } catch (e) {
    messages.handleError(e, 'inquire')
  }
}

const updateConfig = async (firebaseConfig) => {
  const path = `${root}/src/config/secure/local.js`
  let config = await fileSystem.readFileIntoString(path)

  config = config.replace('"apiKey"', `"${firebaseConfig.apiKey}"`)
  config = config.replace('"authDomain"', `"${firebaseConfig.authDomain}"`)
  config = config.replace('"projectId"', `"${firebaseConfig.projectId}"`)
  config = config.replace('"messagingSenderId"', `"${firebaseConfig.messagingSenderId}"`)

  await fileSystem.writeFile(path, config)
  messages.info(`Config updated at: ${path}`)
}

const addFirebase = async (appName) => {
  try {
    const firebaseConfig = await inquire()
    root = `${process.cwd()}/${appName}`
    await copyTemplates(root)
    await updateConfig(firebaseConfig)
    await addNpmPackages(appName)
    // {  apiKey: "AIzaSyBWf3-Pe0GK4rxzqFFlLkq12mkyqBwneew",
    //   authDomain: "teamrealtime-c7174.firebaseapp.com",
    //   databaseURL: "https://teamrealtime-c7174.firebaseio.com",
    //   projectId: "teamrealtime-c7174",
    //   storageBucket: "",
    //   messagingSenderId: "821975896645"
    // }
  } catch (e) {
    messages.handleError(e, 'addFirebase')
  }
}

module.exports = {
  addFirebase
}
