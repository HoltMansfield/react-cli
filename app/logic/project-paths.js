/*
  returns the actual project root when in CLI mode

    OR

  returns path to 'actual-files' when e-2-e testing
*/

const getProjectRoot = (commandDirName) => {
  if (process.env.NODE_ENV !== 'test') {
    // when we're not testing, the current working directory is the project root
    return process.cwd()
  }

  /*
    When we're testing we want to build a path to /actual-files for this command
      ie:
      /Users/holt/work/lerna-poc/packages/react-cli/testing/commands/core/bare-bones/actual-files
  */

  const directories = commandDirName.split('/')
  // grab the last two directories so we get /<command-category>/<command-name>
  const pathForCommand = directories.slice(Math.max(directories.length - 2, 1)).join('/')
  const path = `${process.cwd()}/testing/commands/${pathForCommand}/actual-files`

  // this is the path our test will treat as a project root
  return path
}

const getSeparator = () => {
  if (process.platform !== 'win32') {
    return '/'
  }

  return '\\'
}

module.exports = {
  getProjectRoot,
  getSeparator
}
