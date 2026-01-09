const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
    enum: ['ADMIN', 'USER'],
    default: 'USER',
  },
})

const user = mongoose.model('user', userSchema)

module.exports = user
