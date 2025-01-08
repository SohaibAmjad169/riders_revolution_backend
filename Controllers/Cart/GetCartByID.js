import { Cart } from '../../Model/CartSchema.js'
export const getCartById = async () => {
  try {
    const cart = await Cart.findOne({ id })
    if (!cart) {
      console.log({ error: 'Cart not found.' })
    }
    return cart
  } catch (error) {
    console.error(error)
    console.log({ error: 'Internal server error' })
  }
}
