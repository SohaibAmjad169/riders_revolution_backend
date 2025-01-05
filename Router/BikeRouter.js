import { Router } from 'express'
import { CreateBike } from '../Controllers/Bike/CreateBike.js'
import { GetBike } from '../Controllers/Bike/GetASingleBike.js'
import { GetBikes } from '../Controllers/Bike/GetAllBikes.js'
import { UpdateBike } from '../Controllers/Bike/UpdateBike.js'
import { RemoveBike } from '../Controllers/Bike/DeleteBike.js'

export const BikeRouter = Router()
BikeRouter.post('/CreateBike', CreateBike)
BikeRouter.get('/GetSingleBike', GetBike)
BikeRouter.get('/GetAllBikes', GetBikes)
BikeRouter.put('/UpdateABike', UpdateBike)
BikeRouter.delete('/RemoveBike', RemoveBike)
