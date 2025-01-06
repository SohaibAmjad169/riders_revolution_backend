import mongoose from 'mongoose'

// Define the Bid schema
const BidSchema = new mongoose.Schema(
  {
    bike: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bike',
      required: true,
    },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    bikeImage: { type: String, required: true },
    timer: { type: Boolean },
  },
  { timestamps: true }
)

// Create the Bid model
export const Wishlist = mongoose.model('wishlist', BidSchema)
