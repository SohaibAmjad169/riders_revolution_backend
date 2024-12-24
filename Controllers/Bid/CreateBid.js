import { Bid } from '../../Model/BidModel.js'
import { Bike } from '../../Model/BikeModel.js'

export const createBid = async (req, res) => {
  const { bikeId, userName, userEmail, bidAmount } = req.body

  try {
    // Check if the bike exists
    const bike = await Bike.findById(bikeId)
    if (!bike) {
      return res.status(404).json({ error: 'Bike not found.' })
    }

    // Create a new bid
    const newBid = new Bid({
      bike: bikeId,
      userName,
      userEmail,
      bidAmount,
    })

    await newBid.save()
    return res
      .status(201)
      .json({ message: 'Bid created successfully.', bid: newBid })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error.' })
  }
}
