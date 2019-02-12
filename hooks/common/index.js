const errors = require('@feathersjs/errors')

const validateRegEx = ({ exp, propName, mssg }) => {
  if (!exp || !propName || !mssg) {
    throw new Error('Wrong arguments')
  }
  const compiled = new RegExp(exp)
  return ctx => {
    const value = ctx.data[propName]
    if (compiled.test(value)) {
      return ctx
    }
    throw new errors.NotAcceptable(mssg)
  }
}

module.exports = {
  validateRegEx
}
