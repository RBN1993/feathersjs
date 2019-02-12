const errors = require('@feathersjs/errors')
const { validateRegEx } = require('../common')

const validateUrl = validateRegEx({
  exp: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm,
  propName: 'url',
  mssg: 'Invalid url'
})

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
