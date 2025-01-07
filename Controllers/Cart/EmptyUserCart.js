import { Cart } from '../../Model/CartSchema.js'

export const emptyCartByUserId = async (req, res) => {
  const { userId } = req.body

  try {
    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' })
    }

    cart.bikes = []

    await cart.save()

    return res.status(200).json({ message: 'Cart emptied successfully.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
