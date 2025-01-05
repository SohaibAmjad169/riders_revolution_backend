import { Router } from 'express'
import { createService } from '../Controllers/Services/CreateService.js'
import { getAllServices } from '../Controllers/Services/GetAllService.js'
import { addServiceToCart } from '../Controllers/Cart/AddServicetoCart.js'

export const ServiceRouter = Router()
ServiceRouter.post('/CreateService', createService)
ServiceRouter.get('/GetServices', getAllServices)
ServiceRouter.post('/AddserviceToCart', addServiceToCart)
