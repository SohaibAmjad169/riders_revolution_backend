import Order from '../../Model/OrderModel.js'
export const GetSingleOrder = async (req, res) => {
  const { id } = req.query
  try {
    // Find the user's Order
    const SingleOrder = await Order.find({ _id: id })
    if (!SingleOrder) {
      return res.status(404).json({ error: 'Order not found.' })
    }
    // Return the Order details
    return res.status(200).json({ Order })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
