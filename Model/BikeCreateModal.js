import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  engine: {
    type: String,
    required: true,
    trim: true,
  },
  Used: {
    type: Boolean,
    required: true,
  },
  userName: {
    type: String, 
    required: true,
    trim: true,
  },
  petrolCapacity: {
    type: Number,
    default: 13, 
  },
  starting: {
    type: String,
    default: "Electric/Kick Start",
  },
  transmission: {
    type: String,
    default: "5-Speed",
  },
  groundClearance: {
    type: Number,
    default: 160,
  },
  displacement: {
    type: Number,
    default: 125,
  },
  compressionRatio: {
    type: String,
    default: "10.0:1",
  },
  boreAndStroke: {
    type: String,
    default: "54.0 x 54.0 mm",
  },
  tyreFront: {
    type: String,
    default: "2.75 – 18",
  },
  tyreRear: {
    type: String,
    default: "90/90 – 18",
  },
  seatHeight: {
    type: Number,
    default: 775,
  },
  length: {
    type: Number,
    default: 2005,
  },
  width: {
    type: Number,
    default: 760,
  },
  height: {
    type: Number,
    default: 1110,
  },
  weight: {
    type: Number,
    default: 130,
  },
  image: {
    type: String, // Stores the URL or path of the uploaded image
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
        trim: true,
      },
      answer: {
        type: String,
        trim: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const BikeModal = mongoose.model("bikemodal", bikeSchema);
