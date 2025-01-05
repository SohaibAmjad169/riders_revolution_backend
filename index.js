import express from 'express'
import cors from 'cors'
import { Port } from './Config/Keys.js'
import { MongoConnect } from './Config/MongoConfig.js'
import { BikeRouter } from './Router/BikeRouter.js'
import { UserRouter } from './Router/UserRouter.js'
import { CartRouter } from './Router/CartRouter.js'
import { OrderRouter } from './Router/OrderRouter.js'
import { BidRouter } from './Router/BidRouter.js'
import { ServiceRouter } from './Router/ServiceRouter.js'
const app = express()
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors())
MongoConnect()
app.use('/Api/Bike', BikeRouter)
app.use('/Api/User', UserRouter)
app.use('/Api/Cart', CartRouter)
app.use('/Api/Order', OrderRouter)
app.use('/Api/Bid', BidRouter)
app.use('/Api/Service', ServiceRouter)
app.listen(Port, () => {
  console.log(`CONNECTED ON ${Port}`)
})
