import { Router } from "express";
import {
  createBid,
  getBid,
  getAllBids,
  getAllBidsByBikeId,
} from "../Controllers/Bid/Bid.js";
import { updateBid } from "../Controllers/Bid/UpdateBid.js";

export const BidRouter = Router();
BidRouter.post("/createBid", createBid);
BidRouter.get("/GetAllBids", getAllBids);
BidRouter.get("/GetSingleBid", getBid);
BidRouter.put("/UpdateBid", updateBid);
BidRouter.get("/GetAllBikeBids", getAllBidsByBikeId);
