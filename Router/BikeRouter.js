import { Router } from 'express'
import { CreateBike } from '../Controllers/Bike/CreateBike.js'
import { GetBike } from '../Controllers/Bike/GetASingleBike.js'

export const BikeRouter = Router()
BikeRouter.post('/CreateBike', CreateBike)
BikeRouter.get('/GetSingleBike', GetBike)
