import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  Cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
  Progress: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
    required: true,
  },
  ShippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  BillingAddress: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  PaymentMethod: {
    type: String,
    enum: ['Credit Card', 'Bank Transfer', 'Cash On Delivery'],
    required: true,
  },
  PaymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending',
    required: true,
  },
  TotalAmount: {
    type: Number,
    required: true,
    min: [0, 'Total amount must be a positive number.'],
  },
  Notes: {
    type: String,
    trim: true,
  },
  bikes: [
    {
      bikeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike',
        required: true,
      },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      imageUrl: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  services: [
    {
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
      },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      imageUrl: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const Order = mongoose.model('Order', OrderSchema)
export default Order
