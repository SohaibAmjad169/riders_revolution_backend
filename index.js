import express from 'express'
import cors from 'cors'
import { Port } from './Config/Keys.js'
import { MongoConnect } from './Config/MongoConfig.js'
const app = express()
app.use(express.json())
app.use(cors())

MongoConnect()

app.listen(Port, () => {
  console.log(`CONNECTED ON ${Port}`)
})
