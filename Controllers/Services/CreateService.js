import Service from '../../Model/ServicesModel.js'

// Create a new service
export const createService = async (req, res) => {
  const { title, image, description, price, category } = req.body

  // Validate input
  if (!title || !image || !description || !price || !category) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  try {
    // Create and save the new service
    const newService = new Service({
      title,
      image,
      description,
      price,
      category,
    })

    await newService.save()
    return res
      .status(201)
      .json({ message: 'Service created successfully', newService })
  } catch (error) {
    console.error('Error creating service:', error)
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message })
  }
}
