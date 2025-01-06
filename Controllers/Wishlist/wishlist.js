import { Wishlist } from '../../Model/WishListModel.js'

export const createWishlist = async (req, res) => {
  const { bikeId, userName, userEmail, bikeImage } = req.body;

  if (!userEmail) {
    return res.status(400).json({ error: "User email is required." });
  }

  try {
    const bike = await Wishlist.findById(bikeId);
    if (!bike) {
      return res.status(404).json({ error: "Bike not found." });
    }

    const newWishlist = new Wishlist({
      bike: bikeId,
      userName,
      userEmail,
      bikeImage,
    });

    await newWishlist.save();
    return res
      .status(201)
      .json({ message: "wishlist created successfully.", bid: newBid });
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
    const wishlist = await Wishlist.find().populate("bike");
    return res.status(200).json({ wishlist });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getWishlistById = async (req, res) => {
  const { bike_id } = req.query;

  try {
    const wishlist = await Wishlist.find({ bike: bike_id }).populate("bike");

    if (!wishlist || wishlist.length === 0) {
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