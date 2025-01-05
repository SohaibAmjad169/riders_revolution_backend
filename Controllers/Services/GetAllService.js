import Service from '../../Model/ServicesModel.js'

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
    return res.status(200).json(services)
  } catch (error) {
    console.error('Error retrieving services:', error)
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message })
  }
}
