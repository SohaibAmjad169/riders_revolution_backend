import { signOut } from 'firebase/auth'
import { Auth } from '../../Config/FireBaseConfig.js'
export const Signout = async (req, res) => {
  try {
    // Sign out the user using Firebase Auth
    await signOut(Auth)
    // If successful, send a 200 response
    res.status(200).json({ message: 'Successfully signed out', success: true })
  } catch (error) {
    // Catch and return any errors during the signout process
    res.status(500).json({ message: error.message, success: false })
  }
}
