import { Cart } from "../../Model/CartSchema.js";
import mongoose from "mongoose";

export const removeBikeFromCart = async (req, res) => {
  const { userId, bikeId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }
    const bikeIndex = cart.bikes.findIndex(
      (b) => b.bikeId.toString() === bikeId
    );
    if (bikeIndex === -1) {
      return res.status(404).json({ error: "Bike not found in cart." });
    }
    const bikeInCart = cart.bikes[bikeIndex];
    if (bikeInCart.quantity <= quantity) {
      cart.bikes.splice(bikeIndex, 1);
      cart.totalPrice -= bikeInCart.price * bikeInCart.quantity;
      cart.totalProducts -= bikeInCart.quantity;
    } else {
      bikeInCart.quantity -= quantity;
      cart.totalPrice -= bikeInCart.price * quantity;
      cart.totalProducts -= quantity;
    }
    await cart.save();
    return res
      .status(200)
      .json({ message: "Bike removed from cart successfully", cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const removeBikeCart = async (req, res) => {
    const { userId, bikeId, serviceId } = req.body

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        let updateData = {};

        // Check if a bikeId is provided
        if (bikeId) {
            // Remove the bike from the cart
            updateData = {
                bikes: cart.bikes.filter(bike => bike.bikeId.toString() !== bikeId)
            };
        }

        // Check if a serviceId is provided
        if (serviceId) {
            // Remove the service from the cart
            updateData = {
                services: cart.services.filter(service => service.serviceId.toString() !== serviceId)
            };
        }

        // Update the cart with the new data
        const updatedCart = await Cart.findOneAndUpdate({ userId }, updateData, { new: true });

        if (!updatedCart) {
            return res.status(404).json({ message: "Failed to update cart" });
        }

        // Return the updated cart
        return res.status(200).json(updatedCart);
        
  } catch (error) {
    console.error("Error removing bike from cart:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
