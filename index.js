const feathers = require('@feathersjs/feathers')
const express = require('@feathersjs/express')
const redis = require('redis')
const configureServices = require('./services')
const configureHooks = require('./hooks')

const app = express(feathers())
app.use(express.json())
app.configure(express.rest())

//Redis
const client = redis.createClient(6379, 'localhost')
client.on('err', err => console.error(err))
client.on('connect', function() {
  console.log('Redis client connected')
})

app.set('redisClient', client)

configureServices(app)
configureHooks(app)

app.use(express.errorHandler())

app.listen(3000, () => console.log('Escuchando...'))
