import 'dotenv/config'
const Port = process.env.Port
const apiKey = process.env.apiKey
const authDomain = process.env.authDomain
const projectId = process.env.projectId
const storageBucket = process.env.storageBucket
const messagingSenderId = process.env.messagingSenderId
const appId = process.env.appId
const measurementId = process.env.measurementId
const Mongo_Url = process.env.Mongo_Url
export {
  Port,
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
  Mongo_Url,
}
