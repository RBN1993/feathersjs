const promisifyRedis = require('../lib/promisifyRedis')

module.exports = function RankingService(client) {
  const VISITS = 'visits'
  const redisAsync = promisifyRedis(client)

  const getRanking = () => {
    return redisAsync
      .zrevrange(VISITS, 0, -1, 'withscores')
      .then((data = []) => {
        const results = []
        for (let i = 0; i < data.length; i++) {
          if (i % 2 !== 0) continue
          const result = {
            url: data[i],
            visits: data[i + 1]
          }
          results.push(result)
        }
        return results
      })
  }

  const createVisit = ({ url }) => {
    return redisAsync.zincrby(VISITS, 1, url).then(() => url)
  }

  const remove = ({ url }) => {
    return redisAsync.zrem(VISITS, url)
  }
  return {
    find() {
      return getRanking()
    },
    create: createVisit,
    remove
  }
}
