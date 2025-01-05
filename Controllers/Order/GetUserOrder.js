import Order from '../../Model/OrderModel.js'
export const GetUserOrder = async (req, res) => {
  const { userId } = req.query
  try {
    // Find the user's Order
    const UserOrders = await Order.findOne({ userId })
    if (!UserOrders) {
      return res.status(404).json({ error: 'Order not found.' })
    }
    // Return the Order details
    return res.status(200).json({ UserOrders })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
