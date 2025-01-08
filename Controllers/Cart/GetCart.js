import { Cart } from '../../Model/CartSchema.js'
export const getCartByUserId = async (req, res) => {
  const { userId } = req.query
  try {
    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' })
    }
    return res.status(200).json({ cart })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
