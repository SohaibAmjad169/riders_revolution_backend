import { Cart } from '../../Model/CartSchema.js'
export const getCartById = async () => {
  try {
    // Find the user's cart
    const cart = await Cart.findOne({ id }).populate('bikes.bikeId')
    if (!cart) {
      console.log({ error: 'Cart not found.' })
    }
    // Return the cart details
    return cart
  } catch (error) {
    console.error(error)
    console.log({ error: 'Internal server error' })
  }
}
