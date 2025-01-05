import { createUserWithEmailAndPassword } from 'firebase/auth'
import { User } from '../../Model/UserModal.js'
import { Auth } from '../../Config/FireBaseConfig.js'
export const RegisterUser = async (req, res) => {
  const { Name, Email, password } = req.body
  // Ensure required fields are provided
  if (!Name || !Email || !password) {
    return res
      .status(400)
      .json({ message: 'Name, Email, and Password are required' })
  }
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ Email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      Auth,
      Email,
      password
    )
    if (userCredential.user.uid) {
      // Prepare user data to be stored in MongoDB
      const userData = new User({
        _id: userCredential.user.uid,
        Name,
        Email,
      })
      // Save user data to MongoDB
      await userData.save()
      return res
        .status(201)
        .json({ message: 'User registered successfully', user: userData })
    } else {
      return res.status(400).json({ message: 'User registration failed' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message })
  }
}
