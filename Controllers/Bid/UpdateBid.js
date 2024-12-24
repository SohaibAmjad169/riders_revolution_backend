import { Email, Pass } from '../../Config/Keys.js'
import { Bid } from '../../Model/BidModel.js'
import { Bike } from '../../Model/BikeModel.js'
import nodemailer from 'nodemailer'

export const updateBid = async (req, res) => {
  const { id } = req.query
  const { bidStatus, bidAmount } = req.body

  try {
    // Find and update the bid
    const updatedBid = await Bid.findByIdAndUpdate(
      id,
      { bidStatus, bidAmount },
      { new: true } // Return the updated document
    )

    if (!updatedBid) {
      return res.status(404).json({ error: 'Bid not found.' })
    }

    // If the bid status is accepted, send an email
    if (bidStatus === 'Accepted') {
      // Fetch bike details
      const bike = await Bike.findById(updatedBid.bike)
      if (!bike) {
        return res.status(404).json({ error: 'Bike not found.' })
      }

      // Configure the transporter
      const transporter = nodemailer.createTransport({
        service: 'Gmail', // Or another email provider
        auth: {
          user: '70110719@student.uol.edu.pk', // Replace with your email
          pass: 'slqc sfjt qlgw ctri', // Replace with your email password or app password
        },
      })

      // Email content
      const mailOptions = {
        from: `"Bike Auction System" 70110719@student.uol.edu.pk`, // Replace with your email
        to: 'gptprompts87@gmail.com',
        subject: 'Bid Status Update: Accepted',
        html: `
          <h1 style="color: green; text-align: center;">Your Bid is Accepted!</h1>
          <h2>Details:</h2>
          <p><strong>Bike Name:</strong> ${bike.name}</p>
          <p><strong>Bike Price:</strong> PKR ${bike.price.toLocaleString()}</p>
          <p><strong>User Name:</strong> ${updatedBid.userName}</p>
          <p><strong>User Email:</strong> ${updatedBid.userEmail}</p>
          <p><strong>Bidding Amount:</strong> PKR ${updatedBid.bidAmount.toLocaleString()}</p>
          <p>Thank you for participating in our auction!</p>
        `,
      }

      // Send the email
      await transporter.sendMail(mailOptions)
    }

    return res
      .status(200)
      .json({ message: 'Bid updated successfully.', bid: updatedBid })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error.' })
  }
}
