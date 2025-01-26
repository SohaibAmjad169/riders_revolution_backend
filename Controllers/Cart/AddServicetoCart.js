import { Cart } from '../../Model/CartSchema.js'
import Service from '../../Model/ServicesModel.js'

export const addServiceToCart = async (req, res) => {
  const { userId, ServiceId, quantity } = req.body
  console.log(userId)

  try {
    const service = await Service.findById(ServiceId)
    if (!service) {
      return res.status(404).json({ error: 'Service not found.' })
    }

    const totalPrice = service.price * quantity

    let cart = await Cart.findOne({ userId })
    if (!cart) {
      cart = new Cart({
        userId,
        services: [
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
      const existingServiceIndex = cart.services.findIndex(
        (s) => s.serviceId.toString() === service._id.toString()
      )

      if (existingServiceIndex >= 0) {
        const existingService = cart.services[existingServiceIndex]

        if (quantity > existingService.quantity) {
          const quantityDifference = quantity - existingService.quantity
          existingService.quantity = quantity
          cart.totalPrice += quantityDifference * service.price
          cart.totalProducts += quantityDifference
        }
        else if (quantity < existingService.quantity) {
          const quantityDifference = existingService.quantity - quantity
          existingService.quantity = quantity
          cart.totalPrice -= quantityDifference * service.price
          cart.totalProducts -= quantityDifference
        }
      }
      else {
        cart.services.push({
          serviceId: service._id,
          name: service.title,
          price: service.price,
          imageUrl: service.image,
          quantity,
        })
        cart.totalPrice += totalPrice
        cart.totalProducts += quantity
      }
    }

    await cart.save()

    return res
      .status(200)
      .json({ message: 'Service added to cart successfully', cart })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
