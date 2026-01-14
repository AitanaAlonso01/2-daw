const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, //JWT: No seleccionar password (ya no entran dentro de los find)
    },
    profile: {
      type: String,
      required: true,
      enum: ['ADMIN', 'USER'],
      default: 'USER',
    },
  },
  {
    versionKey: false, //JWT: eliminamos __v
    timestamps: true, //JWT: agregamos createdAt y updatedAt automaticos
  }
)

const user = mongoose.model('user', userSchema)

module.exports = user
