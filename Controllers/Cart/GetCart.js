import { Cart } from '../../Model/CartSchema.js'
export const getCartByUserId = async (req, res) => {
  const { userId } = req.body
  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId }).populate('bikes.bikeId')
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' })
    }
    // Return the cart details
    return res.status(200).json({ cart })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
