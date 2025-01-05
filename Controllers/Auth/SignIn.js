import { signInWithEmailAndPassword } from 'firebase/auth'
import { User } from '../../Model/UserModal.js'
import { Auth } from '../../Config/FireBaseConfig.js'

export const Login = async (req, res) => {
  const { Email, Password } = req.body

  // Validate input
  if (!Email || !Password) {
    return res.status(400).json({ message: 'Email and Password are required.' })
  }

  try {
    // Sign in with Firebase Authentication
    const UserData = await signInWithEmailAndPassword(Auth, Email, Password)

    // If Firebase login is successful, search for the user in MongoDB
    if (UserData.user) {
      const UserFound = await User.findOne({ Email })
      if (UserFound) {
        return res.status(200).json(UserFound) // Return user details
      } else {
        return res.status(404).json({ message: 'User not Registered' })
      }
    }
  } catch (error) {
    // Handle errors such as invalid credentials or Firebase issues
    return res.status(500).json({ message: error.message })
  }
}
