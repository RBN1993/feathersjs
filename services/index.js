const VisitService = require('./visitService')
const UrlService = require('./shortUrlService')
const UserService = require('./users')

module.exports = function configureServices(app) {
  const client = app.get('redisClient')
  app.use('urls', UrlService(client))
  app.use('visits', VisitService(client))
  app.use('users', UserService)
}
