import mongoose from 'mongoose'
import { Mongo_Url } from './Keys.js'

export const MongoConnect = async () => {
  const Connection = await mongoose.connect(Mongo_Url)
  if (Connection) {
    console.log('MONGO CONNECTED')
  } else {
    console.log('No Connection')
  }
}
