const feathers = require('@feathersjs/feathers')
const express = require('@feathersjs/express')
const mongoose = require('mongoose')
const redis = require('redis')
const configureServices = require('./services')
const configureHooks = require('./hooks')

const app = express(feathers())
app.use(express.json())
app.configure(express.rest())

const urlMongo = `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`

mongoose.connection.on('reconnect', () => {
  console.log('Mongo reconnected')
})
mongoose
  .connect(urlMongo, { autoReconnect: true })
  .then(() => {
    console.log('Connected to Mongo')
  })
  .catch(err => {
    console.error('Error connecting to Mongo', err.message)
  })
//Redis
const client = redis.createClient({ host: 'redis' })
client.on('err', err => console.error(`Error al conectar redis ${err}`))
client.on('connect', function() {
  console.log('Redis client connected')
})

app.set('redisClient', client)

configureServices(app)
configureHooks(app)

app.use(express.errorHandler())

app.listen(3000, () => console.log('Escuchando...'))
