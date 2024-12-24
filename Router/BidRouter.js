import { Router } from 'express'
import { createBid } from '../Controllers/Bid/CreateBid.js'
import { getBid } from '../Controllers/Bid/GetBid.js'
import { getAllBids } from '../Controllers/Bid/GetAllBids.js'
import { updateBid } from '../Controllers/Bid/UpdateBid.js'

export const BidRouter = Router()
BidRouter.post('/createBid', createBid)
BidRouter.get('/GetAllBids', getAllBids)
BidRouter.get('/GetSingleBid', getBid)
BidRouter.post('/UpdateBid', updateBid)
