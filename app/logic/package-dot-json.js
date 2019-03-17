const rek = require('rekuire')
const projectPaths = rek('project-paths')
const fileSystem = rek('file-system')
const shell = rek('shell')

const addPackage = async (packageName, packageVersion) => {
  const root = projectPaths.getProjectRoot(__dirname)
  const seperator = projectPaths.getSeparator()
  const jsonData = require(`${root}${seperator}package.json`)

  if (!jsonData.dependencies.hasOwnProperty(packageName)) {
    jsonData.dependencies[packageName] = packageVersion
  }

  await fileSystem.writeFile(`${root}${seperator}package.json`, JSON.stringify(jsonData, null, 2))

  return jsonData
}

const addDevPackage = async (packageName, packageVersion, projectRoot) => {
  const root = projectRoot ? projectRoot : projectPaths.getProjectRoot(__dirname)
  const seperator = projectPaths.getSeparator()
  const fullPath = `${root}${seperator}package.json`
  const jsonData = require(fullPath)

  if (!jsonData.devDependencies.hasOwnProperty(packageName)) {
    jsonData.devDependencies[packageName] = packageVersion
  }

  await fileSystem.writeFile(`${root}${seperator}package.json`, JSON.stringify(jsonData, null, 2))

  return jsonData
}

const addScript = async (newScript, rootOverride) => {
  const root = rootOverride || projectPaths.getProjectRoot(__dirname)
  const seperator = projectPaths.getSeparator()
  const jsonData = require(`${root}${seperator}package.json`)

  if (!jsonData.hasOwnProperty('scripts-explained')) {
    jsonData['scripts-explained'] = {}
  }

  jsonData.scripts[newScript.name] = newScript.value
  jsonData['scripts-explained'] [newScript.name] = newScript.docValue

  await fileSystem.writeFile(`${root}${seperator}package.json`, JSON.stringify(jsonData, null, 2))

  return jsonData
}

const addSection = async (projectRoot, newSectionName, newSection) => {
  const root = projectRoot//projectPaths.getProjectRoot(__dirname)
  const seperator = projectPaths.getSeparator()
  const jsonData = require(`${root}${seperator}package.json`)


  jsonData[newSectionName] = newSection

  await fileSystem.writeFile(`${root}${seperator}package.json`, JSON.stringify(jsonData, null, 2))

  return jsonData
}

const updateSection = async (sectionName, newSection) => {
  const root = projectPaths.getProjectRoot(__dirname)
  const seperator = projectPaths.getSeparator()
  const jsonData = require(`${root}${seperator}package.json`)

  jsonData[sectionName] = newSection

  await fileSystem.writeFile(`${root}${seperator}package.json`, JSON.stringify(jsonData, null, 2))

  return jsonData
}

const updateScript = async (scriptName, newScriptValue, rootOverride) => {
  const root = rootOverride || projectPaths.getProjectRoot(__dirname)
  const seperator = projectPaths.getSeparator()
  const jsonData = require(`${root}${seperator}package.json`)

  //console.log('jsonData.scripts[scriptName]', jsonData.scripts[scriptName])

  jsonData.scripts[scriptName] = newScriptValue

  await fileSystem.writeFile(`${root}${seperator}package.json`, JSON.stringify(jsonData, null, 2))

  return jsonData
}

const installPackage = async (packageName) => {
  await shell.execute(`npm i ${packageName}`)
}

const installDevPackage = async (packageName) => {
  await shell.execute(`npm i -D ${packageName}`)
}

const clean = async (rootOverride) => {
  // re-structure to expected format
  const root = rootOverride || projectPaths.getProjectRoot(__dirname)
  const seperator = projectPaths.getSeparator()
  const jsonData = require(`${root}${seperator}package.json`)

  const {
    name,
    version,
    main,
    files,
    scripts,
    dependencies,
    devDependencies,
    babel,
    browserslist,
    eslintConfig
  } = jsonData

  const reStructured = {
    name,
    version,
    main,
    files,
    'scripts-explained': jsonData['scripts-explained'],
    scripts,
    dependencies,
    devDependencies,
    babel,
    browserslist,
    eslintConfig
  }

  await fileSystem.writeFile(`${root}${seperator}package.json`, JSON.stringify(reStructured, null, 2))

  return jsonData
}

module.exports = {
  addPackage,
  addDevPackage,
  addScript,
  addSection,
  updateSection,
  updateScript,
  installPackage,
  installDevPackage,
  clean
}
