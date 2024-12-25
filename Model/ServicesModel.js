import mongoose from 'mongoose'

const ServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number, // Changed from String to Number
      required: true,
    },
    category: {
      type: String,
      enum: ['Maintenance', 'Customization'],
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
)

const Service = mongoose.model('Service', ServiceSchema)

export default Service
