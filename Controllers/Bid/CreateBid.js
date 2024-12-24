import { Bid } from '../../Model/BidModel.js'
import { Bike } from '../../Model/BikeModel.js'

export const createBid = async (req, res) => {
  const { bikeId, userName, userEmail, bidAmount } = req.body

  if (!userEmail) {
    return res.status(400).json({ error: 'User email is required.' })
  }

  try {
    const bike = await Bike.findById(bikeId)
    if (!bike) {
      return res.status(404).json({ error: 'Bike not found.' })
    }

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
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Duplicate email detected.' })
    }
    return res.status(500).json({ error: 'Internal server error.' })
  }
}
