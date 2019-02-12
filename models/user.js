const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  date: { type: Date, default: Date.now }
})

const User = mongoose.model('User', schema, 'users')
module.exports = User
