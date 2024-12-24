import { Bid } from '../../Model/BidModel.js'

export const getBid = async (req, res) => {
  const { _id } = req.query

  try {
    // Find the bid and populate bike details
    const bid = await Bid.findById(_id).populate('bike')
    if (!bid) {
      return res.status(404).json({ error: 'Bid not found.' })
    }

    return res.status(200).json({ bid })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error.' })
  }
}
