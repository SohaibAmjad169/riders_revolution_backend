import { Cart } from '../../Model/CartSchema.js'
export const getCartByUserId = async (req, res) => {
  const { userId } = req.query
  try {
    // Find the user's cart and populate both bikes and services
    const cart = await Cart.findOne({ userId })
      .populate('bikes.bikeId') // Populate bike details
      .populate('services.serviceId') // Populate service details

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
