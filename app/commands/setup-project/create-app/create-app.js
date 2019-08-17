const rek = require('rekuire')
const projectPaths = rek('project-paths')
const rmrf = require('rmrf')
const fs = require('fs').promises
const shell = rek('shell')
const fileSystem = rek('file-system')
const packageDotJson = rek('package-dot-json')
const messages = rek('messages')


let root
let newAppName


const deleteCRAStockContent = async (root, seperator) => {
  try {
    // delete a few files from the root
    await fileSystem.deleteFile(`${root}${seperator}yarn.lock`)
    await fileSystem.deleteFile(`${root}${seperator}README.md`)
    await fileSystem.deleteFile(`${root}${seperator}.gitignore`)

    // these next two lines can go if I ever figure out how to 'lerna add' the react-cli package
    await fileSystem.deleteFile(`${root}${seperator}package-lock.json`)
    shell.execute('rm -rf node_modules')

    // delete the src direct and all of its contents
    await rmrf(`${root}${seperator}src`)

    // replace src directory
    await fs.mkdir(`${root}${seperator}src`)

    return
  } catch (e) {
    messages.handleError(e, 'deleteCRAStockContent')
  }
}

const copyTemplates = async (root, seperator) => {
  try {
    // copy over the whole root
    const templateRootPath = `${__dirname}${seperator}templates`
    shell.execute(`cp -a ${templateRootPath}/. ${root}/`)
  } catch (e) {
    messages.handleError(e, 'copyTemplates')
  }
}

const addNpmPackages = async () => {
  const seperator = projectPaths.getSeparator()
  const packageList = [
    'animate-css-styled-components',
    'axios',
    'immer',
    'flexbox-react',
    'formik',
    'moment',
    '@material-ui/core',
    '@material-ui/icons',
    'material-ui-pickers',
    'styled-components',
    'redux-devtools-extension',
    'react-redux', // Do we need this???
    'redux',
    'react-intl',
    'react-loadable',
    'react-router-dom@next',
    'react-router@next',
    'use-substate',
    'use-media',
    'react-toastify',
    '@sentry/browser',
    'yup'
  ]
  const devPackageList = [
    'react-testing-library',
    'react-hooks-testing-library',
    'react-intl.macro',
    'react-intl-translations-manager',
    'react-test-renderer',
    'testdouble-jest',
    'testdouble',
    'node-cipher'
  ]

  try {
    // first we install npm packages
    shell.execute(`cd ${newAppName} && npm i ${packageList.join(' ')}`)

    await fileSystem.deleteFile(`${root}${seperator}package-lock.json`)

    // then we install dev npm packages
    shell.execute(`cd ${newAppName} && npm i -D ${devPackageList.join(' ')}`)
    return
  } catch (e) {
    messages.handleError(e, 'addNpmPackages')
  }
}

const addNpmScripts = async () => {
  try {
    await packageDotJson.addScript({
      name: 'generate-messages',
      value: 'MESSAGE_DIR=\'src/i18n/messages\' react-scripts build',
      docValue: 'Generate messages file in i18n/messages'
    }, root)
    await packageDotJson.addScript({
      name: 'generate-translations',
      value: 'node ./translationRunner.js',
      docValue: 'Create/update keys in translations files in i18n/locales bases on messages file'
    }, root)
    await packageDotJson.addScript({
      name: 'test:no-watch',
      value: 'CI=true REACT_APP_ENV=jest react-scripts test',
      docValue: 'Runs tests once.  Used by circlCI, devs will generally use the test commmand'
    }, root)
    await packageDotJson.addScript({
      name: 'encrypt-config',
      value: 'node ./src/config/scripts/encrypt.js',
      docValue: '(*** check README.md ***) This command encrypts the config'
    }, root)
    await packageDotJson.addScript({
      name: 'decrypt-config',
      value: 'node ./src/config/scripts/decrypt.js',
      docValue: '(*** check README.md ***) This command decrypts the config'
    }, root)
  } catch (e) {
    messages.handleError(e, 'addNpmScripts')
  }
}

const updateNpmScripts = () => {
  return packageDotJson.updateScript('test','REACT_APP_ENV=jest react-scripts test', root)
}

const updateNpmSections = () => {
  const newValue = {
    extends: "react-app",
    globals: {
      td: true
    }
  }
  return packageDotJson.updateSection('eslintConfig', newValue)
}

const createAppFromCRA = async () => {
  const seperator = projectPaths.getSeparator()

  try {
    // delete the existing stock content that create-react-app creates
    await deleteCRAStockContent(root, seperator)
    // insert our bare-bones content (redux, react-intl)
    await copyTemplates(root, seperator)
    await addNpmPackages()
    await addNpmScripts()
    await updateNpmScripts()
    await packageDotJson.clean(root)
  } catch (e) {
    messages.handleError(e, 'createAppFromCRA')
  }

  return true
}

const createApp = async (appName) => {
  // call create-react-app
  shell.execute(`npx create-react-app ${appName}`)
  root = `${process.cwd()}/${appName}`
  newAppName = appName

  messages.info('CRA is done ************')

  // create a dependency on our cli-app
  shell.execute(`cd ${appName} && npm i -D react-cli`)

  createAppFromCRA()
}

module.exports = {
  createApp
}
