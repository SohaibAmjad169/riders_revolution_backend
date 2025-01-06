import { BikeModal } from '../../Model/BikeCreateModal.js'

export const GetBike = async (req, res) => {
  const { ID } = req.query

  try {
    if (!ID) {
      return res
        .status(400)
        .json({ error: 'ID is required to fetch the bike.' })
    }

    if (!/^[0-9a-fA-F]{24}$/.test(ID)) {
      return res.status(400).json({ error: 'Invalid ID format.' })
    }

    const bikeFound = await BikeModal.findById(ID)

    if (!bikeFound) {
      return res.status(404).json({ error: 'Bike not found.' })
    }

    return res
      .status(200)
      .json({ message: 'Bike retrieved successfully.', bike: bikeFound })
  } catch (error) {
    console.error('Error fetching bike:', error.message)

    return res
      .status(500)
      .json({ error: 'Internal server error. Please try again later.' })
  }
}
