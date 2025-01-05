import mongoose from "mongoose";

// Define the Bike schema
const BikeSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  rating: { type: Number, required: true },
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
  Used: { type: Number },
  questions: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
});

// Create the Bike model
export const BikeModal = mongoose.model("bikemodal", BikeSchema);
