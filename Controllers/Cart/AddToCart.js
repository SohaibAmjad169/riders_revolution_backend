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
    const totalPrice = bike.price * quantity
    // Check if the user already has a cart
    let cart = await Cart.findOne({ userId })
    if (!cart) {
      // If no cart, create a new one
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
      // If cart exists, check if the bike is already in the cart
      const existingBikeIndex = cart.bikes.findIndex(
        (b) => b.bikeId.toString() === bikeId
      )
      if (existingBikeIndex >= 0) {
        // Update the bike quantity and total price
        cart.bikes[existingBikeIndex].quantity += quantity
        cart.totalPrice += totalPrice
        cart.totalProducts += quantity
      } else {
        // Add the new bike to the cart
        cart.bikes.push({
          bikeId,
          name: bike.name,
          price: bike.price,
          imageUrl: bike.imageUrl,
          quantity,
        })
        cart.totalPrice += totalPrice
        cart.totalProducts += quantity
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
