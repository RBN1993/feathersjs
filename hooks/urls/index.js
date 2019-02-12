const errors = require('@feathersjs/errors')

const validateUrl = () => {
  const urlRegEx = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm
  const compiled = new RegExp(urlRegEx)
  return ctx => {
    const { url } = ctx.data
    if (compiled.test(url)) {
      return ctx
    }
    throw new errors.NotAcceptable('Invalid url')
  }
}

const registerVisit = ctx => {
  const visitService = ctx.app.service('visits')
  return visitService.create({ url: ctx.result }).then(() => ctx)
}

const removeVisit = ctx => {
  const visitService = ctx.app.service('visits')
  return visitService.remove({ url: ctx.result }).then(() => {
    ctx.result = true
    return ctx
  })
}

module.exports = {
  validateUrl,
  registerVisit,
  removeVisit
}
