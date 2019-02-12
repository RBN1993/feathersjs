const User = require('../models/user')
const service = require('feathers-mongoose')

module.exports = service({
  Model: User,
  paginate: {
    default: 6,
    max: 5
  }
})
