import { Router } from 'express'
import { RegisterUser } from '../Controllers/Auth/SignUp.js'
import { Login } from '../Controllers/Auth/SignIn.js'
import { Signout } from '../Controllers/Auth/SignOut.js'
import { ResetPass } from '../Controllers/Auth/ResetPass.js'

export const UserRouter = Router()
UserRouter.post('/CreateUser', RegisterUser)
UserRouter.post('/Login', Login)
UserRouter.post('/Signout', Signout)
UserRouter.post('/ResetPass', ResetPass)
