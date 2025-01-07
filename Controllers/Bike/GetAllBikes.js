import { BikeModal } from '../../Model/BikeCreateModal.js'
import { User } from '../../Model/UserModal.js'

export const GetBikes = async (req, res) => {
  try {
    const allBikes = await BikeModal.find()

    return res
      .status(200)
      .json({ message: 'Bikes retrieved successfully.', bikes: allBikes })
  } catch (error) {
    console.error('Error fetching bikes:', error.message)
    return res
      .status(500)
      .json({ error: 'Internal server error. Please try again later.' })
  }
}
