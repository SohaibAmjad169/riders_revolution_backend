import { BikeModal } from '../../Model/BikeCreateModal.js'
import { Cart } from '../../Model/CartSchema.js'

export const addBikeToCart = async (req, res) => {
  const { userId, bikeId, quantity } = req.body

  try {
    const bike = await BikeModal.findById(bikeId)
    if (!bike) {
      return res.status(404).json({ error: 'Bike not found.' })
    }

    const totalPrice = bike.price * quantity

    let cart = await Cart.findOne({ userId })
    if (!cart) {
      cart = new Cart({
        userId,
        bikes: [
          {
            bikeId,
            name: bike.name,
            price: bike.price,
            imageUrl: bike.image,
            quantity,
          },
        ],
        totalPrice,
        totalProducts: quantity,
      })
    } else {
      const existingBikeIndex = cart.bikes.findIndex(
        (b) => b.bikeId.toString() === bikeId
      )

      if (existingBikeIndex >= 0) {
        const existingBike = cart.bikes[existingBikeIndex]

        if (quantity > existingBike.quantity) {
          const quantityDifference = quantity - existingBike.quantity
          existingBike.quantity = quantity
          cart.totalPrice += quantityDifference * bike.price
          cart.totalProducts += quantityDifference
        }
        else if (quantity < existingBike.quantity) {
          const quantityDifference = existingBike.quantity - quantity
          existingBike.quantity = quantity
          cart.totalPrice -= quantityDifference * bike.price
          cart.totalProducts -= quantityDifference
        }
      }
      else {
        cart.bikes.push({
          bikeId,
          name: bike.name,
          price: bike.price,
          imageUrl: bike.image,
          quantity,
        })
        cart.totalPrice += totalPrice
        cart.totalProducts += quantity
      }
    }

    await cart.save()

    return res
      .status(200)
      .json({ message: 'Bike added to cart successfully', cart })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
