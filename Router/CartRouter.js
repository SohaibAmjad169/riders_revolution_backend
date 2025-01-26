import { Router } from "express";
import { addBikeToCart } from "../Controllers/Cart/AddToCart.js";
import {
  removeBikeFromCart,
  removeBikeCart,
} from "../Controllers/Cart/RemoveCart.js";
import { getCartByUserId } from "../Controllers/Cart/GetCart.js";
import { Cart } from "../Model/CartSchema.js";
import { emptyCartByUserId } from "../Controllers/Cart/EmptyUserCart.js";

export const CartRouter = Router();
CartRouter.post("/AddToCart", addBikeToCart);
CartRouter.post("/RemoveAItem", removeBikeFromCart);
CartRouter.get("/UserCart", getCartByUserId);
CartRouter.post("/EmptyCart", emptyCartByUserId);
CartRouter.delete("/removevalue", removeBikeCart);
