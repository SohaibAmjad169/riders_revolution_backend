import { Bid } from "../../Model/BidModel.js";
import { Bike } from "../../Model/BikeModel.js";

//Create new Bid in DB
export const createBid = async (req, res) => {
  const { bikeId, userName, userEmail, bidAmount } = req.body;

  if (!userEmail) {
    return res.status(400).json({ error: "User email is required." });
  }

  try {
    const bike = await Bike.findById(bikeId);
    if (!bike) {
      return res.status(404).json({ error: "Bike not found." });
    }

    const newBid = new Bid({
      bike: bikeId,
      userName,
      userEmail,
      bidAmount,
    });

    await newBid.save();
    return res
      .status(201)
      .json({ message: "Bid created successfully.", bid: newBid });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(409).json({ error: "Duplicate email detected." });
    }
    return res.status(500).json({ error: "Internal server error." });
  }
};

//Get all Bids
export const getAllBids = async (req, res) => {
  try {
    const bids = await Bid.find().populate("bike");
    return res.status(200).json({ bids });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// Get All Bids By Bike Id
export const getAllBidsByBikeId = async (req, res) => {
  const { bike_id } = req.query;

  try {
    const bids = await Bid.find({ bike: bike_id }).populate("bike");

    if (!bids || bids.length === 0) {
      return res
        .status(404)
        .json({ error: "No bids found for the specified bike ID." });
    }

    return res.status(200).json({ bids });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// Find the bid and populate bike details
export const getBid = async (req, res) => {
  const { _id } = req.query;

  try {
    const bid = await Bid.findById(_id).populate("bike");
    if (!bid) {
      return res.status(404).json({ error: "Bid not found." });
    }

    return res.status(200).json({ bid });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
