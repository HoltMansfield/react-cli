/* eslint import/no-extraneous-dependencies: "off" */
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { sleep }

global.td = require('testdouble')
require('testdouble-jest')(td, jest) // td and jest are ambient?
