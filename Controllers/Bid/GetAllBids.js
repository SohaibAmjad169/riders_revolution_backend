import { Bid } from '../../Model/BidModel.js'

export const getAllBids = async (req, res) => {
  try {
    // Find all bids and populate bike details
    const bids = await Bid.find().populate('bike')
    return res.status(200).json({ bids })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error.' })
  }
}
