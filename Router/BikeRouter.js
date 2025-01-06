import { Router } from 'express'
import { GetAllUserBike, RemoveBike, UpdateBike } from '../Controllers/Bike/Bike.js'
import { GetBike } from '../Controllers/Bike/GetASingleBike.js'
import { GetBikes } from '../Controllers/Bike/GetAllBikes.js'

export const BikeRouter = Router()
BikeRouter.get('/GetSingleBike', GetBike)
BikeRouter.get('/GetUserBikes/:userName', GetAllUserBike)
BikeRouter.get('/GetAllBikes', GetBikes)
BikeRouter.put('/UpdateABike', UpdateBike)
BikeRouter.delete('/RemoveBike', RemoveBike)
