const { validateRegEx } = require('../common')
const validateEmail = validateRegEx({
  exp: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim,
  propName: 'email',
  mssg: 'Invalid email'
})

module.exports = { validateEmail }
