import { Cart } from '../../Model/CartSchema.js'

export const removeBikeFromCart = async (req, res) => {
  const { userId, bikeId, quantity } = req.body

  try {
    // Find the user's cart
    let cart = await Cart.findOne({ userId })

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' })
    }

    // Find the bike in the cart
    const bikeIndex = cart.bikes.findIndex(
      (b) => b.bikeId.toString() === bikeId
    )

    if (bikeIndex === -1) {
      return res.status(404).json({ error: 'Bike not found in cart.' })
    }

    // Reduce the quantity of the bike or remove it if quantity reaches zero
    const bikeInCart = cart.bikes[bikeIndex]

    if (bikeInCart.quantity <= quantity) {
      // Remove the bike from the cart
      cart.bikes.splice(bikeIndex, 1)
      cart.totalPrice -= bikeInCart.price * bikeInCart.quantity
      cart.totalProducts -= bikeInCart.quantity
    } else {
      // Just update the quantity and price
      bikeInCart.quantity -= quantity
      cart.totalPrice -= bikeInCart.price * quantity
      cart.totalProducts -= quantity
    }

    // Save the updated cart
    await cart.save()

    return res
      .status(200)
      .json({ message: 'Bike removed from cart successfully', cart })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
