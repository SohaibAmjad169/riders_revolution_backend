import { Bike } from '../../Model/BikeModel.js'
import { Cart } from '../../Model/CartSchema.js'

export const addBikeToCart = async (req, res) => {
  const { userId, bikeId, quantity } = req.body

  try {
    // Find the bike by ID
    const bike = await Bike.findById(bikeId)
    if (!bike) {
      return res.status(404).json({ error: 'Bike not found.' })
    }
    // Calculate the price of the bike based on quantity

    // Calculate the price of the bike based on the given quantity
    const totalPrice = bike.price * quantity

    // Check if the user already has a cart
    let cart = await Cart.findOne({ userId })
    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({
        userId,
        bikes: [
          {
            bikeId,
            name: bike.name,
            price: bike.price,
            imageUrl: bike.imageUrl,
            quantity,
          },
        ],
        totalPrice,
        totalProducts: quantity,
      })
    } else {
      // If a cart exists, check if the bike is already in the cart
      const existingBikeIndex = cart.bikes.findIndex(
        (b) => b.bikeId.toString() === bikeId
      )

      if (existingBikeIndex >= 0) {
        // If the bike is already in the cart, update its quantity
        const existingBike = cart.bikes[existingBikeIndex]

        if (quantity > existingBike.quantity) {
          // New quantity is greater than the existing quantity
          const quantityDifference = quantity - existingBike.quantity
          existingBike.quantity = quantity // Update the quantity
          cart.totalPrice += quantityDifference * bike.price // Update the total price
          cart.totalProducts += quantityDifference // Update the total products
        } else if (quantity < existingBike.quantity) {
          // New quantity is less than the existing quantity
          const quantityDifference = existingBike.quantity - quantity
          existingBike.quantity = quantity // Update the quantity
          cart.totalPrice -= quantityDifference * bike.price // Update the total price
          cart.totalProducts -= quantityDifference // Update the total products
        }
        // If the quantity is the same, no changes are needed
      } else {
        // If the bike is not in the cart, add it
        cart.bikes.push({
          bikeId,
          name: bike.name,
          price: bike.price,
          imageUrl: bike.imageUrl,
          quantity,
        })
        cart.totalPrice += totalPrice // Add the bike's total price to the cart
        cart.totalProducts += quantity // Add the quantity to the cart
      }
    }

    // Save the updated cart
    await cart.save()

    return res
      .status(200)
      .json({ message: 'Bike added to cart successfully', cart })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
