import { Bike } from '../../Model/BikeModel.js'
import { User } from '../../Model/UserModal.js'

export const GetBikes = async (req, res) => {
  try {
    // Step 3: Fetch all bikes
    const allBikes = await Bike.find()

    // Step 4: Return the list of bikes
    return res
      .status(200)
      .json({ message: 'Bikes retrieved successfully.', bikes: allBikes })
  } catch (error) {
    // Step 5: Error handling
    console.error('Error fetching bikes:', error.message)
    return res
      .status(500)
      .json({ error: 'Internal server error. Please try again later.' })
  }
}
