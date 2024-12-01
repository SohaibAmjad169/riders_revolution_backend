import { Router } from 'express'
import { CreateBike } from '../Controllers/Bike/CreateBike.js'

export const BikeRouter = Router()
BikeRouter.post('/CreateBike', CreateBike)
