import { BikeModal } from '../../Model/BikeCreateModal.js'

export const GetAllUserBike = async (req, res) => {
    try {
        const { userName } = req.params;

        const bikes = await BikeModal.find({ userName: userName });
        if (bikes.length === 0) {
            return res.status(404).json({ message: "No bikes found for this user." });
        }

        res.status(200).json({ message: "Bikes retrieved successfully.", data: bikes });
    } catch (error) {
        console.error("Error retrieving bikes:", error);
        res.status(500).json({ error: "Failed to retrieve bikes." });
    }
}

export const RemoveBike = async (req, res) => {
    const { ID } = req.query

    try {
        if (!ID) {
            return res
                .status(400)
                .json({ error: 'Bike ID is required to delete the bike.' })
        }
        const bikeFound = await BikeModal.findById(ID)
        if (!bikeFound) {
            return res.status(404).json({ error: 'Bike not found.' })
        }

        await BikeModal.findByIdAndDelete(ID)

        return res.status(200).json({ message: 'Bike deleted successfully.' })
    } catch (error) {
        console.error('Error deleting bike:', error.message)
        return res
            .status(500)
            .json({ error: 'Internal server error. Please try again later.' })
    }
}

export const UpdateBike = async (req, res) => {
    const { ID, bikeData } = req.body

    try {
        if (!ID) {
            return res
                .status(400)
                .json({ error: 'Bike ID is required for updating.' })
        }

        const requiredFields = ['name', 'price', 'rating']
        for (const field of requiredFields) {
            if (!bikeData[field]) {
                return res.status(400).json({ error: `${field} is required.` })
            }
        }

        if (typeof bikeData.name !== 'string' || bikeData.name.trim() === '') {
            return res.status(400).json({ error: 'Name must be a non-empty string.' })
        }
        if (typeof bikeData.price !== 'number' || bikeData.price <= 0) {
            return res.status(400).json({ error: 'Price must be a positive number.' })
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

        const bike = await BikeModal.findById(ID)
        if (!bike) {
            return res.status(404).json({ error: 'Bike not found.' })
        }

        if (bikeData.name !== bike.name) {
            const existingBike = await BikeModal.findOne({ name: bikeData.name })
            if (existingBike) {
                return res
                    .status(409)
                    .json({ error: 'Bike with this name already exists.' })
            }
        }

        const updatedBike = await BikeModal.findByIdAndUpdate(ID, bikeData, {
            new: true,
            runValidators: true,
        })

        return res.status(200).json({
            message: 'Bike updated successfully.',
            bike: updatedBike,
        })
    } catch (error) {
        console.error('Error updating bike:', error.message)

        if (error.name === 'ValidationError') {
            const errorMessages = Object.values(error.errors).map(
                (err) => err.message
            )
            return res.status(400).json({ error: errorMessages.join(', ') })
        }

        return res
            .status(500)
            .json({ error: 'Internal server error. Please try again later.' })
    }
}
