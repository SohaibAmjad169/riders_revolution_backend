import { Cart } from '../../Model/CartSchema.js'
import Service from '../../Model/ServicesModel.js'

export const addServiceToCart = async (req, res) => {
  const { userId, ServiceId, quantity } = req.body

  try {
    // Find the Service by ID
    const service = await Service.findById(ServiceId)
    if (!service) {
      return res.status(404).json({ error: 'Service not found.' })
    }

    // Calculate the price of the Service based on the given quantity
    const totalPrice = service.price * quantity

    // Check if the user already has a cart
    let cart = await Cart.findOne({ userId })
    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({
        userId,
        services: [
          // Changed from "Services" to "services" to be consistent with your code
          {
            serviceId: service._id,
            name: service.title,
            price: service.price,
            imageUrl: service.image,
            quantity,
          },
        ],
        totalPrice,
        totalProducts: quantity,
      })
    } else {
      // If a cart exists, check if the Service is already in the cart
      const existingServiceIndex = cart.services.findIndex(
        (s) => s.serviceId.toString() === service._id.toString()
      )

      if (existingServiceIndex >= 0) {
        // If the Service is already in the cart, update its quantity
        const existingService = cart.services[existingServiceIndex]

        if (quantity > existingService.quantity) {
          // New quantity is greater than the existing quantity
          const quantityDifference = quantity - existingService.quantity
          existingService.quantity = quantity // Update the quantity
          cart.totalPrice += quantityDifference * service.price // Update the total price
          cart.totalProducts += quantityDifference // Update the total products
        } else if (quantity < existingService.quantity) {
          // New quantity is less than the existing quantity
          const quantityDifference = existingService.quantity - quantity
          existingService.quantity = quantity // Update the quantity
          cart.totalPrice -= quantityDifference * service.price // Update the total price
          cart.totalProducts -= quantityDifference // Update the total products
        }
        // If the quantity is the same, no changes are needed
      } else {
        // If the Service is not in the cart, add it
        cart.services.push({
          serviceId: service._id,
          name: service.title,
          price: service.price,
          imageUrl: service.image,
          quantity,
        })
        cart.totalPrice += totalPrice // Add the Service's total price to the cart
        cart.totalProducts += quantity // Add the quantity to the cart
      }
    }

    // Save the updated cart
    await cart.save()

    return res
      .status(200)
      .json({ message: 'Service added to cart successfully', cart })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
