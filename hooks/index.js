const { validateUrl, registerVisit, removeVisit } = require('./urls')
const { validateEmail } = require('./users')
module.exports = function configureHooks(app) {
  app.hooks({
    before: {
      all: function(ctx) {
        console.log('Petición:', ctx.method, ctx.path)
      }
    }
  })
  app.service('users').hooks({
    before: {
      create: validateEmail
    }
  })
  app.service('urls').hooks({
    before: {
      create: validateUrl
    },
    after: {
      get: registerVisit,
      remove: removeVisit
    }
  })
}
