import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  Name: { type: String, reqiured: true },
  Email: { type: String, reqiured: true },
})

export const User = mongoose.model('User', UserSchema)
