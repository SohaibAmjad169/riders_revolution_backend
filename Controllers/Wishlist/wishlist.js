import { Wishlist } from '../../Model/WishListModel.js'

export const createWishlist = async (req, res) => {
  const { bikeId, userName, userEmail, bikeImage, bikeName, bikePrice, bikeRating } = req.body;

  if (!userEmail) {
    return res.status(400).json({ error: "User email is required." });
  }

  try {
    const newWishlist = new Wishlist({
      bike: bikeId,
      userName,
      userEmail,
      bikeImage,
      timer: false,
      bikeName,
      bikePrice,
      bikeRating
    });

    await newWishlist.save();
    return res
      .status(201)
      .json({ message: "wishlist created successfully.", wishlist: newWishlist });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(409).json({ error: "Duplicate email detected." });
    }
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getAllWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find()
    return res.status(200).json({ wishlist });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getWishlistById = async (req, res) => {
  const { bike_id } = req.query;

  try {
    const wishlist = await Wishlist.find({ bike: bike_id })

    if (!wishlist || wishlist.length === 0) {
      return res
        .status(404)
        .json({ error: "No bids found for the specified bike ID." });
    }

    return res.status(200).json({ wishlist });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getWishlistByUserEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const wishlist = await Wishlist.find({ userEmail: email })

    if (!wishlist || wishlist.length === 0) {
      return res
        .status(404)
        .json({ error: "No bids found for the specified User." });
    }

    return res.status(200).json({ wishlist });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

import mongoose from 'mongoose';

export const startWishlistTimer = async (req, res) => {
  try {
    const { bikeId } = req.query;
    if (!mongoose.Types.ObjectId.isValid(bikeId)) {
      return res.status(400).json({ error: "Invalid bikeId format" });
    }

    const updatedWishlist = await Wishlist.updateOne(
      { bike: new mongoose.Types.ObjectId(bikeId) },
      { $set: { timer: true, updatedAt: new Date() } },
      { new: true }
    );

    if (updatedWishlist.modifiedCount === 0) {
      return res.status(404).json({ message: "No items found to update" });
    }

    return res.status(200).json({
      success: true,
      message: "Timer started successfully",
      data: updatedWishlist,  
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

