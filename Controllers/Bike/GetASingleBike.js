import { Bike } from '../../Model/BikeModel.js'

export const GetBike = async (req, res) => {
  const { ID } = req.query

  try {
    // Step 1: Validate ID
    if (!ID) {
      return res
        .status(400)
        .json({ error: 'ID is required to fetch the bike.' })
    }

    // Step 2: Check if ID is a valid MongoDB ObjectId
    if (!/^[0-9a-fA-F]{24}$/.test(ID)) {
      return res.status(400).json({ error: 'Invalid ID format.' })
    }

    // Step 3: Find the bike by ID
    const bikeFound = await Bike.findById(ID)

    // Step 4: Check if the bike exists
    if (!bikeFound) {
      return res.status(404).json({ error: 'Bike not found.' })
    }

    // Step 5: Return the found bike
    return res
      .status(200)
      .json({ message: 'Bike retrieved successfully.', bike: bikeFound })
  } catch (error) {
    // Step 6: Error handling
    console.error('Error fetching bike:', error.message)

    // Return a generic server error response
    return res
      .status(500)
      .json({ error: 'Internal server error. Please try again later.' })
  }
}
