import { BikeModal } from "../../Model/BikeCreateModal.js";
import multer from "multer";
import path from "path";

// Multer Configuration for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// Multer Filter to Accept Only Images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept image files
  } else {
    cb(new Error("Only image files are allowed!"), false); // Reject other files
  }
};

// Multer Instance for Multiple File Uploads
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
}).fields([{ name: "images", maxCount: 5 }]); 

// Controller to Handle Bike Creation
export const CreateBike = async (req, res) => {
  const { bikeData } = req.body;
  try {
    // Step 2: Parse the bike data and include the image URL(s)
    const parsedBikeData = JSON.parse(bikeData);
    
    console.log(bikeData);
    
    // Check if images exist
    if (!req.files || !req.files.images || req.files.images.length === 0) {
      return res.status(400).json({ error: "Image(s) are required." });
    }

    // Map the image URLs (using the filenames saved in the uploads folder)
    const imageUrls = req.files.images.map(file => `uploads/${file.filename}`);
    parsedBikeData.imageUrl = imageUrls;

    // Step 3: Validate required fields
    const requiredFields = ["name", "price", "imageUrl", "rating"];
    for (const field of requiredFields) {
      if (!parsedBikeData[field]) {
        return res.status(400).json({ error: `${field} is required.` });
      }
    }

    // Step 4: Validate data types
    if (typeof parsedBikeData.name !== "string" || parsedBikeData.name.trim() === "") {
      return res.status(400).json({ error: "Name must be a non-empty string." });
    }
    if (typeof parsedBikeData.price !== "number" || parsedBikeData.price <= 0) {
      return res.status(400).json({ error: "Price must be a positive number." });
    }
    if (typeof parsedBikeData.rating !== "number" || parsedBikeData.rating < 0 || parsedBikeData.rating > 5) {
      return res.status(400).json({ error: "Rating must be a number between 0 and 5." });
    }

    // Step 5: Check for duplicate bike name
    const existingBike = await BikeModal.findOne({ name: parsedBikeData.name });
    if (existingBike) {
      return res.status(409).json({ error: "Bike with this name already exists." });
    }

    // Step 6: Create and save the bike
    const bike = new BikeModal(parsedBikeData);
    const savedBike = await bike.save();

    return res.status(201).json({
      message: "Bike created successfully.",
      bike: savedBike,
    });
  } catch (error) {
    console.error("Error creating bike:", error.message);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errorMessages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: errorMessages.join(", ") });
    }

    return res.status(500).json({ error: "Internal server error. Please try again later." });
  }
};
