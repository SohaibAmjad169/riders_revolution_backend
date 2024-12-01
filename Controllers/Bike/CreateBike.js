import { Bike } from '../../Model/BikeModel.js'

export const CreateBike = async (bikeData) => {
  try {
    // Step 1: Validate required fields
    const requiredFields = ['name', 'price', 'imageUrl', 'rating']
    for (const field of requiredFields) {
      if (!bikeData[field]) {
        throw new Error(`${field} is required.`)
      }
    }

    // Step 2: Check for valid data types (simple validation)
    if (typeof bikeData.name !== 'string') {
      throw new Error('Name must be a string.')
    }
    if (typeof bikeData.price !== 'number') {
      throw new Error('Price must be a number.')
    }
    if (typeof bikeData.imageUrl !== 'string') {
      throw new Error('Image URL must be a string.')
    }
    if (
      typeof bikeData.rating !== 'number' ||
      bikeData.rating < 0 ||
      bikeData.rating > 5
    ) {
      throw new Error('Rating must be a number between 0 and 5.')
    }

    // Step 3: Create a new bike instance
    const bike = new Bike(bikeData)

    // Step 4: Save the bike to the database
    const savedBike = await bike.save()

    // Step 5: Return the saved bike data
    return { message: 'Bike created successfully', bike: savedBike }
  } catch (error) {
    // Step 6: Error handling
    console.error('Error creating bike:', error.message)
    if (error.code === 11000) {
      // Duplicate key error (unique constraint violation)
      return { error: 'Bike with this name already exists.' }
    }
    return { error: error.message }
  }
}
