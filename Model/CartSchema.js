import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming there's a User schema
      required: true,
    },
    bikes: [
      {
        bikeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Bike',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        imageUrl: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalProducts: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
)

export const Cart = mongoose.model('Cart', CartSchema)
