import mongoose, { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },
})

mongoose.models = {}

userSchema.pre('save', async function (next) {
  const hashPass = await bcrypt.hash(this.password.toString(), 12)
  this.password = hashPass
  next()
})

const UserSchema = model('User', userSchema)
export default UserSchema
