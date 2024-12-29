import { Bike } from '../../Model/BikeModel.js'
import { User } from '../../Model/UserModal.js'

export const RemoveBike = async (req, res) => {
  const { ID } = req.query

  try {
    // Step 1: Validate input
    if (!ID) {
      return res
        .status(400)
        .json({ error: 'Bike ID is required to delete the bike.' })
    }

    // if (!Email) {
    //   return res
    //     .status(400)
    //     .json({ error: 'Email is required to authorize deletion.' })
    // }

    // // Step 2: Check if the user exists
    // const userFound = await User.findOne({ Email })
    // if (!userFound) {
    //   return res.status(404).json({ error: 'User not found.' })
    // }

    // Step 3: Check if the bike exists
    const bikeFound = await Bike.findById(ID)
    if (!bikeFound) {
      return res.status(404).json({ error: 'Bike not found.' })
    }

    // Step 4: Delete the bike
    await Bike.findByIdAndDelete(ID)

    // Step 5: Return success response
    return res.status(200).json({ message: 'Bike deleted successfully.' })
  } catch (error) {
    // Step 6: Handle errors
    console.error('Error deleting bike:', error.message)
    return res
      .status(500)
      .json({ error: 'Internal server error. Please try again later.' })
  }
}
