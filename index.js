const feathers = require('@feathersjs/feathers')
const express = require('@feathersjs/express')
const mongoose = require('mongoose')
const redis = require('redis')
const configureServices = require('./services')
const configureHooks = require('./hooks')

const app = express(feathers())
app.use(express.json())
app.configure(express.rest())

const urlMongo = 'mongodb://127.0.0.1:27017/blog'
mongoose.connect(urlMongo)

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
