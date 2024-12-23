import Order from '../../Model/OrderModel.js'

export const createOrder = async (req, res) => {
  try {
    const { orderData } = req.body

    // Check for required fields
    if (
      !orderData.Name ||
      !orderData.Email ||
      !orderData.userId ||
      !orderData.Cart ||
      !orderData.ShippingAddress ||
      !orderData.TotalAmount
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Missing required fields. Please provide all necessary details.',
      })
    }

    // Create a new order
    const newOrder = new Order({
      Name: orderData.Name,
      Email: orderData.Email,
      userId: orderData.userId,
      Cart: orderData.Cart,
      ShippingAddress: orderData.ShippingAddress,
      BillingAddress: orderData.ShippingAddress, // Default BillingAddress to ShippingAddress
      PaymentMethod: orderData.PaymentMethod || 'Cash On Delivery',
      TotalAmount: orderData.TotalAmount,
      Notes: orderData.Notes,
    })

    // Save the order to the database
    const savedOrder = await newOrder.save()
    res.status(201).json({
      success: true,
      message: 'Order created successfully.',
      order: savedOrder,
      OrderId: savedOrder._id,
    })
  } catch (error) {
    console.error('Error creating order:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to create order.',
      error: error.message,
    })
  }
}
