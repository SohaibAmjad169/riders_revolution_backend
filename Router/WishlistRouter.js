import { Router } from "express";
import {
    createWishlist,
    getAllWishlist,
    getWishlistById,
    getWishlistByUserEmail,
    startWishlistTimer
} from "../Controllers/Wishlist/wishlist.js";

export const WishlistRouter = Router();
WishlistRouter.post("/createWishlist", createWishlist);
WishlistRouter.get("/getAllWishlist", getAllWishlist);
WishlistRouter.get("/getWishlistById", getWishlistById);
WishlistRouter.get("/getWishlistByEmail", getWishlistByUserEmail);
WishlistRouter.put('/startTimer',startWishlistTimer)


