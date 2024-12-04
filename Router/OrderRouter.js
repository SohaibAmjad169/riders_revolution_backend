import { Router } from 'express'
import { createOrder } from '../Controllers/Order/CreateAOrder.js'
import { GetSingleOrder } from '../Controllers/Order/GetSingleOrder.js'
import { GetAllOrder } from '../Controllers/Order/GetAllOrders.js'
import { GetUserOrder } from '../Controllers/Order/GetUserOrder.js'
export const OrderRouter = Router()
OrderRouter.get('/GetSingleOrder', GetSingleOrder)
OrderRouter.get('/GetAllOrders', GetAllOrder)
OrderRouter.get('/GetUserOrders', GetUserOrder)
OrderRouter.post('/NewOrder', createOrder)
OrderRouter.put('/UpdateOrder')
