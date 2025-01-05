import { Cart } from '../../Model/CartSchema.js'
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

    // Retrieve the cart data
    const userCart = await Cart.findOne({
      _id: orderData.Cart,
      userId: orderData.userId,
    })

    if (!userCart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found or does not belong to the user.',
      })
    }

    // Create a new order with the cart data
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
      Progress: 'Pending',
    })

    // Add cart items to the order
    newOrder.bikes = userCart.bikes
    newOrder.services = userCart.services

    // Save the order to the database
    const savedOrder = await newOrder.save()

    // Empty the cart after order is successfully saved
    userCart.bikes = []
    userCart.services = []
    userCart.totalPrice = 0
    userCart.totalProducts = 0
    await userCart.save()

    res.status(201).json({
      success: true,
      message: 'Order created successfully. Cart has been emptied.',
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
