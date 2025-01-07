import { Email, Pass } from '../../Config/Keys.js'
import { Bid } from '../../Model/BidModel.js'
import { BikeModal } from '../../Model/BikeCreateModal.js'
import nodemailer from 'nodemailer'

export const updateBid = async (req, res) => {
  const { id } = req.query
  const { bidStatus } = req.body

  try {
    const updatedBid = await Bid.findByIdAndUpdate(
      id,
      { bidStatus },
      { new: true } 
    )

    if (!updatedBid) {
      return res.status(404).json({ error: 'Bid not found.' })
    }

    const bike = await BikeModal.findById(updatedBid.bike)
    if (!bike) {
      return res.status(404).json({ error: 'Bike not found.' })
    }

    const transporter = nodemailer.createTransport({
      service: 'Gmail', 
      auth: {
        user: '70110719@student.uol.edu.pk', 
        pass: 'slqc sfjt qlgw ctri', 
      },
    })

    let emailColor = ''
    let statusText = ''
    if (bidStatus === 'Accepted') {
      emailColor = 'green'
      statusText = 'Your Bid is Accepted!'
    } else if (bidStatus === 'Rejected') {
      emailColor = 'red'
      statusText = 'Unfortunately, Your Bid is Rejected.'
    } else {
      emailColor = 'orange'
      statusText = 'Your Bid is Pending.'
    }

    const mailOptions = {
      from: `"Bike Auction System" 70110719@student.uol.edu.pk`, 
      to: updatedBid.userEmail,
      subject: `Bid Status Update: ${statusText}`,
      html: `
        <h1 style="color: ${emailColor}; text-align: center;">${statusText}</h1>
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

    return res
      .status(200)
      .json({ message: 'Bid updated successfully.', bid: updatedBid })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error.' })
  }
}
