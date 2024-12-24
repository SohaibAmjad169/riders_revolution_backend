import mongoose from 'mongoose'

// Define the Admin schema
const BidSchema = new mongoose.Schema(
  {
    bike: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bike',
      required: true, // Reference to the Bike model
    },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    bidStatus: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'], // Define possible statuses
      default: 'Pending',
    },
    bidAmount: { type: Number, required: true }, // Bid amount for the bike
    bidDate: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
)

// Create the Admin model
export const Bid = mongoose.model('Bid', BidSchema)
