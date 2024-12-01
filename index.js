import express from 'express'
import cors from 'cors'
import { Port } from './Config/Keys.js'
import { MongoConnect } from './Config/MongoConfig.js'
import { BikeRouter } from './Router/BikeRouter.js'
import { UserRouter } from './Router/UserRouter.js'
const app = express()
app.use(express.json())
app.use(cors())
MongoConnect()
app.use('/Api/Bike', BikeRouter)
app.use('/Api/User', UserRouter)
app.listen(Port, () => {
  console.log(`CONNECTED ON ${Port}`)
})
