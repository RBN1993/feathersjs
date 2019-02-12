const { validateUrl, registerVisit, removeVisit } = require('./urls')

module.exports = function configureHooks(app) {
  app.hooks({
    before: {
      all: function(ctx) {
        console.log('Petición:', ctx.method, ctx.path)
      }
    }
  })

  app.service('urls').hooks({
    before: {
      create: validateUrl()
    },
    after: {
      get: registerVisit,
      remove: removeVisit
    }
  })
}
