import { Router } from 'express'
import { addBikeToCart } from '../Controllers/Cart/AddToCart.js'
import { removeBikeFromCart } from '../Controllers/Cart/RemoveCart.js'
import { getCartByUserId } from '../Controllers/Cart/GetCart.js'

export const CartRouter = Router()
CartRouter.post('/AddToCart', addBikeToCart)
CartRouter.delete('/RemoveAItem', removeBikeFromCart)
CartRouter.get('/UserCart', getCartByUserId)
