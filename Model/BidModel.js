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
    bidStatus: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
    bidAmount: { type: Number, required: true },
    bidDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

// Create the Bid model
export const Bid = mongoose.model('Bid', BidSchema)
