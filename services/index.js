const VisitService = require('./visitService')
const UrlService = require('./shortUrlService')

module.exports = function configureServices(app) {
  const client = app.get('redisClient')
  app.use('urls', UrlService(client))
  app.use('visits', VisitService(client))
}
