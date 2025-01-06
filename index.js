import express from 'express'
import cors from 'cors'
import { Port } from './Config/Keys.js'
import { MongoConnect } from './Config/MongoConfig.js'
import { BikeRouter } from './Router/BikeRouter.js'
import { UserRouter } from './Router/UserRouter.js'
import { CartRouter } from './Router/CartRouter.js'
import { OrderRouter } from './Router/OrderRouter.js'
import { BidRouter } from './Router/BidRouter.js'
import { ServiceRouter } from './Router/ServiceRouter.js'
import { BikeModal } from "./Model/BikeCreateModal.js";
import { WishlistRouter } from './Router/WishlistRouter.js'
import upload from "./utils/upload.js";

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
MongoConnect()
app.use('/uploads', express.static('uploads'));

app.use('/Api/Bike', BikeRouter)
app.use('/Api/User', UserRouter)
app.use('/Api/Cart', CartRouter)
app.use('/Api/Order', OrderRouter)
app.use('/Api/Bid', BidRouter)
app.use('/Api/Service', ServiceRouter)
app.use('/Api/Wishlist', WishlistRouter)

app.post("/Api/Bike/CreateUserBike", upload.single("image"), async (req, res) => {
  try {
    const { bikeData } = req.body;
    let parsedBikeData;
    try {
      parsedBikeData = JSON.parse(bikeData);  // Parse bike data from string
    } catch (err) {
      return res.status(400).json({ error: "Invalid bike data format" });
    }

    // Ensure required fields are provided
    if (!parsedBikeData.name || !parsedBikeData.price || !parsedBikeData.rating) {
      console.log("Missing required bike fields");
      return res.status(400).json({ error: "Missing required bike fields" });
    }

    // Use let here, as it allows you to conditionally change the value of 'used'
    let used = false;
    if (parsedBikeData.condition === 'Old') {
      used = true;
    }

    // Create a new bike object to save to the database
    const newBike = new BikeModal({
      name: parsedBikeData.name,
      price: parsedBikeData.price,
      rating: parsedBikeData.rating,
      engine: parsedBikeData.engine,
      Used: used,  // Set the 'Used' field
      userName: parsedBikeData.userName,
      questions: parsedBikeData.questions,
      image: req.file?.path || "",  // Image file path or default empty string
      petrolCapacity: parsedBikeData.petrolCapacity,
      starting: parsedBikeData.starting,
      transmission: parsedBikeData.transmission,
      groundClearance: parsedBikeData.groundClearance,
      displacement: parsedBikeData.displacement,
      compressionRatio: parsedBikeData.compressionRatio,
      boreAndStroke: parsedBikeData.boreAndStroke,
      tyreFront: parsedBikeData.tyreFront,
      tyreRear: parsedBikeData.tyreRear,
      seatHeight: parsedBikeData.seatHeight,
      length: parsedBikeData.length,
      width: parsedBikeData.width,
      height: parsedBikeData.height,
      weight: parsedBikeData.weight,
    });

    // Save the new bike to the database
    const savedBike = await newBike.save();

    // Respond with a success message and the saved bike data
    res.status(201).json({ message: "Bike added successfully!", data: savedBike });
  } catch (error) {
    console.error("Error saving bike:", error);
    res.status(500).json({ error: "Failed to save bike." });
  }
});

app.listen(Port, () => {
  console.log(`CONNECTED ON ${Port}`)
})
