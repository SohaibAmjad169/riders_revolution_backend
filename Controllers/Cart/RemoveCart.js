import { Cart } from '../../Model/CartSchema.js'
export const removeBikeFromCart = async (req, res) => {
  const { userId, bikeId, quantity } = req.body
  try {
    let cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' })
    }
    const bikeIndex = cart.bikes.findIndex(
      (b) => b.bikeId.toString() === bikeId
    )
    if (bikeIndex === -1) {
      return res.status(404).json({ error: 'Bike not found in cart.' })
    }
    const bikeInCart = cart.bikes[bikeIndex]
    if (bikeInCart.quantity <= quantity) {
      cart.bikes.splice(bikeIndex, 1)
      cart.totalPrice -= bikeInCart.price * bikeInCart.quantity
      cart.totalProducts -= bikeInCart.quantity
    }
    else {
      bikeInCart.quantity -= quantity
      cart.totalPrice -= bikeInCart.price * quantity
      cart.totalProducts -= quantity
    }
    await cart.save()
    return res
      .status(200)
      .json({ message: 'Bike removed from cart successfully', cart })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
