import Order from '../../Model/OrderModel.js'
export const GetAllOrder = async (req, res) => {
  try {
    // Find the user's Order
    const AllOrders = await Order.find()
    if (!AllOrders) {
      return res.status(404).json({ error: 'Order not found.' })
    }
    // Return the Order details
    return res.status(200).json(AllOrders)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
