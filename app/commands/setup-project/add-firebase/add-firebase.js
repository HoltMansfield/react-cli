const rek = require('rekuire')
const { removeAuthZero } = rek('remove-auth-zero')


const addFirebase = () => {
  // first we strip out any references to auth-zero
  removeAuthZero()
}

module.exports = {
  addFirebase
}
