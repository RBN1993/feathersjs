const util = require('util')
const commands = require('redis-commands')

module.exports = function(redisClient) {
  return commands.list.reduce((acc, key) => {
    if (typeof redisClient[key] === 'function') {
      acc[key] = util.promisify(redisClient[key]).bind(redisClient)
    }
    return acc
  }, {})
}
