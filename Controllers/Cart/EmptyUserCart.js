import { Cart } from '../../Model/CartSchema.js'

// Function to empty the cart of a user by userId
export const emptyCartByUserId = async (req, res) => {
  const { userId } = req.body // Get userId from query parameters

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' })
    }

    // Clear the bikes array to empty the cart
    cart.bikes = []

    // Save the updated cart
    await cart.save()

    return res.status(200).json({ message: 'Cart emptied successfully.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
