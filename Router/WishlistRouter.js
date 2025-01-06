import { Router } from "express";
import {
    createWishlist,
    getAllWishlist,
    getWishlistById
} from "../Controllers/Wishlist/wishlist.js";

export const WishlistRouter = Router();
WishlistRouter.post("/createWishlist", createWishlist);
WishlistRouter.get("/getAllWishlist", getAllWishlist);
WishlistRouter.get("/getWishlistById", getWishlistById);

