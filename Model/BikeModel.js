import mongoose from 'mongoose'

const BikeSchema = new mongoose.Schema({
  name: { type: String }, // Ensures unique names
  price: { type: Number },
  imageUrl: { type: String },
  rating: { type: Number },
  Engine: { type: String },
  PetrolCapacity: { type: Number },
  Starting: { type: String },
  Transmission: { type: String },
  GroundClearance: { type: Number },
  Displacement: { type: Number },
  CompressionRatio: { type: String },
  BoreandStroke: { type: String },
  TyreFront: { type: String },
  TyreRear: { type: String },
  SeatHeight: { type: Number },
  Length: { type: Number },
  Width: { type: Number },
  Height: { type: Number },
  Weight: { type: Number },
})

export const Bike = mongoose.model('Bike', BikeSchema)

//     questions: [
//       {
//         question: 'What is the fuel efficiency?',
//         answer: 'Around 60-70 km/l.',
//       },
//       {
//         question: 'Is it suitable for long rides?',
//         answer: "It's ideal for short distances and city rides.",
//       },
//     ],
