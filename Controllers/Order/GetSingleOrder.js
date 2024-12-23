import { Cart } from '../../Model/CartSchema.js'
import Order from '../../Model/OrderModel.js'

export const GetSingleOrder = async (req, res) => {
  const { id } = req.query // Extract the order ID from query parameters

  try {
    // Find the order by ID and populate the cart details
    const SingleOrder = await Order.findById(id)
    if (!SingleOrder) {
      return res.status(404).json({ error: 'Order not found.' })
    }
    const GetCart = await Cart.findById(SingleOrder.Cart).populate(
      'bikes.bikeId'
    )
    // Return the order details along with the populated cart details
    return res.status(200).json({ Order: SingleOrder, Cart: GetCart })
  } catch (error) {
    console.error('Error fetching single order:', error.message)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
