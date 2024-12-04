import Order from '../../Model/OrderModel.js'

export const updateOrder = async (req, res) => {
  const { ID, Progress, PaymentStatus } = req.body

  try {
    // Step 1: Validate ID
    if (!ID) {
      return res
        .status(400)
        .json({ error: 'Order ID is required for updating.' })
    }

    // Step 2: Update the order in the database
    const updatedOrder = await Order.findByIdAndUpdate(
      ID,
      { Progress, PaymentStatus },
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validations are applied
      }
    )

    // Step 3: Check if the order exists
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found.' })
    }

    // Step 4: Return the updated order data
    return res.status(200).json({
      message: 'Order updated successfully.',
      order: updatedOrder,
    })
  } catch (error) {
    console.error('Error updating order:', error.message)

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(
        (err) => err.message
      )
      return res.status(400).json({ error: errorMessages.join(', ') })
    }

    // General server error
    return res
      .status(500)
      .json({ error: 'Internal server error. Please try again later.' })
  }
}
