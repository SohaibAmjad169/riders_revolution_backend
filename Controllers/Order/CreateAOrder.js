import Order from '../../Model/OrderModel.js'
export const createOrder = async (req, res) => {
  try {
    const {
      Name,
      Email,
      userId,
      Cart,
      ShippingAddress,
      BillingAddress,
      PaymentMethod,
      TotalAmount,
      Notes,
    } = req.body
    // Check for required fields
    if (
      !Name ||
      !Email ||
      !userId ||
      !Cart ||
      !ShippingAddress ||
      !PaymentMethod ||
      !TotalAmount
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Missing required fields. Please provide all necessary details.',
      })
    }
    // Create a new order
    const newOrder = new Order({
      Name,
      Email,
      userId,
      Cart,
      ShippingAddress,
      BillingAddress: BillingAddress || ShippingAddress, // Default BillingAddress to ShippingAddress if not provided
      PaymentMethod,
      TotalAmount,
      Notes,
    })
    // Save the order to the database
    const savedOrder = await newOrder.save()
    res.status(201).json({
      success: true,
      message: 'Order created successfully.',
      order: savedOrder,
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
