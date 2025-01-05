import { Bike } from '../../Model/BikeModel.js'

export const UpdateBike = async (req, res) => {
  const { ID, bikeData } = req.body

  try {
    // Step 1: Validate ID
    if (!ID) {
      return res
        .status(400)
        .json({ error: 'Bike ID is required for updating.' })
    }

    // Step 2: Validate required fields in bikeData
    const requiredFields = ['name', 'price', 'imageUrl', 'rating']
    for (const field of requiredFields) {
      if (!bikeData[field]) {
        return res.status(400).json({ error: `${field} is required.` })
      }
    }

    // Step 3: Check for valid data types
    if (typeof bikeData.name !== 'string' || bikeData.name.trim() === '') {
      return res.status(400).json({ error: 'Name must be a non-empty string.' })
    }
    if (typeof bikeData.price !== 'number' || bikeData.price <= 0) {
      return res.status(400).json({ error: 'Price must be a positive number.' })
    }
    if (
      typeof bikeData.imageUrl !== 'string' ||
      !bikeData.imageUrl.startsWith('http')
    ) {
      return res
        .status(400)
        .json({ error: 'Image URL must be a valid URL starting with "http".' })
    }
    if (
      typeof bikeData.rating !== 'number' ||
      bikeData.rating < 0 ||
      bikeData.rating > 5
    ) {
      return res
        .status(400)
        .json({ error: 'Rating must be a number between 0 and 5.' })
    }

    // Step 4: Optional fields validation (if present)
    if (bikeData.questions && !Array.isArray(bikeData.questions)) {
      return res
        .status(400)
        .json({ error: 'Questions must be an array of objects.' })
    }
    if (bikeData.questions) {
      for (const question of bikeData.questions) {
        if (!question.question || !question.answer) {
          return res.status(400).json({
            error:
              'Each question must have both "question" and "answer" fields.',
          })
        }
      }
    }

    // Step 5: Check if bike exists
    const bike = await Bike.findById(ID)
    if (!bike) {
      return res.status(404).json({ error: 'Bike not found.' })
    }

    // Step 6: Check for duplicate names (if updating the name)
    if (bikeData.name !== bike.name) {
      const existingBike = await Bike.findOne({ name: bikeData.name })
      if (existingBike) {
        return res
          .status(409)
          .json({ error: 'Bike with this name already exists.' })
      }
    }

    // Step 7: Update the bike in the database
    const updatedBike = await Bike.findByIdAndUpdate(ID, bikeData, {
      new: true,
      runValidators: true,
    })

    // Step 8: Return the updated bike data
    return res.status(200).json({
      message: 'Bike updated successfully.',
      bike: updatedBike,
    })
  } catch (error) {
    // Step 9: Error handling
    console.error('Error updating bike:', error.message)

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(
        (err) => err.message
      )
      return res.status(400).json({ error: errorMessages.join(', ') })
    }

    // General server error
    return res
      .status(500)
      .json({ error: 'Internal server error. Please try again later.' })
  }
}
