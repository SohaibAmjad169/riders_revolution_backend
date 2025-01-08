import { Router } from "express";
import {
    createWishlist,
    getAllWishlist,
    getWishlistById,
    getWishlistByUserEmail,
    startWishlistTimer,
} from "../Controllers/Wishlist/wishlist.js";
import { Notification, NotificationFetch, updateNotificationStatus } from "../Controllers/Wishlist/Notification.js";

export const WishlistRouter = Router();
WishlistRouter.post("/createWishlist", createWishlist);
WishlistRouter.get("/getAllWishlist", getAllWishlist);
WishlistRouter.get("/getWishlistById", getWishlistById);
WishlistRouter.get("/getWishlistByEmail", getWishlistByUserEmail);
WishlistRouter.put('/startTimer', startWishlistTimer);
WishlistRouter.post('/notifications/send', Notification)
WishlistRouter.get("/get/notification", NotificationFetch);
WishlistRouter.put('/notifications', updateNotificationStatus)


